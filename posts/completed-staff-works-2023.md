---
layout: Article.tsx
publish_date: 2023-11-20
title: '2 つのスタッフ業を掛け持つ'
description: '昨年に続いて Vue Fes Japan 2023 Web サイトのリードの傍ら、FlutterKaigi 2023 オーガナイザーのひとりとして、スタッフ業を掛け持ちさせていただきました。'
slug: completed-staff-works-2023
reaction: 🦶
category: Poem
tags:
  - VueFes
  - FlutterKaigi
---

久しぶりにブログを更新します。

無事 Vue Fes Japan 2023 に FlutterKaigi 2023 をやり遂げました。

そもそも、オフライン開催のカンファレンスに参加させていただいたのは、2019 年 (4 年前) の JSConf JP 2019 以来。スタッフお手伝いとしても、フロントエンドカンファレンス関西 2019 以来で、随分と久しい気分になりました。

当時の自身も、本業は Laravel エンジニア然り Scala エンジニアとして、サーバサイドの設計を進めながら時には Vue 2 系に加え少し React (クラスコンポーネント時代) を書いているました。いまでも Web 系のくくりでは、たいへんその時の知見が活かされつつ、加えて Android / iOS 開発を基盤として Flutter の副業にも挑戦するなど、全く違うキャリアを歩むことになります。

## 2 つのカンファレンスのバランスについていま一度再考する

Vue Fes では Web サイトチームのリードとして、FlutterKaigi では中央統括の一部として、これらのスタッフ業を掛け持っておりました。

提案できること、逆輸入できることなど、良い意味で相乗効果を発揮できおすすめです。

しかし今年に限って、そのバランスはというと (?)

深く掘り下げることは致しませんが、特に Vue Fes の Web サイトチームでは様々なことがありました。

ネームカード登録に際し、不具合が発生したこともひとつ。

(お詫びのポスト)

https://x.com/vuefes/status/1709786858639761910?s=20

チームの稼働を考える上で、そもそも自身が巻き取ることが多かったのもひとつ。

結果として、今年 1 年間 FlutterKaigi の Web サイト並びにカンファレンスアプリへのコントリビュートまで手は回らず、来年再び戻りたいという意欲が高くなりました。

### Vue Fes では Web サイト製作を率いる

Vue Fes の Web サイトチームについて、初期ローンチのタイミングでは特にコントリビュートしたことのない方を優先してアサインするなど、積極的に多くの方に参加いただけたことはたいへん自負しております。

改めて、コントリビュートされた皆さまには感謝申し上げます。

https://github.com/vuejs-jp/vuefes-2023/graphs/contributors

実際 Vue Fes では、昨年以上のチャレンジを Web サイトで行うことを目標に動いてきました。

- ばんばん Nuxt 3 を活用する
- CSS を書く手法で CSS in TS ([Pinceau](https://pinceau.dev/)) を取り入れる
- チケット購入管理ツール Pass Market の不足している部分を、技術 (Supabase の [Edge Functions](https://supabase.com/docs/guides/functions) など) で補う

それぞれの掘り下げについては後日書かせていただくとして、普段本業ではなかなか挑戦できないことを Vue Fes の Web サイトで合法的にやってみようではないか。

そもそも、ここでいうネームカード機能とは物理とオンラインの双方で進めており、中でも物理のネームカードを発注する都合上 10 月上旬までの早い段階でご登録いただいた皆さまには、自身の名前とアバター画像が入るようになっています。

ネームカード機能の裏側では、公式 Web サイトで各参加者の情報を登録できるようにして、オフライン会場での名刺交換の一端を担う目的を考えました。

なお、実際のアフターパーティーの場面では、オンラインのネームカードを利用しているケースには、なかなか遭遇せずあまり浸透していないような気がしました。

(オンラインネームカード)

![](https://i.imgur.com/xi4Q8kd.jpg)

実際、ネームカード機能の実装が始まる頃には、他機能 (タイムテーブル、セッション詳細) の実装も始まり、次第に各メンバーの負荷が高くなっていきます。

しかし、その間メンバーの稼働状況を鑑みたところ、彼らへのアサインは難しいもので、やむを得ず自身で巻き取らせていただくことが増えました。

おそらく本業、もしくは家族の都合などでいなくなったのではと考えておりますが、**せめて離脱されるなら一声は欲しいところ** です。

正直、私の見立てでは 8 月中旬 (盆後) には、ネームカードをリリースする方向で考えていたところ、結果的に 9 月に入ってからそれがなされたのはひとつの課題です。

また、参加者が理解しづらい仕様の下、ネームカード作成機能をリリースしたことも、逆に不具合ではと捉えられてしまい、機会損失となっていました。

先の不具合についても、Pass Market の不足している部分を技術で補う話と合わせて、後日掘り下げさせていただきます。

### FlutterKaigi ではスケジュール調整、広報ブランディング戦略をまとめる

今年ならではというものも無くはありませんが、主にスケジュールの調整をざっくり進めながら、それぞれのチームで必要な事柄をリストアップ。

必要に応じて自ら資料たたきを作成して、ブラッシュアップを揉むといった基盤作りに励みました。

そして、公式 medium の投稿数も積極的に増やしました。

https://medium.com/flutterkaigi

こちらを見てもらうと、自身以外の方々に書いてもらっていることがお分かりかと。

また、とりわけ良かったことは、普段の定例 MTG をオンラインで行う合間にオフライン懇親会の機会を設けたことでしょうか。

現在、自身は都内近郊にいる者ではないですが、もとは自ら懇親会をやろうと言い出したのもあって、何かに付けて他の予定と組み合わせることに努めました。

これもありがたいことに、本業の「テレワーク」環境が活きており、それらへの支障をなるべく作らず上手く双方を並列させてきました。

(BOTCHAN)

https://wevnal.co.jp/service/chatbot/

(EventIn)

https://jp.vcube.com/eventdx/eventin

## カンファレンスのスタッフ業は楽しい

基本的にスタッフ業は楽しいです。

とともに (とりわけ当日は) 足への疲労感も半端ありません。

- 10/28 6,867 歩
- 11/10 7,896 歩

10,000 歩を超えているものと想定していましたが、もう少し歩数を稼いでいたのでは、というのも考えました。

(Vue Fes)

![](https://i.imgur.com/LgN8V3u.jpg)

(FlutterKaigi)

![](https://i.imgur.com/1h64Pm6.jpg)

私個人としては終始オンラインに比べると、オフラインで界隈の人たちと非同期でコミュニケーションを進められ、非常に有意義な時間を過ごせたと実感しています。

### 来年の野望

など書いていると、来年もおそらくスタッフとして入らせていただくと考えています。

しかし、リードさせていただくかは不明、今年も他の方へ積極的に権限を移譲したのでそういったことは少なからずやるのでは、などと。

これまで書いてきたように今年 Vue Fes で自ら巻き取らせていただくことが多かったので、いい加減 FlutterKaigi のアプリ (サイト) のコントリビュートに戻れたら来年は満足かな。
