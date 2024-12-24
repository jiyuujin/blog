---
layout: Article.tsx
publish_date: 2023-12-25
title: 'Vue Fes Japan 2023 ティザーの裏側 完全版'
description: '昨年に続いて Vue Fes Japan 2023 Web サイトの技術をリードさせていただいておりました。今回目玉機能のネームカードを中心として、昨年 Web サイトの取組との違いを触れさせていただきました。'
slug: vuefes-2023-follow-up
reaction: 🎄
category: Poem
tags:
  - Advent-Calendar
  - Nuxt3
  - Vue
  - VueFes
---

この記事は jiyuujin Advent Calendar 2023 の 25 日目の記事になります。

https://adventar.org/calendars/9670

Vue Fes Japan 2023

(OGP 画像)

![](https://i.imgur.com/ik1tOZO.png)

https://vuefes.jp/2023

なお、先週 20 日にも kazupon 氏より、今回の Vue Fes Japan 2023 全体のふりかえりについて [寄稿](https://note.com/kazu_pon/n/n82c8ef7be24a) されています。

https://note.com/kazu_pon/n/n82c8ef7be24a

## Vue Fes Japan 2023 ウェブサイトについて

今年も Nuxt を選定、もちろん利用するバージョンも 3 を使用させていただきました。

今回の記事では、主に (良くも悪くも) 話題持ちきりだったネームカードを中心に、書かせていただきたく考えております。

![](https://i.imgur.com/yZ56sbm.jpg)

こちらのネームカードについて、かたや物理では大変評判の良く、一方でオンラインではたいへんご迷惑をおかけする部分が多くございました。

(ネームカードの続きは下記参照)

私自身の役割について、今回も技術のリードとして取り組まさせていただくとともに、Web サイトチームのリードとして大胆に引っ張らせていただきました。

https://github.com/vuejs-jp/vuefes-2023/graphs/contributors

![](https://i.imgur.com/bD8NpUZ.png)

コントリビュートいただきました皆さまには、改めて感謝申し上げます。

## 昨年とココが違う Vue Fes Japan 2023

デザインはわかまつさんの [記事](https://note.com/hachi_ihcah/n/na60e5fa4a64e) を確認していただくとして、これより先は開発の視点で書かせていただきます。

https://note.com/hachi_ihcah/n/na60e5fa4a64e

今回のキーワードについて、下記キーワードが挙げられます。

- Nuxt 3 (Vue 3)
- TypeScript -> vue-tsc による型チェック
- [Composition API](https://ja.vuejs.org/api/composition-api-setup)
- [`<script setup>`](https://ja.vuejs.org/api/sfc-script-setup) syntax
- [Newt FormApp](https://www.newt.so/form-app)
- [Pinceau](https://pinceau.dev/) (CSS in JS/TS)
- Nuxt module [nuxt-og-image](https://nuxt.com/modules/og-image)
- ネームカード
  - Supabase の [Database Function](https://supabase.com/docs/guides/database/functions) と合わせて利用しつつ、チケットプラットフォーム Pass Market の購入状況を反映
- Netlify

特に、昨年と違う点に絞って、下の表に落とし込んでみます。

||Vue Fes Japan Online 2022|Vue Fes Japan 2023|
|:---|:---|:---|
|Package Manager|npm|pnpm|
|Framework|Nuxt Bridge|Nuxt 3|
|CMS|Newt|-|
|Form|Netlify Form|Newt FormApp|
|CSS|Tailwind CSS|Pinceau|
|Cloud|-|Supabase|
|OG Image|static|nuxt-og-image, but partially static|
|Type Check|-|vue-tsc|
|Tests|-|Cypress, Vitest|

こうしてみると、技術スタックに劇的な変化があることに気付かされます。

といいますのも基本的に、今年は昨年以上の思い切って挑戦することをモットーに行動させていただきました。

昨年の秋に Nuxt 3 正式リリースを迎え、漸く腰を据えて開発できる状態となったいま、保守的な姿勢で居続けるのは非常に勿体無いと考えています。

また、オープンソースのプロダクトへコントリビュートする機会、積極的に experimental な機能も試していきたい。

その上で、今回捕捉するのは、以下 3 点挙げることとしました。

- CSS (Pinceau) 選定 (ブログは [こちら](https://blog.nekohack.me/posts/pinceau-usage-on-nuxt-3/) を参照)
- nuxt-og-image の構築 (ブログは [こちら](https://blog.nekohack.me/posts/nuxt-og-image/) を参照)
- ネームカード製作・運営の裏側
- その他 (Lint / Typecheck)

### ネームカード

ネームカードでは物理・オンラインともに提供され、中でもオンラインのネームカードについてはあらかじめ作成期間に作成申請いただくと、完全な形でそれを手元のデバイスで確認できるようにした機能となっています。

https://vuefes.jp/2023/users/e4c8e6e2-d4ee-4f98-bba9-1c08e2f7baae

![](https://i.imgur.com/xi4Q8kd.jpg)

今回 5 年ぶりのオフライン開催を目指していた Vue Fes Japan 2023 では、その場で同じ Web 界隈並びに Vue 界隈に生息する者同士、自分自身を紹介・近況を報告するツテのひとつとして、ネームカードがあればどうだろうという素朴な想いから、私が **言い出しっぺ** として企画しています。

海外のカンファレンス、たとえば [Vite Conf](https://viteconf.org/23/) などでこうしたネームカードが大々的に行われていたりしますが、純粋にこれを日本国内でもやってみたいという想いがありました。

https://viteconf.org/23/tickets/jiyuujin

まず、このネームカード登録に際し、不具合が発生したことを改めてお詫び申し上げます。

(お詫びのポスト)

https://x.com/vuefes/status/1709786858639761910?s=20

正直、参加者であるユーザーにとって **分かりづらい仕様** として提供してしまったことが、結果的に「不具合」という形に結び付けられているように考えています。

チケット購入者のフローを考えます。

1. Pass Market でチケットを購入します
2. Vue Fes ウェブサイトでネームカードを作成します
3. GitHub または Google でログインします
4. 表示名、アバター画像、Pass Market レシート ID を入力します
5. ネームカード作成の手続きが終了します
6. ユーザー詳細ページが作成されることを確認します

さらに、これより先はチケット購入者ではなく運営のフローとして、Pass Market の購入者情報を紐付ける作業が発生します。

今回 Pass Market 各個人の購入情報として、レシート ID を入力いただきました。そもそも、オンラインのネームカードを作成するため Pass Market より Vue Fes 参加のためのチケットを購入する必要があったと思いますが、それはこの前提があったためとなります。

ただし、その時点ではあくまで、レシート ID を Vue Fes ウェブサイトで入力してもらっただけに過ぎません。すなわち、Pass Market 側の決済した事実としての情報は、この入力してもらった時点では一切入ってこないのが、今回の肝となります。

上記 5 の「ネームカード作成の手続き」まで完了し、その後ユーザー詳細ページで必ず「エラー」と表示される所以は、そうした仕様によるものです。

度々、問い合わせでいただくことの多かった部分は、この仕様が十分に伝わっていなかったためとなります。

![](https://i.imgur.com/e9suLgG.png)

遅ればせながら、ネームカード作成期間が終わってすぐのタイミングで気付かされたこととして、ウェブサイト上の表記について修正の余地があることを痛感させられました。

あくまでひとつの例にはなりますが「ネームカードを作成」ではなく「ネームカード作成を申請」など、このボタンをクリックしても最終的にはネームカードの作成そのものが完了しないことを、ユーザーに対して明らかにする必要があったように考えています。

#### ネームカードの裏側で動くデータベース

前提として 2 つのデータベースを構築しました。

- event_users
- pm_receipts

https://github.com/vuejs-jp/vuefes-2023/blob/main/supabase/schema.sql

ひとつは Vue Fes に参加、かつ事前にネームカード作成を申請いただいた方々の情報をテーブル event_users に格納しました。

もうひとつは Pass Market の購入情報をテーブル pm_receipts に格納、上テーブル event_users と分けるようなデータベース設計とさせていただきました。

```
create table if not exists public.event_users (
    id uuid not null primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade not null,
    email varchar(100) not null unique,
    full_name varchar(100) not null,
    avatar_url varchar(200) not null,
    provider varchar(20) not null,
    display_name varchar(12) not null,
    role varchar(16),
    receipt_id varchar(40) not null unique,
    activated_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);
comment on table public.event_users is 'Holds all of event users information';

ALTER TABLE public.event_users ALTER COLUMN display_name TYPE varchar(24);

create table if not exists public.pm_receipts (
    id uuid not null primary key default uuid_generate_v4(),
    role varchar(16) not null,
    receipt_id varchar(40) not null unique,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);
comment on table public.pm_receipts is 'Holds all of pass market receipts information';
```

お互いの依存関係をはじめ、Pass Market の API (webhook) などが無いことを考慮した結果、それぞれのテーブルをあえて分ける方針で進めました。

では、次に上記 5 の「ネームカード作成の手続き」まで完了した際、ユーザー詳細ページでエラーと表示されます。

これより先は、運営側の中で以下の順序をもって「人海戦術」に入ります。

1. Pass Market で、購入者情報の CSV を取得します
2. 取得した CSV をパース、Pass Market 用のテーブル pm_receipts に格納します
3. テーブル pm_receipts に格納されたタイミングで、購入者情報と紐付けされていない参加者に対し、新規で照合させます

上記 3 購入者情報の紐付けについて Supabase の Database Function のお世話になることを目指します。

https://supabase.com/docs/guides/database/functions

とはいえ、こちらもテーブル構築と同じく SQL を書くことで、function や webhook の実装を実現できます。

webhook を走らせるため、テーブル pm_receipts にデータを追加したところ、テーブル event_users の activated_at が NULL としてデータが追加されます。

```
-- *** Function definitions ***
create or replace function public.handle_activate()
  returns trigger as $$
begin
  update public.event_users
  set activated_at = now(), role = new.role
  where receipt_id = new.receipt_id and activated_at is null;
  return new;
end;
$$ language plpgsql security definer;

-- *** Trigger definitions ***
drop trigger if exists on_new_receipt_created on public.pm_receipts;
create trigger on_new_receipt_created
  after insert on public.pm_receipts
  for each row
  execute function handle_activate();
```

実際、こうした function や webhook を作成するやり方については、同じく Advent Calendar の記事として書かせてもらった記事がありますので、そちらをご参照、確認いただければと考えています。

https://blog.nekohack.me/posts/supabase-database-function/

## 最後に

というわけで、昨年に続いて今回もウェブサイトチームのひとりとして、公式ウェブサイトでさまざまなことにチャレンジさせていただいておりました。

またコアスタッフとして、そしてカメラマンのひとりとして kazupon 氏と福岡へも同行させていただきました。

その際のブログも、先日書かせていただいております。

https://blog.nekohack.me/posts/vuefes-2023-after-event/

普段趣味で風景、ポートレイトなどを撮影しており、こういう形で携わらせていただくのは 4 年前のフロントエンドカンファレンス関西以来ともあって、改めて色々と楽しいひとときを過ごさせていただきました。それを感じさせた理由に、今回のネームカードがそのうちのひとつとして挙げられ、もとは私自身の **言い出しっぺ** よりこのプロジェクトがスタートしています。

結果的にこのネームカードを進めて良かった、物理・オンラインで自身のネームカードを確認できる喜びを感じられたという声を多々耳にすることも、事実として感じました。

すでに、来年に向け Vue Fes Japan 2024 の活動が水面下では動き始めており、自身は引き続きウェブサイトチームのひとりとして様々なチャレンジをさせていただく予定で考えていますが、どなたがそのリーダーを務めるかは現時点では決まっておりません。

もし、来年のウェブサイトに携わってみたいという方がいらっしゃれば、ご気軽に (DM など) お声がけください。

おそらく、来年初め辺りにも Vue Fes 公式 note より、募集が入ることになると思いますので、その場でも問題ありません。

しかし **来年も、ネームカードは機能をブラッシュアップした上で、物理・オンラインとも提供する** ことになると想定していますので、その方針さえ決まれば最善を尽くしていっしょに頑張っていければと考えています。

またこうした知見発信の促進はもちろん、ローカルの Vue.js コミュニティ [v-kansai](https://vuekansai.connpass.com/) の再興なども、来年こそやっていけたらと考えています。

https://vuekansai.connpass.com/
