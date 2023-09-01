---
layout: Article.tsx
publish_date: 2022-12-29
title: 'Web デベロッパーとして 2022 年に使った技術スタック'
description: '今年も振り返ります。昨年とはうって変わって「三年ぶり」尽くしな一年間を振り返ります。'
slug: my-own-used-technology-in-2022
reaction: ⛳️
category:
tags:
  - Review
---

2022 年最後のポスト。

一昨昨年や一昨年、昨年の記事と比較・参照していただればと幸いです。

- [Web デベロッパとして 2021 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2021)
- [Web デベロッパとして 2020 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2020)
- [Web デベロッパとして 2019 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2019)

また、先週の PWA Night 46 (年内最後) に今年 OSS プロダクトで取り組んだ Web 体験向上 tips について、語る機会 (10 min.) をいただきました。

![](https://i.imgur.com/2XDasw4.png)

https://www.figma.com/proto/12yGlG2LfcrkJ3eWDot0vj/Slides?node-id=13%3A279&starting-point-node-id=13%3A279

## 立場

前半・後半ともにサーバサイドへ触れながらも、フロントエンド全般について、サービス開発エンジニアとしてプロダクト (EventIn) の成長に関わらせていただきました。

昨年より、腰を据えて React/WebSocket/AWS を使用しているサービスの改善に努められている点は大きいと考えています。

今年も個人のプロダクトのみならず、OSS への関与を強めています。

また、個人のプロダクトとして 2018 年より Nuxt 製の技術ブログがありましたが、最近 (秋口にかけ) Deno 製の技術ブログにリプレースしています。

| before                                | after              |
| :------------------------------------ | :----------------- |
| Nuxt × Contentful × AWS ECS / Fargate | Deno × Deno Deploy |

こちらのリプレースについて、来年 2023 年早々というタイミングで、共有できればと考えています。

そうした前提の下で一年間の KPT、利用した技術一覧を見ていきます。

### Keep : 良かったこと / 今後も続けたいこと

- 開発者の視点でアクセシブルな開発を啓蒙、フロントエンド環境刷新
- デザインシステム構築に向け汎用コンポーネント開発を始め、共有資産の形成に注力
- ブログ 31 件
  - [当ブログ](https://blog.nekohack.me/) で技術記事を 14 件、スクラップを 10 件
  - [Zenn](https://zenn.dev/) で技術記事を 3 件、ブックを 2 件、スクラップを 1 件
  - [Note](https://note.com/) で個人・イベント振り返りを 1 件
- 登壇 11 件 (外部の勉強会やハンズオンで 4 件、内々の勉強会やハンズオンで 7 件)
  - 2022/12/21 [今年自分が OSS プロダクトの中で、特にこれをやって Web 体験向上した話](https://www.figma.com/proto/12yGlG2LfcrkJ3eWDot0vj/Slides?node-id=13%3A279&starting-point-node-id=13%3A279)
  - 2022/10/07 [モノレポについて](https://blog.nekohack.me/posts/monorepo-tutorial)
  - 2022/07/02 [カレンダーアプリで学ぶパッケージ開発](https://zenn.dev/chooyan/books/calendar-package)
  - 2022/06/23 [わたしの OSS 活動について](https://docs.google.com/presentation/d/141tABAoz2LYozHC89fSwqqXJtGEX47mVXyJ5SEfYtZY/edit?usp=sharing)
  - 2022/06/15 [Google I/O 2022 Recap × WWDC 2022 Recap について](https://blog.nekohack.me/posts/22s-googleio-wwdc-recap)
  - 2022/04/21 [markuplint をカスタマイズする](https://blog.nekohack.me/posts/customize-markuplint-to-audit-accessibility)
  - 2022/04/14 [markuplint の動作環境を構築する](https://blog.nekohack.me/posts/setup-markuplint-to-audit-accessibility)
  - 2022/03/10 [アクセシビリティを基礎から学ぶ (第 2 版)](https://docs.google.com/presentation/d/1TGXqz-mg1mkKPRazb_jT5umxC98h6dXrhQqdJX4YJUE/edit?usp=sharing)
  - 2022/03/03 [React (Vite) × LIFF ハンズオン](https://blog.nekohack.me/posts/answer-to-learn-react-with-line)
  - 2022/01/20 [アクセシビリティを基礎から学ぶ (第 1 版)](https://docs.google.com/presentation/d/1z6OFNh3NnN9mP3Rh2wGhyOpy_QslKcZfR6I8K7blOEY/edit?usp=sharing)
- 執筆 1 件
  - 2022/09/16 [Git & GitHub 連携で役立つ機能](https://gihyo.jp/magazine/SD/archive/2022/202210)
- 昨年に続いて 2 度目の開催となった Flutter カンファレンス (FlutterKaigi) のオーガナイズ
- Vue.js 日本ユーザーグループ主催のカンファレンス (Vue Fes) のお手伝い
- LINE 主催のカンファレンス (Rev Up) のお手伝い
- VS Code Meetup 主催のカンファレンス (VSCodeCon JP) のお手伝い
  - 進行形。ただし、昨年ほどコミットできない見通しとなります mm
- OSS にコントリビュート 10 プロジェクト
  - FlutterKaigi/2022
  - chooyan-eng/flutter_calendar
  - chooyan-eng/calendar_widget
  - chooyan-eng/calendar_logic
  - vuejs-jp/vuefes-2022
  - LPF-REVUP/lpf-revup-2022
  - vscodejp/conference
  - etc

### Problem : 上手く行かなかったこと

- 比較的モダンな技術スタックを使っていてもなお、もっとできることがあるよねと考えさせられた
- ミートアップという名目のイベント開催が停滞していた
  - Flutter 日本ユーザーグループ主催のミートアップを開催していなかった
  - 昨年より引き続き PWA Night を始めとした各種コミュニティの運営に支障を来たした

今年は、より小規模なチームの下、プロジェクトを進めました。実際そうした場では、これまでと違いモブプロ・モブワークの取組をはじめ、スクラムらしいプロジェクトの進め方を実践しています。

比較的、自身の考えるところを独断 (と偏見) で追加してきた昨年とは大きく違って、大変設計を考えさせられる比重 (時間) が大きいと感じました。

安定稼働はもちろん、それと並行していかに、機能開発とその精度を高められるか求めていることを実感しました。

一方、技術コミュニティの面では具体的に PWA Night や VS Code Meetup など、実質的に参画の難しかった技術コミュニティが存在しました。

来年以降運営を下りる可能性も、引き続き視野に入れさせていただきます。

## 利用した技術の一覧

今年の主軸も TypeScript/React の辺りとなりましたが、最近 Rust の学習を始めています。

実際 Rust の学習では、ちょっとした CLI の製作より触れ始め、簡易的な API サーバを構築したりと Rust 力を研鑽しています。

また、開発フローの改善やモブプロの推進を始め、プロジェクトメンバーの意思統一や設計の認識合わせに努めています。

## 今年、生じた課題は

技術の深堀りに焦点を合わせて書かせていただいた一昨年、昨年の振り返りとは趣向を変えて、今年は課題に焦点を合わせて書かせていただいた。

リニューアル開発、という名の UX/DX 改善の推進に向けて、プロジェクト内で啓蒙・推進しました。

そのベースのひとつとも言えるガイドラインの策定は目下進行中となります。

以降、外部公開 (を見据えつつ) 積極的に共有・発信する機会をいただければ幸いです。

また、昨年の Problem を改善・払拭できたことも、今年の足しになったのではと考えています。

- Flutter ハンズオンで自身の満足がいく運営の下進められなかった
- 下半期は PWA Night を始めとした各種コミュニティの運営に支障を来たした

### 各種ハンズオンの進め方

今年は、講師として [LINE Developers](https://linedevelopercommunity.connpass.com/event/237619/) のハンズオンを、また企画・設計として [Flutter 日本ユーザーグループ](https://flutter-jp.connpass.com/) (Flutter Japan User Group)、並びに [FlutterKaigi 2022](https://flutterkaigi.jp/2022) のハンズオンを実施しました。

昨年と違う点は 2 点あります。

- リアルタイムに開催した
- ドキュメントを執筆した

LINE Developers のハンズオンでは、配信プラットフォーム shilas を使用しました。ちなみに、この shilas ではフロントエンドに Vue.js を、配信用 SDK に Agora を採用しているようです。

![](https://i.imgur.com/Sfe3sb1.jpg)

Flutter 日本ユーザーグループや FlutterKaigi のハンズオンでは、共に Zoom を使用しました。

![](https://i.imgur.com/3bRJEkY.png)

また、LINE Developers や Flutter 日本ユーザーグループのハンズオンでは [Zenn book](https://zenn.dev/books) を、FlutterKaigi のハンズオンでは [VitePress](https://vitepress.vuejs.org/) を [Netlify](https://www.netlify.com/) へホスティングする形で遺しています。

- [React (Vite) で LIFF アプリを作ろう](https://zenn.dev/jiyuujin/books/react-x-vite-x-liff)
  - [LIFF アプリを Next.js で動作させよう](https://zenn.dev/jiyuujin/articles/liff-on-nextjs)
  - [LIFF アプリを React 18 (Vite) で書いてみよう](https://zenn.dev/jiyuujin/articles/liff-on-react18)
  - [LIFF アプリを Vite 4 (React 18) で動かしてみよう](https://zenn.dev/jiyuujin/articles/what-is-vite4)
- [カレンダーアプリ製作](https://zenn.dev/chooyan/books/calendar-package)
- [GraphQL ハンズオン](https://flutterkaigi-2022-workshop.netlify.app/)

それぞれのアーカイヴ動画については YouTube へアップしています、こちらも合わせてご確認いただきたい。

- [フロントエンド攻略！はじめての React x LIFF ハンズオン #1 React & Vite 編](https://www.youtube.com/watch?v=D8GeQyrueEY)
- [Flutter Handson Osaka 10 - カレンダーアプリ製作](https://www.youtube.com/watch?v=dlAKk1VAQyA)
- [FlutterKaigi 2022 - Flutter × GraphQL ハンズオン](https://www.youtube.com/watch?v=I2Cw9z6vHzk)

FlutterKaigi 2021 では事前収録の下、ドキュメントに遺すことを行わなかったが、この類のワークショップを開催するにあたってそれは望ましくないと考えました。

こうして段階を踏んでしっかりと学びを得ようとする姿勢は、執筆したいという意気込みに繋がります。

### 各種コミュニティの運営

FlutterKaigi では、各個人の責務を明確化したことで、参加と不参加の境界線を明確にすることを心がけました。

もちろん、こちらの対応でコミュニティの負荷軽減が完全に行われたという訳ではないものの FlutterKaigi を始め、他コミュニティにもそうした権限移譲をより一層進めていければと考えています。

また、運営スタッフとの繋がりや近況の報告会を重視するため、オフ会の励行に努めました。

こちらは FlutterKaigi 忘年会の様子になります。

![](https://i.imgur.com/rbW2MJu.jpg)

この取り組み自体が結構、体験が良いものとなっているため、来年以降も継続したいと考えています。

そんなこんなで、以後コミュニティを高みに持っていきたいと考えています。

## 最後に

来年以降、フロントエンド技術に限らずインフラサイドへの知見を深めることはもちろん、今年以上に OSS への関与を増やすことを目標のひとつに掲げたい。
