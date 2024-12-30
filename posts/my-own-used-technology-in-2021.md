---
layout: Article.tsx
publish_date: 2021-12-27
title: '2021 年にさわった技術'
description: '今年も振り返る。2021 年の最後に 2 年も続いた「コロナ禍」な 1 年間を振り返る。'
slug: my-own-used-technology-in-2021
reaction: ⛄️
category: Poem
tags:
  - Review
  - COVID19
---

2021 年最後のポスト。

昨年の記事と比較・参照していただればと幸いです。

(過去の記事)

- [Web デベロッパとして 2020 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2020)
- [Web デベロッパとして 2019 年に使った技術スタック](https://blog.nekohack.me/posts/my-own-used-technology-in-2019)

## 立場

前半はフロントエンドエンジニアを主に時たまサーバサイドも触れながら、後半はフロントエンドに限らずサービス開発エンジニアとしてプロダクトの成長に関わらせていただきました。

半期前半は主に、新 API 規格「スマレジ 4」の開発を中心に、店舗運営を支援するプロダクト・サービスの開発を進めました。

https://smaregi.jp/

半期後半は主戦場となるプロジェクトを変え、主にオンラインイベント配信ツールの機能開発を支援するプロダクト・サービスの開発を進めました。

https://jp.vcube.com/eventdx/eventin

主に昨年を含めたこの 2 年間、取り組んできたプロジェクトでは下記の通りとなります。

- スマレジ POS
  - PWA 対応のセルフオーダー画面を構築 (AWS Lambda や Vue を利用)
  - React/MobX を利用した MPA 環境を構築
  - プラグインベースの開発に向けたフロントエンド用プラットフォーム、デザインシステム (仮) を構築
- EventIn
  - React/Express/WebSocket を使用しているサービスにおける導線改善

今年もちょっとしたツール製作などを含めても React/TypeScript をメインに書いた一方で、お仕事の場面では全く Vue を書きませんでした。

またアクセシブルな開発の実現に向けて、プロジェクト内でアクセシビリティの啓蒙推進を開始させており、そのベースのひとつとも言えるプロジェクト内で適用予定のガイドライン策定は、目下進行中となります。

また、今年も個人としてのプロダクトも、合わせていくつか製作・運用を進めています。

ここで今年利用した技術の一覧を下に示してみます。

[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/0-profile-details.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/1-repos-per-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/2-most-commit-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/3-stats.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/4-productive-time.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)

これは [GitHub Profile Summary Cards](https://github.com/vn7n24fzkq/github-profile-summary-cards-example) という便利ツールを使わせてもらい自動生成している。自身の Github アカウント内のみ、他 Gitlab を使っているプロジェクト等あったが、この自動生成分には含まれていない。

https://github.com/vn7n24fzkq/github-profile-summary-cards-example

なお、今年もテーマの主軸は TypeScript/React/AWS の辺りとなります。

https://docs.google.com/spreadsheets/d/1ft-vSMBrJW9z--xdtgSHGkME_ph9i2hbHMRFwyG255s/edit?usp=sharing

昨年同様、適宜業務の必要に応じてフロントエンド環境の刷新から運用効率化の一端を担うツール製作まで、幅広く動いていた一方でイベント振り返りを Note で書いた点が昨年と違います。

昨年の記事と比較・参照していただけますと幸いです。

https://blog.nekohack.me/posts/my-own-used-technology-in-2020

そうした前提の下で一年間の KPT、利用した技術一覧を見ていきます。

### Keep : 良かったこと / 今後も続けたいこと

開発者の視点でアクセシブルな開発を啓蒙、パフォーマンス最適化、フロントエンド環境を刷新させてもらっていました。

また、属人化解消を目的としてエンジニア教育にも注力いたしました。

(総括)

- ブログ 38 件
  - [当ブログ](https://blog.nekohack.me/) で技術記事を 28 件
  - [note](https://note.com/) で個人・イベント振り返りを 10 件
- 登壇 3 件
  - 2021/11/01 [VSCondeCon JP 2021 の内幕](https://blog.nekohack.me/posts/inside-the-website-in-vscodecon-jp-2021)
  - 2021/10/28 [Github issues を CMS として扱う](https://blog.nekohack.me/posts/github-issues-usage-as-a-cms)
  - 2021/04/12 [コミュニティハンズオンにおける DevRel のすゝめ](https://blog.nekohack.me/posts/challenge-the-community-handson-2021)
- 日本初 Flutter カンファレンス (FlutterKaigi) のオーガナイズ
- VS Code Meetup 主催のカンファレンス (VSCodeCon JP) のお手伝い
- コントリビュート 101 プロジェクト
  - nuxt-community/content-module
  - FlutterKaigi/2021
  - etc
- Twitter スペースの運営を通して MC 力を身に付けた

コロナ禍の期間中にありながら、その時期特有の取組のひとつとして、Twitter スペースを利用した「朝活」の取組を継続させていただきました。

毎朝喋る内容を Notion のドキュメントに記録するため、Notion のデータベース機能を使用させていただきました。

ドキュメントのテンプレートを事前に準備、Notion API を利用することで、ドキュメントのベースを作成するのを効率化できます。

https://blog.nekohack.me/posts/notion-api-usage-as-a-database/

開催にこぎ着けた FlutterKaigi 2021 について、無事に初回の開催を遂げることができました。

https://blog.nekohack.me/posts/flutter-communities-in-2021/

https://blog.nekohack.me/posts/thanks-to-join-flutterkaigi-2021/

### Problem : 上手く行かなかったこと

- Flutter ハンズオンで自身の満足がいく運営の下進められなかった
  - ハンズオンコンテンツは、大西氏 (通称: 大西先生) に全てを任せていたものの、さすがに任せ過ぎて介入を試みたところで意見の衝突があった
- 下半期は PWA Night を始めとした各種コミュニティの運営に支障を来たした
  - 昨年に続いて v-kansai の活動は引き続き停止したまま

昨年以上に設計を考えさせられる比重 (時間) が大きいと感じた。プロダクトの安定稼働はもちろん、それと並行していかに機能開発とそのブラッシュアップを高めていくかと言うのを求めていることを実感しました。

またコミュニティについては整理する時間が必要だ。場合によっては運営を下りる選択肢も厭いません。

## 最後に

来年以降、フロントエンド技術に限らずインフラサイドへの知見を深めることはもちろん、今年以上に OSS への関与を増やすことを目標のひとつに掲げたい。
