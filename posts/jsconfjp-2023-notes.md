---
layout: Article.tsx
publish_date: 2023-11-22
title: 'JSConf JP 2023 メモ'
description: 'JSConf JP 2023 リアタイできなかったので、取り急ぎ気になるポストを整理してみました。'
slug: jsconfjp-2023-notes
reaction: 🥶
category: Poem
tags:
  - JSConfJP
---

X (Twitter) の [`#jsconfjp`](https://twitter.com/search?q=%23jsconfjp&src=typed_query) を確認させていただきました。

## 登壇スライド一覧

他、分かり次第更新させていただきます。

### Deep dive into Biome

https://speakerdeck.com/nissydev/deep-dive-into-biome-in-jsconf-2023

### LLM 全盛時代の開発プラクティス

https://speakerdeck.com/baseballyama/jsconf-jp-2023-llm-da-gui-mo-yan-yu-moderu-quan-sheng-shi-dai-nokai-fa-purakuteisu

### Build and Publish in 2023

https://jsconfjp-slide.pages.dev/

### フロントエンドリアーキテクチャリングと開発チームのスキルトランスファーにおける 9 ヶ月間の奮闘記

https://speakerdeck.com/wakamsha/hurontoendoriakitekutiyaringutokai-fa-timunosukirutoransuhuaniokeru9keyue-jian-nofen-dou-ji

### TypeScript で型定義を信頼しすぎず「信頼境界線」を設置した話

https://www.docswell.com/s/hireroo/5987RP-2023-11-19-JSConfJP-confidence-boundaries-of-values

### Next.js App Router クライアントキャッシュの仕組み

https://main--remarkable-figolla-a694f0.netlify.app/1

### Next.js App Router での MPA フロントエンド刷新

https://speakerdeck.com/mugi_uno/next-dot-js-app-router-deno-mpa-hurontoendoshua-xin

### Static Analysis: Shockingly Awesome! ⚡️

https://onedrive.live.com/view.aspx?resid=D699ACCFCBD51CF5%211028670&authkey=!AGe_JV4mJeVFUBA

### 書いた JavaScript がそのままブラウザで動く未来へ

https://zenn.dev/sosukesuzuki/articles/ab5377c8a99cb7
<!--https://speakerdeck.com/sosukesuzuki/jsconf-jp-2023-supikanoto-shu-itajavascriptgasonomamaburauzadedong-kuwei-lai-he-->

### Hono v3 and v4

https://speakerdeck.com/yusukebe/hono-v3-and-v4

### Bun がメジャーリリースされたけど、本当に Bun は Node.js に取って代るほどすごいのか？を AWS Lambda で検証してみた

https://speakerdeck.com/smt7174/bun-gameziyaririsusaretakedo-ben-dang-nibun-hanode-dot-js-niqu-tutedai-warunoka-woaws-lambda-dejian-zheng-sitemita

### ゲーム「WEB ページ崩し」の仕組み 〜 あなたの知らない DOM スクリプティングの世界 〜

https://docs.google.com/presentation/d/1hjs2J4fScWcs42oJ11F9uv1iuSnb_25TEZxyJo6UlLU/edit?usp=sharing

### Kotlin で書かれた GraphQL サーバーを Node.js でモジュラモノリス化している話

https://speakerdeck.com/hokaccha/modular-monolith-graphql-server-with-node-dot-js

### PrivacySandboxAPI を使ったブラウザ上での広告オークションについて

https://speakerdeck.com/kojiota/privacysandboxapiwoshi-tutaburauzashang-denoguang-gao-okusiyon

### Visually experience the beauty of mathematics with p5.js

https://speakerdeck.com/clown0082/visually-experience-the-beauty-of-mathematics-with-p5-dot-js

### Storybook 駆動開発 UI 開発の再現性と効率化

https://speakerdeck.com/kinocoboy2/jsconfjp2023-storybookqu-dong-kai-fa-nozai-xian-xing-toxiao-lu-hua

### Intl の今までとこれから

https://speakerdeck.com/sajikix/intlnojin-madetokorekara

### デザインシステム仕切り直し

https://speakerdeck.com/chloe463/dezainsisutemushi-qie-rizhi-si

### Second System Syndrome - the tale of power-assert

https://speakerdeck.com/twada/second-system-syndrome-a-tale-of-power-assert

### Kuma UI のこれまでとこれから

https://speakerdeck.com/poteboy/kuma-uinokoremadetokorekara

### JavaScript なしで動作するモダンなコードの書き方

https://speakerdeck.com/azukiazusa1/javascript-nasidedong-zuo-surumodannakodonoshu-kifang

### 画面遷移のアクセシビリティ課題を解決しうる Navigation API への期待

https://docs.google.com/presentation/d/1YVdn5yWHv3vI6sY_c-zo8zcDX2z4Ivpkhj7dJOivNMY/edit?usp=sharing

## 特に注目している箇所

色々、注目したいものは多かったように考えています。

`Intl.MessageFormat` 策定中。

https://github.com/unicode-org/message-format-wg

Interop 2024 で提案の Navigation API。

https://github.com/web-platform-tests/interop/issues/435

Node で biome を使おうぜ、という提案。

https://github.com/nodejs/node/pull/50672

文字列ではなく Object を作って渡す、という仕様。

https://web.dev/articles/trusted-types?hl=en

### 余談

所用があったので参加は叶いませんでしたが、参加できていたとしてもチケット購入のタイミングも合わず、ウェイティングリストに入っていたりでございました。

一説によると枠 100 強までしか、確保していないとのことで、FlutterKaigi と同規模のような気もします。

ポストを見ながら、非常に刺激の多い様を確認でき、来年こそは是非とも参加させていただければなどと考えています。
