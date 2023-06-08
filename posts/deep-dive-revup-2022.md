---
layout: Article.tsx
publish_date: 2022-12-22
title: 'Deep Dive into Rev Up 2022'
description: '今回、初めて Rev Up のウェブサイト製作に参画させていただいた経験と、そのついでに SvelteKit の話題にも触れさせていただきます。'
slug: deep-dive-revup-2022
reaction: 🍜
category: Front
tags:
  - SvelteKit
  - RevUp
  - LINE
  - Advent-Calendar
---

Rev Up 2022

![](https://i.imgur.com/fL8dBHC.jpg)

もっちゃんさんよりお話をいただき、今年の [ウェブサイト](https://revup.jp/)
を製作する運びとなりました。

https://revup.jp/

## キーワードで見る Rev Up 2022

今回のキーワードについて、下記キーワードが挙げられます。

- JavaScript Framework
  - SvelteKit
- TypeScript
- CSS
  - Tailwind CSS
- microCMS
- Netlify

2020/21 両年ともウェブサイトのソースコードは GitHub 上で公開されています。

- [Rev Up 2021](https://github.com/LPF-REVUP/lpf-revup-2021)
- [Rev Up 2020](https://github.com/LPF-REVUP/lpf-revup-2020)

まず両年のウェブサイトで採用されていた Nuxt 2 (Decorator API) や Pug、Vuetify
を踏襲していません。

この技術スタックに不平不満はないものの、一アプリケーションとして望ましくない一面も感じていました。

ざっくりいうと主に設計上の理由で、セッションやスピーカーなどのドメインの情報が切り分けられていません。

コンポーネント設計の再構築を目標としてリファクタリングを進めるか、新しいものとして
0 から製作する両者の工数を天秤にかけた際、今回は後者を選択させていただきました。

- コンポーネント設計の再構築と合わせ、このまま Nuxt 3 に更新する
- 新しいものとして 0 から作成する
  - JavaScript フレームワーク依存無し

後者を選択した場合にこれまで通りの Nuxt
はもちろん、それ以外の選択肢も存在していました。

もっちゃんさんより、採用する技術スタックについて、特に踏襲しなくても良いとのこと。

結果的に、今回は SvelteKit を含む技術スタックへ大幅に変更しています。

https://kit.svelte.jp/

余談で、あえて JavaScript フレームワークのひとつ Svelte と、それを利用した Web
アプリケーションフレームワークを試したかった想いがあります。

製作開始当初 v1 の開発版として開発が進められていた SvelteKit は現在、正式版が
[リリース](https://svelte.dev/blog/announcing-sveltekit-1.0) されています。

https://svelte.dev/blog/announcing-sveltekit-1.0

## 唯一、踏襲したこと

今回の Rev Up 2022 は完全な「リプレース」ではなく、0
から新しいウェブサイトを製作しています。

ですが、全てを 0 から作り直した訳ではなく、一部踏襲しているものがあります。

そのひとつが microCMS の API スキーマとなります。

- (踏襲) API スキーマの定義
- (踏襲では無いものの新たに) フォントやカラーの定義

### API スキーマの定義

Rev Up 2022 ウェブサイトでは主に、以下のデータを管理しています。

- スポンサーを管理する
- スピーカーとセッションを管理する

#### スポンサーを管理する

スポンサー (`Sponsor`) では、それぞれの名前や画像、ランクを管理しました。

画像を直接アップロードできるよう Image を設定します。

![](https://i.imgur.com/sAf0TrU.png)

他、名前やランクを文字列 (`string`)
で入力できるよう、テキストフィールドを設定します。

API スキーマは、以下の通りとなりました。

```js
interface Image {
  url: string
}

interface Sponsor {
  name: string
  link: string
  image: Image
  rank: string
}
```

#### スピーカーとセッションを管理する

スピーカー (`Speaker`) と、セッション (`Session`)
で、各登壇の情報を管理しました。

互いのコンテンツを参照できるよう API スキーマを定義します。

- スピーカーにセッションの `Object` を設定する
- セッションにスピーカーの `Object` を設定する

![](https://i.imgur.com/yFxIV9i.png)

登壇者とその所属組織に関係する画像を Image に置きます。

![](https://i.imgur.com/tHTPpLv.png)

![](https://i.imgur.com/3bgVA6S.png)

他、名前を始め登壇タイトルなどを文字列 (`string`)
で入力できるよう、テキストフィールドを設定します。

API スキーマは、以下の通りとなりました。

```js
export interface Speaker {
  id: string
  firstNameJp: string
  familyNameJp: string
  firstNameEn: string
  familyNameEn: string
  title: string
  affiliation: string
  profile: string
  image: Image
  sessions: Session[]
  twitter: string
  facebook: string
  hideInSpeakerList: boolean
}

interface Area {
  id: string
  name: string
}

interface Tag {
  name: string
}

interface Session {
  id: string
  title: string
  description: string
  area: Area // if you use microCMS team plan
  startsAt: Date | string
  endsAt: Date | string
  applicationPage: string
  speakers: Speaker[]
  tags: Tag[] // if you use microCMS team plan
  applicantsMessage: string
  documentUrl: string
  movieUrl: string
  color: string
  applicantCount: number
}
```

`$lib/variables` より microCMS のエンドポイントとキーを利用します。

なお、データのフェッチには
[Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)
を使用できます。

```js
import { variables } from '$lib/variables'

export const fetchRes = async (url: 'sponsors' | 'speakers' | 'sessions') => {
  const res = await fetch(`${variables.microCmsApiEndpoint}${url}?limit=50`, {
    headers: { 'X-MICROCMS-API-KEY': variables.microCmsApiKey },
  })
  return await res.json()
}
```

あとは、[`load()`](https://kit.svelte.jp/docs/load)
でそれぞれのフェッチ関数を呼び出して、データ取得を目指します。

今回 `+page.ts` をレンダリングする前に、それを取得しました。

```js
import { fetchRes } from '$lib/services/content.service'
import type { Session, Speaker, Sponsor } from '../app'

export async function load() {
  let sponsorRes: Promise<{ totalCount: number, contents: Sponsor[] }>
  let speakerRes: Promise<{ totalCount: number, contents: Speaker[] }>
  let sessionRes: Promise<{ totalCount: number, contents: Session[] }>
  Promise.all([
    (sponsorRes = await fetchRes('sponsors')),
    (speakerRes = await fetchRes('speakers')),
    (sessionRes = await fetchRes('sessions')),
  ])
  return { sponsors: sponsorRes, speakers: speakerRes, sessions: sessionRes }
}
```

SSR
を考慮している場合に、初回アクセス時はサーバで実行され、その後のレンダリングはクライアントで行われます。

ありし日の `getInitialProps`(Next.js) や `asyncData` (Nuxt.js)
をご想像ください。

ここで `context=module` は Svelte 独自のシンタックスとなります。

### フォントやカラーの定義

tailwind.config.cjs でカラーを定義します。

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        "revup-deep-brand": "#025930",
        "revup-medium-brand": "#4AA37B",
        "revup-brand": "#03A678",
        "revup-light-brand": "#D2F4C5",
        "primary-blue": "#0B2237",
        "line-primary-black": "#111111",
        "line-secondary-black": "#1e1e1e",
        "line-black": "#272727",
      },
    },
  },
};
```

Vue Fes
と違い厳密なデザインは決まっていませんが、唯一フォントやカラーコードに限って決まっていました。

それは tailwind.config.cjs の `theme.extend.colors` で定義しています。

## SvelteKit の良さを体験する

今月 14 日に SvelteKit は、正式版が
[リリース](https://svelte.dev/blog/announcing-sveltekit-1.0) されています。

https://svelte.dev/blog/announcing-sveltekit-1.0

正式版へ更新する前に
[マイグレーションガイド](https://github.com/sveltejs/kit/discussions/5774)
を確認しておきましょう。

開発版の最終版 `@sveltejs/kit@1.0.0-next.587`
へ更新した後に、正式版へ更新することを勧めます。

https://github.com/sveltejs/kit/discussions/5774

なお、v1 開発版では多くの変更がありましたが、そのポイントを下に示してみます。

- ビルドツール Vite の利用
- ルーティングの実装

この類の大幅な変更を経て、最終的な仕様が定まっています。

### ビルドツール Vite の利用

アプリの実行は、ビルドツール Vite に依存します。当初 v1
の開発版では、実行のコマンドに `svelte-kit` を使用していましたが `vite`
へ変更されています。

```json
{
  "dev": "vite dev",
  "build": "vite build"
}
```

Rev Up 2022 ウェブサイトでは Tailwind CSS のコンパイルを行っています。

concurrently を利用して npm スクリプトを並列に実行します。

```json
{
  "dev": "concurrently \"npm run tailwind:w\" \"vite dev\"",
  "build": "npm run tailwind:build && vite build"
}
```

アプリのビルド設定を `vite.config.js` に書きます。

```js
import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [sveltekit()],
};
```

### ルーティングの実装

Next.js や Nuxt.js と違って、ルーティングの実装に慣れる必要があります。

まず Next.js のルーティングを例に見てみます。

```
🗂 root
   └ 🗂 src                      : src 配下のアプリケーション
      └ 🗂 pages                 : ルーティングの管理
         └ 🗂 session
            - _id.tsx
         └ 🗂 speaker
            - _id.tsx
         - _document.tsx
         - index.tsx
- 📄 index.html                  : ルートの .html ファイル
- 📄 package.json                : アプリケーションの package
- 📄 tsconfig.json               : アプリケーションの TS config
```

これを踏まえて SvleteKit の新しいルーティングを見てみます。

```
🗂 root
   └ 🗂 src                      : src 配下のアプリケーション
      └ 🗂 lib
      └ 🗂 routes                : ルーティングの管理
         └ 🗂 session/[id]
            - +page.svelte
            - +page.ts
         └ 🗂 speaker/[id]
            - +page.svelte
            - +page.ts
         - +layout.svelte
         - +page.svelte
         - +page.ts
   - 📄 app.html                 : ルートの .html ファイル
- 📄 package.json                : アプリケーションの package
- 📄 tsconfig.json               : アプリケーションの TS config
```

`+page.svelte`
にアプリの各ページを定義しますが、デフォルトで行われるページ最初のリクエストはサーバー起因によるもの
(SSR) で、その後のナビゲーションで行われるリクエストは Web ブラウザ (CSR)
の両方でレンダリングされます。

多くの場合に、ページがレンダリングされる前で何らかのデータを読み込む必要があるため
`+page.ts` に load 関数を定義します。

### LINE front-end framework の利用

今回は LINE Developers 主催の技術カンファレンスにつき、ウェブサイト内で LINE
front-end framework を使用することが必須要件となります。

```
🗂 root
   └ 🗂 src                      : src 配下のアプリケーション
      └ 🗂 lib
      └ 🗂 routes
         - +layout.svelte
         - +page.svelte
         - +page.ts
   - 📄 app.html                 : ルートの .html ファイル
- 📄 package.json                : アプリケーションの package
- 📄 tsconfig.json               : アプリケーションの TS config
```

`+layout.svelte` にアプリのルートを定義しますが、こちらは Next.js の
`_app.tsx`、Nuxt.js の `layouts/default.vue` を指しています。

こうして、ルートの LINE
認証を経ることで、そのセッションはアプリ全体で管理されることとなります。

実際に LINE front-end framework を使用するために、npm プラグインとして
[`@line/liff`](https://www.npmjs.com/package/@line/liff) のお世話になります。

https://www.npmjs.com/package/@line/liff

LIFF ID と呼ばれるキーを、あらかじめ LINE Developers
の管理画面より発行してください。

まずは LIFF インスタンスを初期化します。

```js
import('@line/liff').then((liff: any) => {
  liff
    .init({ liffId: variables.liffId })
    .then(() => {
      //
    })
}
```

続いて SvelteKit のライフサイクルメソッドのひとつ `onMount`
フックを利用して、ページがレンダリングされた後に、その初期化処理が実行されるようにします。

そして、実行が完了して LIFF インスタンスが作成されると、各 LINE
アカウントの情報を取得できるようになります。

```js
liff.getProfile().then((profile: any) => {
  //
})
```

最終的に、以下のソースコードとして完成しました。

```js
import { variables } from '$lib/variables'

let liffObject
let profileName
let profileUrl

async function initialize() {
  import('@line/liff').then((liff: any) => {
    liff
      .init({ liffId: variables.liffId })
      .then(() => {
        liffObject = liff
        liff
          .getProfile()
          .then((profile: any) => {
            profileName = profile.displayName
            profileUrl = profile.pictureUrl
          })
          .catch((err: any) => {
            console.error({ err })
          })
      })
      .catch((err) => {
        console.error({ err })
      })
  })
}

const handleSignIn = () => {
  if (!liffObject.isLoggedIn()) {
    liffObject.login({})
  }
}

onMount(() => {
  initialize().then(async () => {
    //
  })
})
```

なお、LINE front-end framework の詳細な使用方法については、今年の春先に React ×
Vite × Vite ハンズオンの企画に伴い、Zenn book の執筆と Live
講師を担当させていただきました。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

### Netlify へのデプロイ

これまでの 2022/2021 年と同じく、静的サイトホスティングに Netlify
を使用しています。ドメインの向き先について当初、`https://revup.jp/2022`
のようなサブパスへアクセスすることを想定しており、サブパスへアクセスする際は適宜
`paths` と `appDir` を svelte.config.js に設定していただく必要がありました。

```js
/** @type {import('@sveltejs/kit').Config} */
const config = {
  paths: { assets: "", base: "" },
  appDir: "2022",
};
```

実際のところ、これまでとは違って、サブドメインの下で運用することが決定しました。この判断により、そこまでアプリ側に複雑な処理を書く必要が無くなっています。

逆に、お名前や Google domains など、ネームサーバ側で新たに CNAME
を設定していただく必要があります。

## 最後に

ここだけの話、自身のエゴを始め、これまで Vue Fes 2022 や VSCodeCon JP
2021/2022-23 の技術をリードしてきた経験も踏まえ、あえて SvelteKit
を使ってみたかった想いがありました。

いざ SvelteKit
を使ってみて、開発の障壁になりうる存在は少なかったような気がします。

v1
開発版の開発さながらだったことで、大幅な仕様変更も多々ありましたが、とはいえそこまでしんどい印象は多くありませんでした。

また、いまこのタイミングにウェブサイト製作を開始するなら、以前と比べてもはるかに多くの選択肢を持つのではと考えています。

- v13 でオーバースペック気味の Next.js
- v3 に限って言えば、知見の発信が少ない Nuxt.js
- つい先日に v1 リリースを迎えた SvelteKit -> 今回の 2022 で採用
- じわっと存在感が高まりを見せ始めてきている Astro

たかだか、たった 1
年にも満たない期間でしか、見られないウェブサイトですが、コンポーネント設計の重要性に改めて気付かされました。

来年の Rev Up 2023 (仮称)
製作が、引き続き私自身が担当するか不透明となっている一方、この Rev Up 2022
が良い見本となっていれば、大変満足感が得られるようになります。
