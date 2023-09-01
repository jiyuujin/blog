---
layout: Article.tsx
publish_date: 2022-08-24
title: 'CloudFront における HTTP/3 有効化メモ'
description: 'S3 と CloudFront 上に運用している各種プロフィールサイトで HTTP/3 を有効化したことをきっかけに、そのメモを簡単に記録させていただきます。'
slug: http3-on-cloudfront
reaction: 🍔
category: Server
tags:
  - AWS
  - AWSCloudFront
  - AWSS3
---

2 か月ぶりのブログ更新、おひさしぶりです。

## ウェブサイトのインフラを更新する

各種プロフィールサイトは S3 と CloudFront を利用しながら、静的ウェブサイトとして配信しており、この度 [CloudFront の HTTP/3 対応](https://aws.amazon.com/jp/about-aws/whats-new/2022/08/amazon-cloudfront-supports-http-3-quic/) をきっかけにそれを有効化した。

- [nekohack.me](https://nekohack.me)
- [Yuma Kitamura | nekohack.me](https://yuma-kitamura.nekohack.me)

ここで、ざっくり HTTP/2 と HTTP/3 についての理解を深めてみる。

HTTP/2 はヘッダー圧縮やコンテンツ表示の優先順位付け、サーバーサイドのプッシュ通知に加え HTTP リクエストを最大 6 本まで同時に処理する仕様を変更している。

一方 HTTP/3 は TLS1.3 必須、QUIC 利用で時間の短縮とヘッドオブラインブロッキングの解消を実現している。この QUIC では内部的に TCP ではなく UDP を利用しており、そもそも使用している技術の差の大きいことが分かる。

奇しくも時を同じくして [第 71 回 HTML5 とか勉強会](https://html5j.connpass.com/event/255894/) で HTTP/3 の知見 [HTTP/3 の今と将来](https://docs.google.com/presentation/d/1zguVfx0ApC2IehcSp50-IXquWdekmXDwoJWomql_UOE/edit?usp=sharing) が発表されたようです。

こちらの登壇スライドも遅ればせながらチェックしたいと。

## CloudFront で HTTP/3 を有効化する

CloudFront で「サポートされている HTTP バージョン」のチェックボックスのうち HTTP/3 のチェックボックスを有効にする。

AWS 管理者の立場から見ると、たったこれだけのアクションで HTTP/3 を有効化することができる。

### Chrome で確認する

Chrome では `Network` の `Protocol` で `h3` (HTTP/3) を確認することができれば OK です。

`Network` に `Protocol` が見つからない場合は、各カラムを右クリックして `Protocol` にチェックを付けてください。

![](https://i.imgur.com/qhfutFQ.png)
