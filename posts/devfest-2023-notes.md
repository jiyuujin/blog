---
layout: Article.tsx
publish_date: 2023-12-11
title: 'DevFest 2023 メモ'
description: 'DevFest 2023 リアタイできなかったので、取り急ぎ気になるポストを整理してみました。'
slug: devfest-2023-notes
reaction: 😈
category: Poem
tags:
  - DevFest
---

この記事は jiyuujin Advent Calendar 2023 の 11 日目の記事になります。

https://adventar.org/calendars/9670

X (Twitter) の [`#DevFest2023`](https://twitter.com/search?q=%23DevFest2023&src=typed_query) や [`#gdgtokyo`](https://twitter.com/search?q=%23gdgtokyo&src=typed_query) を確認させていただきました。

https://gdg-tokyo.connpass.com/event/301690/

Track 1。

https://www.youtube.com/watch?v=uuaxvgKrDtE

Track 2。

https://www.youtube.com/watch?v=ONwN3tpCSDA

## 登壇スライド一覧

他、分かり次第更新させていただきます。

### Google Cloud の GenAI サービスで「AI にファッションを褒めてもらうアプリ」を作ってみよう

(TBD)

「AI にファッションを褒めてもらう」アプリケーションのサンプル。

https://github.com/google-cloud-japan/sa-ml-workshop/blob/main/blog/Fashion%20compliment.ipynb

### 個人アプリ開発 (メンテナンス) 14 年の歴史

(TBD)

### 大画面デバイスにどう向き合えば良いのか？

(TBD)

### Vertex AI 2023 年の進化を振り返ろう

https://docs.google.com/presentation/d/e/2PACX-1vQ58O21N02tnQyYJjEJtIetOeRVlbSHYxU8w1mfa7M7q9X1ya-Tw80WiswjiuYj3SeMXRkEElwdwpv0/pub?start=false&loop=false&delayms=3000&slide=id.g228dee1d198_1_372

### Robolectric Native Graphics and Roborazzi

https://speakerdeck.com/takahirom/robolectric-native-graphics-and-roborazzi

### 2023 年のウェブ

https://docs.google.com/presentation/d/1ynfqbrsZCOzMwsAh-p80cPRt1P9IjkRCrx6JJoMUELk/edit?usp=sharing

### Compose 時代のパフォーマンス感覚

https://docs.google.com/presentation/d/1D-okKoQ6-6DC0lgQXdYRIiQ_FKi_ShSRTrnwmoNr77o/edit?usp=sharing

### Firebase Authentication Best Practices

(TBD)

### New in Angular

https://docs.google.com/presentation/d/1FGKIQqS2c55rO5JxfSbQyP7aVmlLLLBpZ7orvAmdXHQ/edit?usp=sharing&resourcekey=0-IzQDRO5GGtJR00_SFOFQQA

### Google Cloud でチームで安全にデプロイをする

https://speakerdeck.com/sakajunquality/devfest-tokyo-2023-introduction-to-cloud-deploy

### Google Cloud による SLSA の活用

(TBD)

### 2023 Flutter/Dart Summary

(TBD)

### 開発者だって BigQuery 使うってよ

(TBD)

### ページ遷移の高速化 2023 年最新のページナビゲーション事情

(TBD)

### これから Go に入るイテレータのすべて

(TBD)

### Google Marketing Solutions の Github から学ぶ Google Style Guides

(TBD)

### Firebase Hosting を使って Passkey を android アプリで試してみよう

https://speakerdeck.com/ryunen344/firebase-hostingwoshi-tutepasskeywoandroidapurideshi-sitemiyou

### Firebase Apple SDK 年間ダイジェスト: 2023年

https://speakerdeck.com/treastrain/firebase-apple-sdk-annual-digest-2023

### Flutter × Jetpack Compose の相互運用

https://speakerdeck.com/yumnumm/flutter-x-jetpack-composenoxiang-hu-yun-yong-at-gdg-tokyo-2023

### Flutter Favorite プログラムについて調べてみた

https://speakerdeck.com/k9i/flutter-favoritepuroguramunituitediao-betemita

### DevTools Extension 3 分クッキング

https://speakerdeck.com/daiki1003/devtools-extension-3fen-kutukingu

### 2023 年に Dart で Web サイトを作る 3 つの方法

https://hackmd.io/@krgm4d/S1-Cxoa4a#/

### Cloud Firestore のスキーマ定義の Flutter 向けコード生成について

https://www.slideshare.net/saigusa758cloudy/cloudfirestoreschemacodegenerationforflutterpdf

### 開発中の flutterfire_gen パッケージについて

https://zenn.dev/kosukesaigusa/articles/flutterfire_gen

## 特に注目している箇所

JSConf JP 2023 同様色々、注目したいものは多かったように考えています。

個人開発の歴史をふりかえられた際に、おっしゃられた「未来の自分は他人」というのをいま一度大切にしたいですね。

- AI 関連
- 最近の Angular
- Google Style Guides

また、なんといっても AI 関連から PaLM 2 API を使用した画像の解析、image-to-text によるテキストの自動生成については、たいへん気になるところでございます。

https://cloud.google.com/vertex-ai?hl=ja

実際「AI にファッションを褒めてもらう」アプリケーションでは、指定の画像を Base64 エンコードして送信する際が、アプリケーションを構築する過程で特に煩わしかった点が存在したことも、フロントエンド開発者としてわかりみを感じました。

アプリケーションのリポジトリが公開されているとのこと、チェックしておきたいですね。

https://github.com/google-cloud-japan/sa-ml-workshop/tree/main/blog/Fashion-Compliment-App

なお、米国時間 12/13 開催の [Applied AI Summit](https://cloudonair.withgoogle.com/events/summit-applied-ml-summit-23) のキーノートでは、Gemini を使ったデモもあるとのことで、こちらも合わせてチェックしておきたいですね。

https://x.com/kazunori_279/status/1732546102472462671?s=20

続いて Web 界隈から、Web ブラウザ互換性向上に向けた CSS 機能開発やパスキーを巡る対応、障害者差別解消法の改正、最近の Angular について。

中でも障害者差別解消法の改正や、最近の Angular については、気に留めなければいけません。

来年 4 月より、アクセシビリティ対応が必須、事業者の責任が問われるため、いまからでも意識を変える必要がありますね。

https://www8.cao.go.jp/shougai/suishin/sabekai_leaflet-r05.html

また、いまとなっては私自身が React/Vue/Svelte 界隈にどっぷり浸かっている身にいますので、この登壇を通してめちゃ Angular の印象が変わりました。

特に、登壇の中で話されたのは、直近リリースされた [v16](https://blog.angular.io/angular-v16-is-here-4d7a28ec680d) と [v17](https://blog.angular.io/introducing-angular-v17-4d7033312e4b)、[Roadmap](https://angular.dev/roadmap) について。

- ステート管理で新しい概念 Signals (RxJS を使わなくて済む？)
- ビルドシステム ESBuild への移行 (webpack より)
- Angular.dev を含めたリブランディング
- `@for` ブロックなどお作法

Google I/O 2023 におけるリアクティヴィティの登壇についても、改めてチェックしておきたいですね。

https://javascript.plainenglish.io/google-i-o-2023-getting-started-with-angular-signals-928e249a56ed

また、途中 Google Style Guides も話題に上がったセッションがあられたようで、特に TypeScript の [Guide](https://google.github.io/styleguide/tsguide.html) については、個人的にも参考にさせてもらっています。

https://google.github.io/styleguide/

### 余談

早々にチケット購入も済ませて、直前まで参加をワクワクしていたものの、急きょ個人的な所用が舞い込んだので参加は叶いませんでした。

せっかくの機会に [スタッフ応募](https://docs.google.com/forms/d/e/1FAIpQLSe90PXWphuP8meOte_OPs_W2jMgpCSkNHTGuWxhCGZG8A37DA/viewform?usp=send_form) も検討するかな、などとも少しばかり考えております。

https://x.com/gdgtokyo/status/1733368871388856432?s=20

ポストを見ながら、非常に刺激の多い様を確認でき、来年こそは是非とも参加させていただければなどと考えています。
