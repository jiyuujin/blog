---
layout: Article.tsx
publish_date: 2023-05-10
title: 'LIFF v2.22.0 に更新する'
description: '先日 LIFF v2.22.0 がリリースされたので、その詳細 (プラガブル SDK) についてかいつまんで書かせていただいています。'
slug: liff-2-22
reaction: 🐡
category: Server
tags:
  - React
  - TypeScript
  - LIFF
---

来週 17 日に LINE Developers 主催の下、大好評企画 (?) 第 2 弾 React + LIFF ハンズオンを開催させていただきます。

https://linedevelopercommunity.connpass.com/event/282093/

昨年の React + LIFF ハンズオン同様、初級者を対象としています。

https://blog.nekohack.me/posts/answer-to-learn-react-with-line

しかしながら、React におけるカスタムフック化の効果として、プロダクト全体の設計に対し好影響となることをお伝えしたいと言う考えがあります。

したがって、初級者のみならず中級者以上に対しても、ご一読いただければ幸いです。

## LIFF v2.22.0

今日は、先日リリースされた LIFF v2.22.0 のプラガブル SDK について書かせていただきます。

3 月末 LIFF v2.22.0 が [リリース](https://developers.line.biz/ja/news/2023/03/29/release-liff-2-22-0/) されました。

- [プラガブル SDK](https://developers.line.biz/ja/docs/liff/pluggable-sdk/) (Pluggable SDK)
- [LIFF v2.22.0 をリリースしました](https://developers.line.biz/ja/news/2023/03/29/release-liff-2-22-0/)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">LIFF (LINE Front-end Framework) v2.22.0をリリースしました。<br>LIFF v2.22.0では、LIFF SDKのファイルサイズを最大約34%削減できるプラガブルSDK機能を追加しました。 <a href="https://twitter.com/hashtag/LINE_API?src=hash&amp;ref_src=twsrc%5Etfw">#LINE_API</a> <a href="https://twitter.com/hashtag/LIFF?src=hash&amp;ref_src=twsrc%5Etfw">#LIFF</a> <a href="https://twitter.com/hashtag/LINE%E3%83%9F%E3%83%8B%E3%82%A2%E3%83%97%E3%83%AA?src=hash&amp;ref_src=twsrc%5Etfw">#LINEミニアプリ</a><br>詳しくはこちら：<a href="https://t.co/ce8gYNrEuI">https://t.co/ce8gYNrEuI</a></p>&mdash; LINE Developers (@LINE_DEV) <a href="https://twitter.com/LINE_DEV/status/1640994234697412610?ref_src=twsrc%5Etfw">March 29, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

手元の環境を v2.22.0 に更新する場合は、まず `npm i @line/liff@2.22.0` を実行してください。

```bash
# npm
npm i @line/liff@2.22.0

# yarn
yarn add @line/liff@2.22.0
```

基本的にこれだけで完了させられます。

続いて LIFF 2.22 の主な特長は、LIFF SDK のファイルサイズを最大約 34％ 削減できるプラガブル SDK 機能となります。

くだけて言うと、使いたい LIFF API に限りインポートさせられるようなりました。

LIFF オブジェクトを初期化する際、必要な API を `@line/liff/core` からインポートします。

```ts
import liff from '@line/liff/core'
```

useLine.tsx の LIFF SDK を読み込む箇所を修正します。

```ts
import liff from '@line/liff'

export const useLine = () => {
  useEffect(() => {
    if (status === 'inited') return

    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) setStatus('inited')
      })
      .catch((err: any) => {
        console.error({ err })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
```

`@line/liff` をインポートする代わりに `@line/liff/core` をインポートします。

```ts
// 代わりに @line/liff/core をインポートする
import liff from '@line/liff/core'

export const useLine = () => {
  useEffect(() => {
    if (status === 'inited') return

    liff
      .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
      .then(() => {
        setLiffObject(liff)
        if (liff.isLoggedIn()) setStatus('inited')
      })
      .catch((err: any) => {
        console.error({ err })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
```

LIFF オブジェクトが初期化された際に `liff.use()` を利用します。

```ts
import liff from '@line/liff/core'

// LIFF の API を個別にインポートする
import GetOS from '@line/liff/get-os'
import GetLanguage from '@line/liff/get-language'

// `liff.use()` を利用する
liff.use(new GetOS())
liff.use(new GetLanguage())
```

なお、これまでの LIFF API も引き続き利用できます。

アプリのバンドルサイズを低減させるなど、目に見える形の利益がありますので、こうしたプラガブル SDK を利用するか検討いただければ幸いです。
