---
layout: Article.tsx
publish_date: 2020-12-28
title: '2020 年にさわった技術'
description: '2020 年の最後に、この「コロナ禍」な 1 年間を振り返る。'
slug: my-own-used-technology-in-2020
reaction: 🔍
category: Poem
tags:
  - Review
  - COVID19
---

2020 年最後のポスト。

## 立場

主に店舗運営を支援するプロダクト・サービスの運用・開発に、一フロントエンドエンジニアとして関わらせていただくと共に、個人としてもいくつかプロダクト製作を進めています。

https://smaregi.jp/

そうした前提の下で一年間の KPT、利用した技術一覧を見ていきます。

### Keep : 良かったこと / 今後も続けたいこと

(総括)

- ユーザビリティ・アクセシビティを考えた UI コンポーネントのリプレース
- フロントエンド環境刷新、属人化解消
- ブログ 26 件 / 49975 文字数で、技術記事 (スクラップ含む) を 10 件、個人・イベント振り返りを 16 件
- 登壇 4 件 (オフライン 1 件、オンライン 3 件)
- オンライン運営を中心に知見が集まった
- 個人用 org を作った
- コントリビュート 45 プロジェクト
  - jiyuujin/webneko-blog
  - etc

### Problem : 上手く行かなかったこと

(総括)

- 自身がメインでジョインさせてもらっていたプロジェクト (Cake) でリプレースが落ち着いた
- ブログの年間技術投稿が 8 件と少なかった
- 登壇駆動開発と称し登壇時にのみ投稿するよう限った
- 関西ローカルの Vue.js コミュニティ v-kansai の活動が事実上停止してしまった
- Twitter アカウントにログインできなくなってしまった

最後だけ自身の手違いだが、いずれも COVID19 を一因に言えます。

来年も同じような理由で上手く行きませんでした、というのでは少々惨めないので、ここはひとつ打開したい。

### Try : 今後実施すること

- 当ブログに Scrap 的なもの (Zenn のようなやつ) を導入する
- アクセシビリティについての学習を進める
- モノレポ開発、Yarn ワークスペースについての知見を深める

Scrap 機能はベータ利用という位置付けで当ブログに導入済。これまでのブログほどの内容では無いけれど、ちょっとしたことを記録するのに活用していきたい。

## 利用した技術の一覧

[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/0-profile-details.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/1-repos-per-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/2-most-commit-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/3-stats.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/4-productive-time.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)

これは [GitHub Profile Summary Cards](https://github.com/vn7n24fzkq/github-profile-summary-cards-example) という便利ツールを使わせてもらい自動生成している。自身の Github アカウント内のみ、他 Gitlab を使っているプロジェクト等あったが、この自動生成分には含まれていません。

主軸としては TypeScript/React/AWS の辺りでした。おしごとの場面では React を使うことが増え Vue 以上に触る機会が多くなりました。

フロントエンド環境の刷新から運用効率化の一端を担うツール製作まで、幅広くかつ手堅く動いていました。

https://docs.google.com/spreadsheets/d/1ft-vSMBrJW9z--xdtgSHGkME_ph9i2hbHMRFwyG255s/edit?usp=sharing

## 技術、そしてこれから

昨年は Vue CLI をベースに MPA 環境の構築を進めたが、これとは全くの別プロジェクトながら同じような MPA 環境の構築を進めています。単なる描画に留まらずユーザの意向をサーバサイドに反映する、SPA としての双方向性の実現に寄与しました。

既に納品を済ませたものについては、取り急ぎ Vue 3 へ更新する予定はありません。

しかし、Options API を採用したことで、今後仮にメジャーアップデートを試みたとしても、そこまで大変な労力にならないのではと考えています。

一方、Vue MPA 環境の外に構築を進めている React MPA 環境下では、React Hooks を書いていくことを基本としたガイドラインを策定しました。

また、多言語化の一環で、新たに react-i18next を選定し、その導入を進めました。

最後に、コンポーネント集 (仮) の製作を開始しました。まだ、既にプロダクトへ組み込まれたもの、そうではないものにと二分されていますが、実際こればかりはフロントエンドをやっている身が私のみというプロジェクトでやるせない気持ちも然り。

しかし、フロントエンド技術の標準化に時間を当てられたのは、こうしたプロジェクトにとって大変意義深いことだと感じています。

## 最後に

去年以上にライブラリ用プラグインを自作することが多かった 1 年。無ければ自分たちでプラグインを作るのをモットーにした。

その例を下記に挙げた。

- vue-datetimerange-picker
- vue-single-picker

プライベートに限っては型を無視して JavaScript で書くこともあったが、ちょっとしたツール製作を含めても、大体 TypeScript で書いていた。

スプレッドシートでイシューを管理しているため Google Apps Script を使って効率化を図る場面が増えた。また GCP AppEngine や CloudRun を組み合わせてトリガー実行する場面も多く存在、お金もかからないのでとても重宝していたり、と Google 様々。

来年はフロントエンド技術を磨くのはもちろん「特定のフレームワークにとらわれず」新たな知見を生み出したい。
