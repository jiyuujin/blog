---
layout: Article.tsx
publish_date: 2024-12-30
title: '2024 年にさわった技術'
description: '今年も振り返る。昨年以上にコミュニティ活動を深化させた 1 年間を振り返る。'
slug: my-own-used-technology-in-2024
reaction: 🏊
category: Poem
tags:
  - Review
---

2024 年最後のポスト。

この記事をもって 2024 年を〆させていただきます。

すべて技術関連ではなく、一部プライベートな話にも、踏み込ませていただいております。

なお、4 年前より継続して書いてきた記事と比較・参照していただればと幸いです。

(過去の記事)

- [閉会宣言、2023 年にさわった技術](https://blog.nekohack.me/posts/my-own-used-technology-in-2023)
- [2022 年にさわった技術](https://blog.nekohack.me/posts/my-own-used-technology-in-2022)
- [2021 年にさわった技術](https://blog.nekohack.me/posts/my-own-used-technology-in-2021)
- [2020 年にさわった技術](https://blog.nekohack.me/posts/my-own-used-technology-in-2020)
- [2019 年にさわった技術](https://blog.nekohack.me/posts/my-own-used-technology-in-2019)

## 立場

現在 [wevnal](https://wevnal.co.jp/service/chatbot/) で、一フルスタックのエンジニアとしておしごとさせていただいております。

そうした本業と合わせ、今年も個人のプロダクトのみならず、カンファレンスへの関与も強めさせてもらっています。

そうした前提の下で一年間の KPT、利用した技術一覧を見ていきます。

### Keep : 良かったこと / 今後も続けたいこと

まず、個人の [しずかなインターネット](https://sizu.me/) を廃止しました。

ブログメディアを複数有したところで、その使い分けを決定すること自体、たいへん難しいものと考えています。

その一方で [Zenn](https://zenn.dev/) については、パブリケーションの存在がありますので、それに関係するポストを進めさせていただきます。

https://zenn.dev/p/line_dc

https://zenn.dev/p/comm_vue_nuxt

(総括)

- ブログ 18 件
  - [当ブログ](https://blog.nekohack.me/) で技術記事を 6 件
  - [Zenn](https://zenn.dev/) で技術記事を 3 件、スクラップを 8 件
  - [note](https://note.com/) で個人・イベント振り返りを 1 件
- 4 年連続の開催となった Flutter カンファレンス (FlutterKaigi) のオーガナイズ
- 3 年連続の開催となった Vue.js 日本ユーザーグループ主催のカンファレンス (Vue Fes) のお手伝い
- コントリビュート 34 プロジェクト
  - [vuejs-jp/vuefes-2024](https://github.com/vuejs-jp/vuefes-2024)
  - [jiyuujin/mastersync-app](https://github.com/jiyuujin/mastersync-app)
  - [jiyuujin/lunchnearby-app](https://github.com/jiyuujin/lunchnearby-app)
  - [jiyuujin/stopwatch-app](https://github.com/jiyuujin/lunchnearby-app)
  - etc

wevnal の BOTCHAN プロジェクトの機能開発を進めさせていただき、並行して知見の言語化にも時間をあてました。

当たり前のように GitHub Copilot や ChatGPT のお世話になる場面も増え、真面目にコーディングする時間は昨年と比較しても、格段に下がっていることは明らか。

ちょうど昨年の今ごろ、社内管理画面のビルド周りで webpack ベースの create-react-app から rspack へリプレースさせていただきました。

https://blog.nekohack.me/posts/cra-to-rspack/

あれから rspack については v1 正式版が [リリース](https://rspack.dev/blog/announcing-1-0) されています。

https://rspack.dev/blog/announcing-1-0

現在、下記機能に注力することがアナウンスされており、今後もっと広く Rspack とそのエコシステムが使用される可能性も高くなってくるものと考えています。

- さらなる HMR の高速化
- ポータブルキャッシュ (順次メモリキャッシュ、永続キャッシュ、ポータブルキャッシュの実装を進める)
- TypeScript の静的情報を活用したコンパイルの最適化
- 安定した Rust API の公開
- RSC (React Server Components) のサポート
- ESM 出力の改善 (Rspack に基づく Rslib のサポート拡大)

この手のツールチェイン系のアップデートは、この Rspack のみならず、他についてもトラッキングしていきたい。

### Problem : 上手く行かなかったこと

(総括)

- 公私共に忙しくさせていただいていた
  - 昨年に続き、今年も登壇や執筆が 0 件だった

昨年の登壇や執筆が 0 件となってしまったのに加え、ブログも比較的少なかったと認識しています。

Vue Fes ウェブサイトをリードさせてもらっていた経験から、10 月の当日直前と 12 月の全体的なふりかえりで、今年の目玉のひとつ「シェア URL」を中心に書かせていただきました。

https://zenn.dev/comm_vue_nuxt/articles/deep-dive-vuefes-2024-waiwai

https://zenn.dev/comm_vue_nuxt/articles/vuefes-2024-follow-up

3 年連続でリードさせていただいた、直後のウェブサイトチームのリードが予定されている方をサポートさせていただければ、とこれまでの仕様を言語化しております。

https://vuefes-2024-docs.pages.dev/

そんな Vue Fes について、来年は自身の介入の度合を調整 or 場合によっては離脱させていただく予定となる可能性を否定しません。

また、年の瀬より具体的なアクションをとり始めておりますが、来年はフロントエンドカンファレンス関西 (仮) を復活開催へ主導させていただきたく年始のキックオフをセットアップ、興味のある方とのヒアリングを開始します。

https://x.com/fec_kansai/status/1871021680505839711

https://bsky.app/profile/fec-kansai.bsky.social/post/3ldwvh5rfhc2t

来年も引き続き、オフラインのカンファレンス開催に協力させていただきつつ、より地元密着の形で交流することも目指していきたいと考えております。

## 最後に

来年以降、フロントエンド技術に限らずインフラサイドへの知見を深めることはもちろん、今年以上に OSS への関与を増やすことを目標のひとつに掲げたい。
