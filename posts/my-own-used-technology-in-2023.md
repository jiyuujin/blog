---
layout: Article.tsx
publish_date: 2023-12-29
title: '閉会宣言、Web デベロッパーとしての 2023 年まとめ'
description: '今年も振り返る。昨年以上にコミュニティ活動を深化させた 1 年間を振り返る。'
slug: my-own-used-technology-in-2023
reaction: 🏇
category: Poem
tags:
  - Review
---

2023 年最後のポスト。

この記事をもって jiyuujin Advent Calendar 2023 を〆させていただきます。

![](https://i.imgur.com/IuINPIN.png)

https://adventar.org/calendars/9670

なんとなくやってみようという素朴な想いから始めたものの、想像以上にこの「毎日ポスト」は、ヘビーでございました。

すべて技術関連ではなく、一部プライベートな話にも、踏み込ませていただいております。

来年のことをいまのうちから言及するのは時期尚早かと考えていますが、25 日連続ポストしなくても良いのではなど考えたり、年の瀬に議論の種が増えました。

なお、4 年前より継続して書いてきた記事と比較・参照していただればと幸いです。

- [Web デベロッパとして 2022 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2022)
- [Web デベロッパとして 2021 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2021)
- [Web デベロッパとして 2020 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2020)
- [Web デベロッパとして 2019 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2019)

## 立場

前半はフロントエンドに限らずサービス開発エンジニアとしてプロダクトの成長に関わらせていただきつつ、後半はサーバサイドの比重をより増やす格好となりました。

半期前半は主に React/Express/WebSocket/AWS を使用しているサービスの運用・開発を進めました。

https://jp.vcube.com/eventdx/eventin

半期後半は主戦場となるプロジェクトを変え、主に React/NestJS/Azure を使用しているサービスの運用・開発を進めました。

https://wevnal.co.jp/service/chatbot/

裏で EventIn が使われている場面に遭遇して欲しいなどと、淡い期待を抱きながらこの半期は暮らしておりました。

とはいえ引き続き、腰を据えてプロダクト・サービスの改善に努められている点は大きいと考えています。

今年も個人のプロダクトのみならず、OSS とりわけカンファレンスへの関与を強めています。

また、個人のプロダクトとして昨年秋口より Deno 製の技術ブログのリプレースを実験させていただきましたが、最近 Deno 製の技術ブログにリプレースを完了する部分まで到達しています。

| before             | after                    |
| :----------------- | :----------------------- |
| Deno × Deno Deploy | Deno Lume × GitHub Pages |

結果的に 2023 年早々共有することなく、すっかり年末になってしまいましたので、また機会あればでございます。

そうした前提の下で一年間の KPT、利用した技術一覧を見ていきます。

### Keep : 良かったこと / 今後も続けたいこと

- 開発者の視点で設計を重視した開発の啓蒙、旗振り役としてそれを推進
- ブログ 37 件
  - [当ブログ](https://blog.nekohack.me/) で技術記事を 31 件
  - [Zenn](https://zenn.dev/) で技術記事 (スクラップ含む) を 1 件、ブックを 1 件
  - [しずかなインターネット](https://sizu.me/) で 3 件
  - [note](https://note.com/) で個人・イベント振り返りを 1 件
- 一昨年、昨年に続き 3 度目にして、初めてのオフライン開催となった Flutter カンファレンス (FlutterKaigi) のオーガナイズ
- 昨年に続いて 5 年ぶりのオフライン開催となった Vue.js 日本ユーザーグループ主催のカンファレンス (Vue Fes) のお手伝い
- ローカルの TypeScript コミュニティ kansai.ts 開催の復活
- コントリビュート 79 プロジェクト
  - flutter-osaka-dev/flutter-chat
  - vuejs-jp/vuefes-2023
  - etc

EventIn プロジェクトの UI リニューアルもひと段落つき、デザインシステム構築に向け汎用コンポーネント開発も終わりを迎えました。

こちらはしっかり、共有資産の形成に注力できたものと考えており、個人としてまた企業としてもその知見が蓄積されたものと考えています。あとは、自身のブログを使った知見発信を残すのみで、年明け以降機会あれば積極的に発信させていただければと想定しています。

### Problem : 上手く行かなかったこと

- 登壇や執筆が 0 件だった
  - そもそもオンライン勉強会をやらなくなっていること、オフライン勉強会もごく限られた場所では積極的にやられていることなどが考えられる
- Vue Fes ウェブサイトチームのリードに、大きく時間・工数が割かれた
  - こればかりはチームメンバーの稼働状況に一因があり、自身が巻き取るしか解決策がありませんでした
- ミートアップのイベント運営に入れなかった
  - 一昨年より引き続き、各種コミュニティ PWA Night や VS Code Meetup の運営に支障を来たした

登壇や執筆が 0 件となってしまったのは、ある種衝撃的な数値でございました。この数値に対し、ブログは継続的に書かせていただいておりますが、それでも書いていない期間が存在しています。夏から秋にかけて、ジョイン先のプロジェクトを変更させたことが、その要素として大きいと考えています。

是非とも来年は、オフラインのミートアップも開催させていきながら、技術カンファレンスの Call for Paper (CfP) に応募することを真剣に考えさせてください。

また wevnal では、新しいチームメンバーの下プロジェクトを進めたことに伴い、前プロジェクトの知見を言語化する時間にあてさせていただきつつ、日々認識合わせとそれに伴うアウトプット化をリードさせていただいております。

一方、技術コミュニティの面では昨年同様 PWA Night や VS Code Meetup など、参画の難しかった技術コミュニティが存在しました。

来年以降運営を下りる (実質的に下りている) 可能性もありますが、悪しからず。

## 最後に

来年以降、フロントエンド技術に限らずインフラサイドへの知見を深めることはもちろん、今年以上に OSS への関与を増やすことを目標のひとつに掲げたい。