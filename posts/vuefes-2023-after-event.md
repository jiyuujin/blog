---
layout: Article.tsx
publish_date: 2023-12-05
title: 'Vue Fes 2023 アフターイベント @LY (Fukuoka)'
description: 'LINE ヤフーコミュニケーションズさんの Vue Fes Japan 2023 スポンサリングに伴うアフターイベント開催にあたって、kazupon 氏と同行させていただきましたので、その記録をば。'
slug: vuefes-2023-after-event
reaction: 🤨
category: Poem
tags:
  - Advent-Calendar
  - VueFes
---

この記事は jiyuujin Advent Calendar 2023 の 5 日目の記事になります。

https://adventar.org/calendars/9670

技術イベントで福岡に来たのは、個人的に 2019 年のフロントエンドカンファレンス福岡以来。

https://fukuokajs.connpass.com/event/302013/

[kazupon](https://twitter.com/kazu_pon) 氏と福岡まで同行したので、その記録をば。

会場は、博多駅前に拠点を構える LINE ヤフーコミュニケーションズ株式会社様。

![](https://i.imgur.com/ZRC5kSA.jpg)

すでにご存知の方も多いとは思いますが、今年 10 月 1 日付けで商号が変更されています。

https://lycomm.co.jp/ja/pr/news/2023/072716

Vue Fes 2023 でスポンサリングいただいたご縁を機に、今回のアフターイベントに繋がりました。

https://vuefes.jp/2023/sponsors/line-yahoo-communications

## 福岡の地に 30 名近く集う

なんといっても、あの kazupon 氏が福岡で登壇されるとあって、東京開催では無い場所に 30 名近くが集いました。

しかも、この度初めて kazupon 氏が福岡に来られたとのことで、同じく前乗りさせていただいた私から見ても、非常に堪能されているように思えました。

さて本題ですが Vue を取り巻くエコシステム、フロントエンドツールチェーン周りで、一部 Rust への置き換えが始まっており、既存との互換性も考慮する必要が出てくるあたりいろいろと考えさせられるタイミングを迎えています。

個人的には Vue 2 から 3 へ更新した際に苦労された方も多いと耳にしつつ、この年末にも Vue 2 が EOL を迎える訳ではありますが、そのときの想いに似たようなものを感じざるを得ません。

https://v2.vuejs.org/lts/

さて、トーク中に扱われていたキーワードを列挙してみます。

- [rolldown-rs](https://github.com/rolldown-rs) (現在 private リポジトリで開発中)
- [rspack](https://github.com/web-infra-dev/rspack)
- [oxc](https://github.com/oxc-project/oxc)
- [biome](https://github.com/biomejs/biome)

すでに oxc については、[Playground](https://web-infra-dev.github.io/oxc/playground/?code=3YCAAIDigYCAgICAgIC0G8rnONK88yBy9gF2iiieayjKrgMZxIq8mEeJXIshFBO8zDODxzozyHKiRmdtKDlDz0HUZFkWB4B5wVzdkq%2BhvCdGU5OGn9PJKUj5tg6elK%2Fm8pTzAOv1iGD8WKMC7xIUU4xP3NM1DnHfz6P28P%2BJIhsB7RfO8L94faI%2BtOkb3vuFivobKq3tPfG2pJbAqyvRcRWZSvQEPqAEsT13hmbuZNFE8fu5ccv52vz4MjzzV6extOFeq8JN4MsEWiICWI%2Fu71ITxNBMKbFtFGsMGoNm26S7mp%2BjpHb3R5hoz95vCfe5ka1xhWBmVuB1fn9%2FZ93pFw%3D%3D) をはじめ、[VS Code の拡張機能](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) も存在するとのことで、試す価値があるように思います。

また、biome (v1.4.0) の Prettier チャレンジに対するフォーマット結果が最近、話題になりました。

https://github.com/biomejs/biome/issues/739

Prettier の「JS/TS/JSX に関するテストケースを 95% 以上通す」Rust 実装を募集しました。

https://console.algora.io/challenges/prettier

こういったキーワードだけをかいつまんでみたところ、時間なんぼあっても足りません。

ですが、かなりぎゅっと凝縮した形で話されておりますので、その中身については以下スライドのリンクよりご確認ください。

https://speakerdeck.com/kazupon/vue-and-vite-rustify

### LT

LINE ヤフーコミュニケーションズ株式会社の中村さんからは Historie について、株式会社 Fusic の夛田さんからは NativeScript についてのトークがありました。

(資料共有があれば、随時更新させていただきます)

中でも Storybook でいうストーリーを Vue ファイルと同じように記述できる Historie については、自ら初めて耳にしました。

https://histoire.dev/

来年の Vue Fes 2024 で取り入れてみようかな、など考えてみた次第でございます。

## 最後に

Vue Fes 2023 アフターイベントとしては、運営サイドが把握する限りでいうと、今回のイベントが「締め」のイベントになりました。

2018 年以来ともなる、およそ 5 年ぶりのオフライン開催を無事に完遂、再びエコシステムやコミュニティに対して、ひとつの大きな刺激が入ったことを大きく痛感させられています。

![](https://i.imgur.com/X6WFHOq.jpg)

当日同時間帯に公開されたアフタームービーは、コアスタッフの [keigo](https://twitter.com/kspace_trk) 氏が作り上げた傑作になりますので、こちらも合わせてチェックいただければ。

https://www.youtube.com/watch?v=rWIal-epFXQ&t=3s

なお、LINE ヤフーコミュニケーションズ株式会社の会場でもこちらと同じ動画が流れましたが、いつもに増してたいへんエモかったです！

### Web サイトをリードしてきた身から一言

今年 1 年間私自身 Vue Fes 2023 公式 Web サイトの製作・運用をリードしてきましたが、昨年以上の技術的なチャレンジを推進し新たなカンファレンス体験を創造してきた一方、オンラインネームカードではユーザーには分かりづらい仕様の下リリースを推進したことが、多々ご迷惑をおかけすることにも繋がりました。

現時点自身の中で改めるべきポイントは把握しておりますが、来年も (特に不都合なければ) Web サイト製作に参画させていただく予定ですので、より良いカンファレンス体験が得られることを目指していきます。

ちなみに、Vue Fes 2023 公式 Web サイトで使われている技術の詳細については後日、こちらのブログで書かせていただきますので、暫くの間お待ちください。

最後に、今回参加された皆さまでお馴染み (?) の Vue ポーズ。

![](https://i.imgur.com/21RBrtR.jpg)
