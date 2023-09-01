---
layout: Article.tsx
publish_date: 2021-12-27
title: 'Web デベロッパーとして 2021 年に使った技術スタック'
description: '今年も振り返る。昨年に続いて 2021 年の最後に 2 年も続いた「コロナ禍」な 1 年間を振り返る。'
slug: my-own-used-technology-in-2021
reaction: ⛄️
category: Poem
tags:
  - Review
  - COVID19
---

2021 年最後のポスト。

昨年の記事と比較・参照していただればと幸いです。

- [Web デベロッパとして 2020 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2020)
- [Web デベロッパとして 2019 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2019)

## 立場

前半はフロントエンドエンジニアを主に時たまサーバサイドも触れながら、後半はフロントエンドに限らずサービス開発エンジニアとしてプロダクトの成長に関わらせていただきました。

また今年も個人としてのプロダクトをいくつか製作・運用を進めています。

- 半期前半は主に CakePHP/React/AWS を使用しているサービスの運用・開発に
- 半期後半は主に React/Express/WebSocket/AWS を使用しているサービスの運用・開発に

そうした前提の下で一年間の KPT、利用した技術一覧を見ていきます。

### Keep : 良かったこと / 今後も続けたいこと

- 開発者の視点でアクセシブルな開発を啓蒙、パフォーマンス最適化、フロントエンド環境刷新
- 属人化解消を目的としてエンジニア教育に注力
- ブログ 38 件
  - [当ブログ](https://blog.nekohack.me/) で技術記事を 28 件
  - [Note](https://note.com/) で個人・イベント振り返りを 10 件
- 登壇 3 件
  - 2021/11/01 [VSCondeCon JP 2021 の内幕](https://blog.nekohack.me/posts/inside-the-website-in-vscodecon-jp-2021)
  - 2021/10/28 [Github issues を CMS として扱う](https://blog.nekohack.me/posts/github-issues-usage-as-a-cms)
  - 2021/04/12 [コミュニティハンズオンにおける DevRel のすゝめ](https://blog.nekohack.me/posts/challenge-the-community-handson-2021)
- 日本初 Flutter カンファレンス (FlutterKaigi) のオーガナイズ
- VS Code Meetup 主催のカンファレンス (VSCodeCon JP) のお手伝い
- OSS にコントリビュート 7 プロジェクト
  - nuxt-community/content-module
  - FlutterKaigi/2021
  - etc
- Twitter スペースの運営を通して MC 力を身に付けた

### Problem : 上手く行かなかったこと

- 比較的モダンな技術スタックを使っていてもなお、もっとできることがあるよねと考えさせられた
- Flutter ハンズオンで自身の満足がいく運営の下進められなかった
- 下半期は PWA Night を始めとした各種コミュニティの運営に支障を来たした
  - 昨年に続いて v-kansai の活動は引き続き停止したまま

昨年以上に設計を考えさせられる比重 (時間) が大きいと感じた。プロダクトの安定稼働はもちろん、それと並行していかに機能開発とそのブラッシュアップを高めていくかと言うのを求めていることを実感しました。

またコミュニティについては整理する時間が必要だ。場合によっては運営を下りる選択肢も厭いません。

## 利用した技術の一覧

[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/0-profile-details.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/1-repos-per-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/2-most-commit-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/3-stats.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/4-productive-time.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)

これは [GitHub Profile Summary Cards](https://github.com/vn7n24fzkq/github-profile-summary-cards-example) という便利ツールを使わせてもらい自動生成している。自身の Github アカウント内のみ、他 Gitlab を使っているプロジェクト等あったが、この自動生成分には含まれていない。

なお、今年もテーマの主軸は TypeScript/React/AWS の辺りとなります。

https://docs.google.com/spreadsheets/d/1ft-vSMBrJW9z--xdtgSHGkME_ph9i2hbHMRFwyG255s/edit?usp=sharing

昨年同様、適宜業務の必要に応じてフロントエンド環境の刷新から運用効率化の一端を担うツール製作まで、幅広く動いていた一方でイベント振り返りを Note で書いた点が昨年と違います。

昨年の記事と比較・参照していただけると幸いです。

[Web デベロッパとして 2020 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2020)

## 技術、そしてこれから

スキルに焦点を合わせて書かせていただいた昨年の振り返りとは趣向を変えて、今年はプロジェクトに焦点を合わせて書かせていただきました。

この 2 年間、取り組んできたプロジェクトでは下記の通りとなります。

- スマレジ POS
  - PWA 対応のセルフオーダー画面を構築 (AWS Lambda や Vue を利用)
  - React/MobX を利用した MPA 環境を構築
  - プラグインベースの開発に向けたフロントエンド用プラットフォーム、デザインシステム (仮) を構築
- EventIn
  - React/Express/WebSocket を使用しているサービスにおける導線改善

今年もちょっとしたツール製作などを含めても React/TypeScript をメインに書いた一方で、昨年後半から 1 年以上にわたってお仕事の場面ではほとんど Vue を書きませんでした。

またアクセシブルな開発の実現に向けて、プロジェクト内でアクセシビリティの啓蒙を推進させました。

そのベースのひとつとも言えるでしょうガイドラインの策定は、目下進行中となります。

来年以降、公開できる範囲内でその知見を共有できれば幸いです。

また FlutterKaigi 2021 ティザーサイトの製作を通し、コントリビュートの機会を獲得できたことも大きい。

## 最後に

来年以降、フロントエンド技術に限らずインフラサイドへの知見を深めることはもちろん、今年以上に OSS への関与を増やすことを目標のひとつに掲げたい。
