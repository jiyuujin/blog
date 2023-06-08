---
layout: Article.tsx
publish_date: 2023-03-16
title: 'おはようエンジニア 金曜日 の取組改善'
description: 'Twitter Spaces を利用した Podcast を開始以来初めて、その取組改善に注力しました。そのお気持ち表明と合わせて、今後目指すべきことを言語化させていただきました。'
slug: restart-ohayo-friday
reaction: 💰
category: Poem
tags:
  - Podcast
  - CMS
---

まず今回、取組改善の記事を書くきっかけとなったのは、下記 2 点あります。

- 内内 (EventIn) の勉強会で進めていた取組を「外出し」して 3 か月が経過している
- 今月 17 日に 1 週間のネタを共有する予定が 16 日に変更された
  - いつもの 1 週間と比べてネタが少ない (かも)

これまでのまとめサイトは下記よりそれぞれご確認いただけます。

- [金曜のまとめ](https://ohayo-friday.nekohack.me/)
- [月曜から木曜のまとめ](https://ohayo.nekohack.me/)

## エンジニア界隈の Podcast 運営にあたって

おはようエンジニアの取組を開始して早 2
年近く経過、これといった工夫も無く走ってきました。実際の数値を見ると 2021 年 05
月 06 日から 2023 年 03 月 15 日までの通算開催回数は 420 回に上ります。

こうした Podcast を始めたのも、2 年前の春に Twitter Spaces が β
公開、そして本リリースされたのが、きっかけのひとつとなります。

β 公開。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">good news: more of you now have the ability to host spaces on both ios and android. excited to see more 🟣 at the top ☝🏽</p>&mdash; Spaces (@TwitterSpaces) <a href="https://twitter.com/TwitterSpaces/status/1377347175143809024?ref_src=twsrc%5Etfw">March 31, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

本リリース。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">starting today, spaces will be available on <a href="https://t.co/RD57W4QZPz">https://t.co/RD57W4QZPz</a> (mobile web, desktop web)<br><br>our focus areas:<br>- infrastructure and listening UI that adapts to your screen size<br>- setting reminders for scheduled spaces <br>- accessibility and transcriptions <a href="https://t.co/Wb0DQktkhD">pic.twitter.com/Wb0DQktkhD</a></p>&mdash; Spaces (@TwitterSpaces) <a href="https://twitter.com/TwitterSpaces/status/1397688581846568961?ref_src=twsrc%5Etfw">May 26, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

また、夜にこうした Podcast を開催することもありました。自ら記事
[IE を供養する](https://blog.nekohack.me/posts/pray-the-internet-explorer-for-memorial)
を執筆したことに伴い、他の開発者を巻き込む形で IE
対応をやめたことで恩恵を受けられる CSS について語らいました。

その際は Zenn の scrap
機能を利用、使えるツールはどんどん使っていく方針の下で進めさせていただきました。

[IE 対応をやめたことで恩恵を受けられる CSS](https://zenn.dev/jiyuujin/scraps/c36542fc7ac185)

そんな中いくつかの課題に直面します。中でも日々雑談する内容は変動し、ネタのある日はそこまで困らない一方、ネタのない
(少ない) 日は逆に困ることも多々ありました。

また、ネタの有無にかかわらず 1 日足りともその内容を記録しなかった日はなく、必ず
GitHub issues (かつては Notion) に記録する習慣を付けました。

技術仕様についてざっと GitHub issues (かつては Notion) を CMS
として、日々雑談した内容を記録していましたが、その知見については過去の記事をご確認いただければ。

- [Notion をひとつのデータベースとして扱う](https://blog.nekohack.me/posts/notion-api-usage-as-a-database)
- [GitHub issues を CMS として扱う](https://blog.nekohack.me/posts/github-issues-usage-as-a-cms)

気になる方は
[jiyuujin/ohayo-developers](https://github.com/jiyuujin/ohayo-developers/issues)
をご確認いただければ。

https://github.com/jiyuujin/ohayo-developers/issues

## 取組改善の狙い

上にも記載した通り、これまでの Podcast
運営で改善しなければいけない点がありました。固定メンバー化なども挙げられますが、ここではネタのない場面の改善に努めます。

それは日々雑談する内容が変動する中で、ネタのない (少ない) 日は Podcast
を運営するにあたって、ほんとうに困ることが多くありました。

そこで、まずは金曜に限って、事前にこのネタについて触れることを明示することとしました。

- 金曜に 1 週間のネタを総浚い共有する
- 月曜から木曜まで、総浚いしたものをピックアップ、可能なら輪読を進める

実際、月曜から木曜までの場は当初より形を変えていません。

しかし、金曜に雑談した内容をより深堀り、輪読させられるようになれば良いものと考えています。

現状、この相乗効果は最大限発揮させられているとの認識はまだない一方、手応えは大変感じておりそう遠くない時期に成果として目に見えるでしょう。

## 最後に

長く継続しようという気持ちは一切、ありません。というと語弊を生む恐れもありますが、結果として長く継続できました、そう言われたらという気持ちの方が強いと考えています。

とはいえ、ゆるりと朝一に Twitter Spaces
の場へ足を運んでいただければ、それだけで満足でございます。
