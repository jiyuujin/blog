---
layout: Article.tsx
publish_date: 2023-03-22
title: 'STOPCOVID19 現況 データ更新終了のお知らせ'
description: 'かれこれ 3 年前よりデータの更新を継続していた STOPCOVID19 現況 ウェブサイトのステータスをメンテナンスモードに格下げさせていただきます。'
slug: stopcovid19-maintainance
reaction: 💉
category: Server
tags:
  - Nuxt
  - Vue
  - Vue2
  - Vercel
  - COVID19
---

## STOPCOVID19 現況を把握する

かれこれ 3 年間、毎日 1 日足りともトリガー実行を欠かさずデータの更新を継続していた [STOPCOVID19 現況](https://stopcovid19.vercel.app/) ウェブサイトについて、この度そのステータスをメンテナンスモードに格下げさせていただきます。

https://stopcovid19.vercel.app/

というのもそのきっかけとして、海外の事情をはじめ直近の風向きが変わりはじめつつある点を考慮しました。

中でも、下記ツイートがその象徴として挙げられるでしょうか。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【マスクの着用について】<br>本日から、マスクの着用は「個人の判断」が基本となります。<br>ただし、高齢者など重症化リスクの高い方への感染を防ぐため、医療機関を受診する時や、医療機関・高齢者施設などを訪問する時などは、マスクの着用をお願いします。<br> <br>▼詳細はこちら<a href="https://t.co/hhZmgdQjY4">https://t.co/hhZmgdQjY4</a> <a href="https://t.co/9JLl1FRioT">https://t.co/9JLl1FRioT</a></p>&mdash; 首相官邸 (@kantei) <a href="https://twitter.com/kantei/status/1635156626675212290?ref_src=twsrc%5Etfw">March 13, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

また 5 月より、新型コロナウイルス (COVID19) の指定分類も 2 類から 5 類に下げられる予定となります。

そもそも、このウェブサイトを製作していた事実をご存知ない方が大半に上るかと考えています。

実際、このウェブサイトでは、以下が chart.js により可視化されています。

- PCR 検査の陽性者数
- PCR 検査の実施件数
- 重傷者数
- 退院、療養解除となった者の数
- 入院治療を要する者の数
- 死亡者数
- ワクチン接種数 (累計)
- 回数別ワクチン接種数 (合計)

<video controls playsinline width="100%" autoplay loop muted="true" type="video/mp4" src="https://i.imgur.com/wfCE1Ma.mp4">
  Sorry, your browser doesn't support embedded videos.
</video>

主な技術スタックは下の通りになります。

- Nuxt 2
- TypeScript (Composition API)
- Google Apps Script (hosted some APIs) + Cloud Run

また、正直にいうと、ちゃんと設計の考えられている訳ではありません。

(3 年前の製作開始よりパッケージ諸共更新する暇もなく、そのままというこの..)

### オープンデータを使用する

ちなみに、これを製作するきっかけになったのが、オープンデータの存在より起因しています。

実際この手の COVID19 のデータ群は下記より辿って、オープンデータとしてどなたでも利用できます。

- [新型コロナウイルス感染症について オープンデータ (厚生労働省)](https://www.mhlw.go.jp/stf/covid-19/open-data.html)
- [これまでのワクチン総接種回数 (首相官邸)](https://www.kantei.go.jp/jp/headline/kansensho/vaccine.html)

かつて、オープンソース (OSS) 界隈では Code for Sabae (鯖江のために創る部) の [新型コロナウイルス対策ダッシュボード](https://www.stopcovid19.jp/) や、東京都の [新型コロナウイルス感染症対策サイト](https://stopcovid19.metro.tokyo.lg.jp/) など、不特定多数の人たちを閲覧対象にしたウェブサイトの開発が活発となっていました。

https://stopcovid19.metro.tokyo.lg.jp/

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">東京都新型コロナウイルス感染症対策サイト(stopcovid19)のコアメンバーとして活動しています。<br>主に Vue.js / Nuxt.js 周りの技術支援とエッジな epic の対応、そのほか OSS のナレッジを生かした Issue / PR のトリアージ窓口として、色々サポートしています！<a href="https://t.co/mcnTmY0grp">https://t.co/mcnTmY0grp</a></p>&mdash; potato4d/Takuma HANATANI (@potato4d) <a href="https://twitter.com/potato4d/status/1235873361688846338?ref_src=twsrc%5Etfw">March 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">「東京都 新型コロナウイルス感染症対策サイト」のWebサイトのソースコードは <a href="https://twitter.com/hashtag/GitHub?src=hash&amp;ref_src=twsrc%5Etfw">#GitHub</a> 上でMITライセンスで公開されています。<br>🌐東京都 新型コロナウイルス感染症対策サイト / Tokyo COVID-19 Task Force website<a href="https://t.co/EOOKxq6Yi4">https://t.co/EOOKxq6Yi4</a><a href="https://twitter.com/hashtag/%E3%82%B3%E3%83%AD%E3%83%8A%E5%AF%BE%E7%AD%96%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2?src=hash&amp;ref_src=twsrc%5Etfw">#コロナ対策エンジニア</a> <a href="https://twitter.com/hashtag/COVID19ENGR?src=hash&amp;ref_src=twsrc%5Etfw">#COVID19ENGR</a> <a href="https://twitter.com/hashtag/%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%82%BD%E3%83%BC%E3%82%B9?src=hash&amp;ref_src=twsrc%5Etfw">#オープンソース</a> <a href="https://twitter.com/hashtag/OSS?src=hash&amp;ref_src=twsrc%5Etfw">#OSS</a> <a href="https://t.co/d5N8ucpkaC">pic.twitter.com/d5N8ucpkaC</a></p>&mdash; 職業「戸倉彩」👩‍💻 Aya Tokura (@ayatokura) <a href="https://twitter.com/ayatokura/status/1298096532189667329?ref_src=twsrc%5Etfw">August 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

現在もなお開発は継続されており、技術スタックなどで参考にされている方も多いことでしょう。

実際自ら [STOPCOVID19 現況](https://stopcovid19.vercel.app/) ウェブサイトの製作を通して、オープンデータを使用してみて、色々と感じる部分も多かったように考えています。
