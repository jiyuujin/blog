---
layout: Article.tsx
publish_date: 2023-09-02
title: 'Mastodon を GCP (VM) で動かす'
description: '喫緊 Twitter の不透明感が増したことに伴い、Mastodon の導入方法について簡単に書かせていただきました。'
slug: mastodon-gcp
reaction: 🤖
category: Server
tags:
  - Mastodon
  - GCP
---

昨年暮れより Twitter の不透明感が強まっています。

ちなみに、そう感じているのは、私自身に限ったものでも無いとのこと。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">混乱続くTwitterからの移行先、Mastodon・Discord・mixiを10倍上回った“ホントの移行先”は？【ナイル調べ】<a href="https://t.co/AcOyX6UxFl">https://t.co/AcOyX6UxFl</a><br>Twitterから他SNSへの移行を検討している人は約3割。最多の理由は「有料化の可能性」。<a href="https://twitter.com/hashtag/SNS?src=hash&amp;ref_src=twsrc%5Etfw">#SNS</a> <a href="https://twitter.com/hashtag/Mastodon?src=hash&amp;ref_src=twsrc%5Etfw">#Mastodon</a></p>&mdash; Web担当者Forum編集部【公式】 (@webtanforum) <a href="https://twitter.com/webtanforum/status/1633241557716590595?ref_src=twsrc%5Etfw">March 7, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

個人的には、あまり Twitter の後継というより、複数 SNS
を使いこなしていく時代に入ったものと考えています。

それはさておき、この度 Mastodon 環境を構築してみました。

普段 AWS をより好みしている私ですが、今回あえて GCP を選択します。

- GCP (VM)
- PostgreSQL
- Rails 3.0.4
- Node.js v16.x

## GCP を利用する

VM インスタンスのスペックは下に示した通りとなります。

- オレゴン (us-west1) リージョン
- e2-micro インスタンス
- ディスク OS (30GB)
- Ubuntu 20.04 LTS Minimal

今回かなり VM スペックを抑えましたが、Rails の setup
に大幅な時間がかかってしまい、もう少しスペックを増やしても良かったのでは、とも考えています。

e2-micro インスタンスには、メモリ 1GB しか持っていないため、事前に SWAP
メモリを作成しました。

### ハマったポイント

デフォルトで mysql が入ってしまいます。

今回は PostgreSQL を使用するので、その mysql は削除しておきましょう。

```bash
sudo apt-get remove mysql* && sudo apt-get install -y mysql-server libmysqlclient-dev
```

### 構築したサービスの Mastodon 登録

最後に、購入済みのドメインを充てるため、最低限 SSL を設定しておきましょう。

今回 SSL に Let's Encrypt を利用します。

```bash
certbot certonly --standalone -d <DOMAIN_NAME>
```

疎通を確認できたら、これまで構築したサービスを mastodon へ登録します。

```bash
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming
```

## 最後に

良いインフラの学習となるのは間違いありません。是非とも機会があれば GCP (に限らず
AWS など) で VM インスタンスを作成してみてはいかがでしょう。
