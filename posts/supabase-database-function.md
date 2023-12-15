---
layout: Article.tsx
publish_date: 2023-12-13
title: 'Vue Fes 2023 ネームカードの裏側で Supabase Database Function は動いていた'
description: '5 年ぶりのオフライン開催を遂げた Vue Fes 2023 では一般参加者に対し、オンラインネームカード機能を提供しました。その裏側でチケット購入状況との照合に Supabase Database Function が一役を買った話に触れさせていただきます。'
slug: supabase-database-function
reaction: 👻
category: Server
tags:
  - Advent-Calendar
  - Supabase
  - PostgreSQL
  - VueFes
---

この記事は jiyuujin Advent Calendar 2023 の 13 日目の記事になります。

https://adventar.org/calendars/9670

まず、前提として Vue Fes Japan 2023 のオンラインネームカードではチケット購入管理ツール Pass Market の購入状況と照合する必要がありました。

しかし、Pass Market には API はおろか webhook なども提供されていません。

技術的に不足している状態で、いかにしてその懸案を解消させたか。

Pass Market の管理画面より、参加者一覧並びに購入時アンケート情報の CSV をダウンロードできることに注目しました。

```
🗂 管理画面
  └ 🗂 作成済みのイベント
    └ 🗂 イベント管理メニュー
      └ 🗂 参加者一覧ダウンロード
      └ 🗂 購入時アンケート情報ダウンロード
```

参加者情報を Supabase のデータベースに格納しつつ、ハック的にそれらの CSV をパースすることで、チケット購入情報も Supabase のデータベースに格納できることに気付きます。

「これだ」など、ピンと来た以上あとはデータベース設計を進めて、上手く不足している技術の埋め合わせができれば OK でございました。

## クラウドの選定

Firebase や Supabase が選定候補の上がりました。

結果的に Vue Fes 2023 では、Supabase を選定させていただきましたが、なんといっても型定義の自動生成は選定の根拠として大きく占めています。

率直に、お手元のプロジェクトルートで `supabase gen` を実行するだけと、敷居は決して高くありません。

```bash
# supabase gen
npx supabase gen types typescript --linked > app/types/generated/supabase.ts
```

正直 `any` 型で逃げること無く、それでいて記述量も少なく済んだので、満足度はほんとうに高いのではと考えています。

## 前提とするデータベース設計

データベース設計の詳細について、この場では割愛させていただきます。

最近、リポジトリは公開されましたので、データベースのスキーマの詳細は [schema.sql](https://github.com/vuejs-jp/vuefes-2023/blob/main/supabase/schema.sql) をご確認ください。

https://github.com/vuejs-jp/vuefes-2023/blob/main/supabase/schema.sql

データベース設計の都合上、イベントの参加者情報と Pass Market の購入状況はそれぞれ別テーブルに管理することを目指しました。

では、なぜ別テーブル管理と分けたのか、それはデータの利用シーンにあります。

- 参加者自身が公式 Web サイトで参加者情報を閲覧、必要に応じて更新できるようにします
- 運営が公式 Web サイトでPass Market 購入状況を追加できるようにします

データベース関数を作成することで一方のデータが更新されたらもう他方のデータも該当した場合に限って更新します。

データベースが更新された際に、イベントを発火させる関数を作成したいと考えました。

そこでデータベースの function と webhook を利用します。

### データベースの function を作成する

データベースの関数を利用します。

https://supabase.com/docs/guides/database/functions

では、event_users テーブルのデータベースの function を作成します。

```sql
create or replace function public.handle_activate()
  returns trigger as $$
begin
  update public.event_users
  set activated_at = now(), role = new.role
  where receipt_id = new.receipt_id and activated_at is null;
  return new;
end;
$$ language plpgsql security definer;
```

こちら、基本的には SQL のお作法を理解していれば、容易に実現できます。

SQL の更新系クエリとして `update 更新テーブル set 更新内容 where 更新条件` を使います。

```sql
update public.event_users
set activated_at = now(), role = new.role
where receipt_id = new.receipt_id and activated_at is null;
```

event_users テーブルで、該当のチケットがあってかつ購入情報が紐付けされていない場合に限り、その照合処理を行っています。

では、実際に Supabase プロジェクトに function の適応を進めましょう。

「SQL Editor」を開いてください。

![](https://i.imgur.com/x5aMUaW.png)

上部ペインにクエリを置いて、適宜「Run」を実行してください。

![](https://i.imgur.com/z1GCrn6.png)

こちらで Supabase プロジェクトへ function の適応を完了しました。

しかし、これだけでは function は一切、動きません。

### データベースの webhook を作成する

function を動かすため、今回はデータベースの webhook を利用します。

https://supabase.com/docs/guides/database/webhooks

照合情報を格納した pm_receipts テーブルへ新たな購入情報が追加されたら、参加者情報を格納した event_users テーブル内のチケット購入フラグと照合しているかについて更新します。

`create trigger` を利用して、テーブルのデータが追加された際に、別のテーブルのデータを更新するデータベースの function を作成できます。そこで、先に作成した function の `handle_activate()` を実行することを目指します。

では、pm_receipts テーブルにおけるカラム追加時の webhook を作成します。

```sql
drop trigger if exists on_new_receipt_created on public.pm_receipts;
create trigger on_new_receipt_created
  after insert on public.pm_receipts
  for each row
  execute function handle_activate();
```

では、実際に Supabase プロジェクトに function の適応を進めましょう。

先の function 作成時と同様に「SQL Editor」を開いてください。

![](https://i.imgur.com/x5aMUaW.png)

上部ペインにクエリを置いて、適宜「Run」を実行してください。

![](https://i.imgur.com/eX1luQd.png)

こちらで Supabase プロジェクトへ pm_receipts テーブルにおける webhook の適応を完了しました。

ちなみに Vue Fes 2023 では、この各参加者の購入情報の紐付けについて、データベースの function からのみに制限いたしました。

Vue Fes 運営サイドのみ、チケット管理プラットフォーム Pass Market の情報へアクセス、参加者の購入情報を格納した CSV データを取得できます。

このように Vue Fes 運営サイドのみ操作できること、各参加者が自由気ままに購入情報を更新できなくさせるという仕様を目指したこととの理由から、このデータベースの function が上手くハマりました。

https://vuefes.jp/2023/passmarket-console/

## 余談

データベース更新時、イベントを発火させる関数を作成したいと考えた際に、Edge Functions を利用することも検討しました。

結論をいうと、Pass Market の購入状況と参加者の情報を照合する、という比較的シンプルなゴールを鑑み、データベース関数で間に合うと判断したためとなります。

もちろん、それ以上に複雑な処理が絡むことが仕様上考えられる場合は、データベース関数では間に合わないと判断するため、ひょっとすると Edge 関数を選択肢のひとつとして決断していた可能性があります。

(そのあたりは仕様次第ということで)

なお、Supabase 公式 Web サイトによると、CLI コマンドを使用することで、容易に関数を作成できます。

https://supabase.com/docs/guides/functions/quickstart
