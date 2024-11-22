---
layout: Article.tsx
publish_date: 2024-11-20
title: 'FlutterKaigi 2024 有明周辺のランチマップ (あくまで非公式です)'
description: 'FlutterKaigi 2024 では非公式という位置付けながら、ランチマップ機能の提供を試みました。その裏側で Supabase Database Function が一役を買った話に触れさせていただきます。'
slug: flutterkaigi-2024-lunchmap
reaction: 🍚
category: Server
tags:
  - Supabase
  - PostgreSQL
  - FlutterKaigi
  - Flutter
---

FlutterKaigi 2024

(OGP 画像)

![](https://i.imgur.com/M87xv0l.png)

https://2024.flutterkaigi.jp/

昨日 FlutterKaigi 公式 medium からも、有明周辺のランチ事情についてのアナウンスがなされました。

https://medium.com/flutterkaigi/flutterkaigi-2024-%E6%9C%89%E6%98%8E%E3%82%BB%E3%83%B3%E3%83%88%E3%83%A9%E3%83%AB%E3%82%BF%E3%83%AF%E3%83%BC%E3%83%9B%E3%83%BC%E3%83%AB-%E3%82%AB%E3%83%B3%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9-%E3%83%A9%E3%83%B3%E3%83%81%E6%83%85%E5%A0%B1-68ee1681c159

昨年 FlutterKaigi 2023 公式アプリで好評だったランチマップについて、今年はチームメンバーの負荷を考慮し提供されておりません。

ちなみに昨年のランチマップでは、会場スポンサーとして協賛いただいていた [株式会社ナビタイムジャパン](https://2023.flutterkaigi.jp/sponsors/navitime) のマップと合わせ、提供されていました。

:::details FlutterKaigi 2023 で提供していたランチマップのスクリーンショット。

カンファレンスアプリの一機能としてランチマップが提供されていました。

|初期コンテンツとして読み込んだ時|右へスクロールした時|動線|
|:----|:----|:----|
|![](https://i.imgur.com/x7CEkBz.png)|![](https://i.imgur.com/uoqsqmH.png)|![](https://i.imgur.com/1MYEZlU.png)|

:::

そこで今回、非公式という形で有明周辺のランチマップを設計・実装してみました。

![](https://i.imgur.com/aPkZSqN.png)

情報出所は [食べログ](https://tabelog.com/tokyo/A1313/A131306/R466/rstLst/?vs=1&sa=%E6%9C%89%E6%98%8E%E9%A7%85%EF%BC%88%E6%9D%B1%E4%BA%AC%E9%83%BD%EF%BC%89&sk=&lid=top_navi1&vac_net=&svd=20241116&svt=1900&svps=2&hfc=1&sw=) から参照させてもらっています。

そもそも、こうしたランチマップを制作したきっかけは、有明近辺にそのようなスポットが少ないのでは無いかという疑問から。

結論として全くそんな心配は無く、よしなりにお店をピックアップできる環境と認識できました。

ここで今回捕捉するのは、下記 3 点の中で 2 点目を取り上げます。

- Supabase の DB 設計
- Database Function の使いどころ
- 気合いで seed.sql を書いて、データを流し込む

### DB 設計

位置情報 (緯度や経度) をいかにして記録するのか。

緯度、経度についてぞれぞれ `double 型` として格納する必要はありません。

Postgres 内で地理データを操作できるようにする Postgres 拡張機能 PostGIS のお世話になります。

https://supabase.com/docs/guides/database/extensions/postgis

緯度、経度のシンプルなセットから構成されている [Point 型](https://postgis.net/docs/using_postgis_dbmanagement.html#Point) を使って、位置情報を DB に保存することを目指します。

```sql
create table if not exists public.shops (
  id uuid not null primary key default uuid_generate_v4(),
  name varchar(100) not null,
  comment varchar(500),
  link_url varchar(500),
  location geography(POINT) not null,
  is_open bool not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);
```

### Database Function の使いどころ

:::message

昨年の Vue Fes Japan 2023 でも、ネームカードの照合処理のお世話になったのは、Supabase の Database Function だったことは記憶に新しいかと存じます。

https://blog.nekohack.me/posts/supabase-database-function/

:::

まず今回 FlutterKaigi 2024 では、有明セントラルタワーホール＆カンファレンスにて、午前の部から終日にわたって開催されます。

https://ariake-hall.jp/

この開催場所から近い順に直線距離 (と、歩いてかかる想定時間) を算出することを目指します。しかし、この直線距離の算出を Flutter アプリ内で計算するのは、非常にたいへんで複雑なロジックが求められます。

そのロジックの責務を Postgre 関数で気軽に書くことのできる Database Function に任せてしまおうというのが、今回の狙いのひとつになります。

https://supabase.com/docs/reference/javascript/rpc

余談: PostGIS の例で参照されており、そちらの考えを参考にさせていただきました。

https://supabase.com/docs/guides/database/extensions/postgis

```sql
create or replace function nearby_shops(lat float, long float)
returns setof record
language sql
as $$
  select id, name, st_astext(location) as location, st_distance(location, st_point(long, lat)::geography) as dist_meters
  from public.shops
  order by location <-> st_point(long, lat)::geography;
$$;
```

関数を作成したら、あとは Flutter アプリから `supabaseClient.rpc` で読み込みます。

なお、`centerLat` と `centerLng` には、有明セントラルタワーホール＆カンファレンスの緯度や経度が入ります。

```dart
Stream? stream({
  Shop? condition,
}) {
  final data = supabaseClient.rpc('nearby_shops',
      params: {'lat': centerLat, 'long': centerLng}).asStream();

  return data;
}
```

歩いてかかる想定時間は、取得した直線距離を基に、Flutter アプリ内で計算します。

ちなみに、時速 4km と仮定し、徒歩の時間を計算しました。

### seed.sql を書く

基本的には新規のデータを追加する際の SQL を書けば良いのですが、ここでの肝は [Point 型](https://postgis.net/docs/using_postgis_dbmanagement.html#Point) の書き方になります。

```sql
insert into public.shops
(name, comment, link_url, location, is_open)
values
  ('春華秋実', '', '', st_point(139.791585, 35.6319108), true);
```

実際に値を渡す順番として `st_point()` では、経度の次に緯度が入ります。

https://postgis.net/docs/ja/ST_Point.html

```sql
st_point(<経度>, <緯度>)
```

数学における座標軸で x 軸に経度が入り、y 軸に緯度が入ることを想像してください。

あと、こればかりは気合いで SQL を書いていくのみ。ですがこちらは割愛させていただきます。

## 最後に

あくまで Supabase プロジェクトについては、課金プランまで上げる措置をとっていませんので、ある一定の時間を経ればアクセスできなくなる可能性があります。

非営利な技術コミュニティに対し、コミット可能なコミュニティプランを検討して欲しいなどと考える場面も多い今日このころ。

というわけで、今回も FlutterKaigi コアスタッフのひとりとして前・当日を迎えましょう。
