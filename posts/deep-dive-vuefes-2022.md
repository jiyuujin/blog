---
layout: Article.tsx
publish_date: 2022-12-16
title: 'Deep Dive into Vue Fes 2022'
description: 'Vue Fes 2022 ウェブサイトのリードを担当させていただいた経験と、そのついでに Nuxt 3 の話題も触れさせていただきます。'
slug: deep-dive-vuefes-2022
reaction: 🌊
category: Front
tags:
  - Vue
  - Nuxt
  - NuxtBridge
  - VueFes
  - Advent-Calendar
---

Vue Fes Japan Online 2022

![](https://i.imgur.com/FRSqFt2.png)

https://vuefes.jp/2022

今回私自身は、[公式ウェブサイト](https://vuefes.jp/2022) の初期ローンチを始め、技術のリードをメインに取り組ませていただきました。

結果的に初期ローンチで緻密な設計を行え、以後度重なる機能追加を経るも全体の体裁は整えられたものと考えています。

ちなみに、今回携わったチーム全体の [面々](https://vuefes.jp/2022/#team) を確認できます。

![](https://i.imgur.com/KONfZLt.jpg)

先日の kazu_pon さんが書かれたブログ記事にも、同じ画像が挿入されています。

https://note.com/kazu_pon/n/nc9926a474c03

## 数字で見る Vue Fes 2022

リリース回数は 28 回、2 月に製作を開始した後、めでたく初期ローンチを 4 月 11 日に迎え 745 回のコミットを経ました。その内、前半の一部については Vue.js 日本ユーザーグループの公式 Twitter アカウントや Slack で公表させていただいております。

具体的には、下記 [CHANGELOG](https://github.com/vuejs-jp/vuefes-2022/blob/main/CHANGELOG.md) をご確認いただければ幸いです。

- [CHANGELOG](https://github.com/vuejs-jp/vuefes-2022/blob/main/CHANGELOG.md)
- [`Release`](https://github.com/vuejs-jp/vuefes-2022/pulls?q=is%3Apr+is%3Aclosed+label%3ARelease) tags

初期ローンチを果たした 4 月 11 日から 11 月 11 日まで、7 か月間のデータを計測してみました。

ページビューは累計 20,000 を超えました。

- ユーザー 14,000+ 名
- セッション 24,000+ 件

閲覧者の利用 OS は、以下の通りとなります。

- macOS 36%
- iOS 30%
- Windows 21%
- Android 9%
- Others (Linux) 4%

Web 開発者として気になるのは、閲覧者の Web ブラウザの比率でしょうか。

- Chrome 64%
- Safari (in-app 含む) 30%
- Edge 3%
- Firefox 2%
- Others (Android Webview, etc) 1%

これらの数字を振り返ってみるだけでも大変勉強になりますが、この Advent Calendar では実際どうやって Vue Fes 2022 のウェブサイトを運営してきたのか書かせていただきます。

## キーワードで見る Vue Fes 2022

今回のキーワードについて、下記キーワードが挙げられます。

- Nuxt 3 Bridge (Vue 3)
- Tailwind CSS
- GSAP animation
- TypeScript
- Composition API
- `<script setup>` syntax
- Newt
- Netlify

捕捉事項は 2 点あります。ひとつは GSAP について Vue Fes 2019 の [ウェブサイト](https://vuefes.jp/2019) より基本的なアニメーションロジックを引き継いでいます。

使用の前提として、クライアントサイドでアニメーションを動作させるのを考慮する必要があります。

```html
<client-only>
  <!-- GSAP アニメーション -->
</client-only>
```

大きく 6 つの形状に分けて、それぞれの形状から構成されるコンポーネントの下でアニメーションのロジックを書いています。

まずは、円形から構成されるコンポーネントのアニメーションを見ていきます。

| shape                                | implementation                                                                                                                |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| ![](https://i.imgur.com/STiWRwp.png) | [`/components/shapes/HeadCircle.vue`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/components/shapes/HeadCircle.vue) |

続いて三角形から構成されるコンポーネントのアニメーションから、三角形の個数によりそのロジックを分類していきます。

1 つの三角形から構成されるコンポーネントのアニメーションについて。

ここでは `Triangle` と命名しています。

| shape                                | implementation                                                                                                                    |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://i.imgur.com/G7nLPns.png) | [`/components/shapes/HeadTriangle.vue`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/components/shapes/HeadTriangle.vue) |

2 つの三角形から構成されるコンポーネントのアニメーションについて。

ここでは `Slash` と命名しています。

| shape                                | implementation                                                                                                              |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| ![](https://i.imgur.com/HSre1pA.png) | [`/components/shapes/HeadSlash.vue`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/components/shapes/HeadSlash.vue) |

4 つの三角形から構成されるコンポーネントのアニメーションについて。

ここでは `Cross` と命名しています。

| shape                                | implementation                                                                                                              |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| ![](https://i.imgur.com/n2UCx8Q.png) | [`/components/shapes/HeadCross.vue`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/components/shapes/HeadCross.vue) |

三角形より話題は変わって、四角形 (長方形) から構成されるコンポーネントのアニメーションから。

ここでは `Horizontal` と命名しています。

| shape                                | implementation                                                                                                                        |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| ![](https://i.imgur.com/WxHSUBo.png) | [`/components/shapes/HeadHorizontal.vue`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/components/shapes/HeadHorizontal.vue) |

ここまで、それぞれの形状における画像生成、点移動、回転を実現しています。

また、最後の形状として静的画像 (`***.jpg`) のアニメーションも見ていきます。

ここでは `Photo` と命名しています。

[`/components/shapes/HeadPhoto.vue`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/components/shapes/HeadPhoto.vue)

こうして得られた各形状について、詳細なアニメーションロジックを `useAnimationParts()` フックへ書いていきます。

それぞれの図形を生成する際に、図形の切り替えと比べて `duration` を多めにとってアニメーションを実現させるようにします。

```js
const PARTS_FADE_TIME = 0.2

// 図形の切り替え
gsap.to(refs, {
  attr: { ...attr },
  ease: Power2.easeOut,
  duration: PARTS_FADE_TIME,
})
```

```js
const PARTS_CREATE_TIME = 0.6

// 図形の生成
gsap.to(refs, {
  attr: { ...attr },
  ease: Power2.easeOut,
  duration: PARTS_CREATE_TIME,
})
```

そして Vue 公式の提供するライフサイクルメソッド `onMounted()` や `onBeforeUnmount()` を利用することで、アニメーションを制御させています。

```js
export default {
  setup(props, context: SetupContext) {
    const { createAnimation, fadeAnimation, transformPosition } = useAnimationParts()

    const KEY_FRAME = [0, 60]
    const transform = transformPosition(props)

    const createAnimations = () => {
      setTimeout(() => {
        createAnimation(context.refs.shape, { r: KEY_FRAME[1] })
      }, 0)
    }

    const fadeAnimations = () => {
      fadeAnimation(context.refs.shape, { r: KEY_FRAME[0] })
    }

    onMounted(() => {
      createAnimations()
    })

    onBeforeUnmount(() => {
      fadeAnimations()
    })

    return { transform }
  },
}
```

それぞれのフックの詳細については、GitHub をご確認いただくとして。

- [`/composables/useAnimation.ts`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/composables/useAnimation.ts)
- [`/composables/useAnimationParts.ts`](https://github.com/vuejs-jp/vuefes-2022/blob/main/app/composables/useAnimationParts.ts)

Vue 3 では、下に示すようにアニメーションロジックをカスタムフック化できます。

こうしたロジックをコンポーネントの責務より外して管理させることができます。

<video controls playsinline width="100%" autoplay loop muted="true" type="video/mp4" src="https://i.imgur.com/SxgEI3W.mp4">
  Sorry, your browser doesn't support embedded videos.
</video>

他方、Headless CMS のひとつとして今年の 4 月に正式ローンチしたばかりの [Newt](https://www.newt.so/) を使わせていただいています。

こちらは Newt 側で作成したスペースの UID と、CDN API のトークンを読み込む必要があります。

```js
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  publicRuntimeConfig: {
    newtCdnToken: process.env.NUXT_NEWT_CDN_TOKEN,
    newtSpaceUid: process.env.NUXT_NEWT_SPACE_UID,
  },
})
```

その上で、[`newt-client-js`](https://www.npmjs.com/package/newt-client-js) の `createClient` を利用します。

[`useRuntimeConfig`](https://nuxt.com/docs/guide/going-further/runtime-config) は `#app` よりアクセスできます。

```js
import { useRuntimeConfig } from '#app'
import { createClient } from 'newt-client-js'

export const createNewtClient = () => {
  const $config = useRuntimeConfig()
  return createClient({
    spaceUid: $config.spaceUid,
    token: $config.accessToken,
    apiType: 'cdn',
  })
}
```

作成済みインスタンスから `client.getContents<T>({ appUid, query })` の API を利用して、指定のクエリに所属するデータへアクセスできます。

```js
const fetchContent = (query?: Query) =>
  createNewtClient().getContents <
  T >
  { appUid, ...options, query }.then((contents) => {
    return contents.items
  })
```

ここまで来ると、あとはフロントエンドの描画になります。

### フォントやカラーの定義

`tailwind.config.js` でカラーを定義します。

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'vue-blue': '#35495E',
        'vue-green': '#42b893',
        'typescript-blue': '#3178C6',
        asagi: '#33A6B8',
        sangosyu: '#F17C67',
        tohoh: '#FFC408',
        hiwamoegi: '#90B44B',
        tsuchi: '#E5E5E5',
        sponsor: '#F5F6F7',
      },
    },
  },
}
```

一番の花形 TOP 画像のアニメーションでも、その恩恵を利用しています。

<video controls playsinline width="100%" autoplay loop muted="true" type="video/mp4" src="https://i.imgur.com/Cc8JbTG.mp4">
  Sorry, your browser doesn't support embedded videos.
</video>

同じくそこで使用する色を定義できます。

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'anime-typescript-blue': '#4374AA',
        'anime-asagi': '#4D9EAA',
        'anime-vue-green': '#5AB088',
        'anime-hiwamoegi': '#93AF5E',
        'anime-sangosyou': '#D47373',
        'anime-tohoh': '#E7C350',
        'timetable-timeslot': 'rgba(52, 73, 94, 0.7);',
        'track-a': '#90B44B',
        'track-b': '#F17C67',
        'track-c': '#3178C6',
      },
    },
  },
}
```

先に述べた GSAP のアニメーションも、この `tailwind.config.js` で定義した色を使用しています。

## Nuxt 3 の良さを体験する

Nuxt Bridge では Vue 2 系を使用しながら Nuxt 3 で搭載の Nitro も使用できます。

Vue Fes 2022 ウェブサイトを製作した当時は SG 未対応だったこともあり Nuxt Bridge を採用しています。

Composition 関数を管理するための `composables` が追加され、コンポーネント設計の新しい考え方も生まれています。

### Nuxt 3 に更新する

先月 16 日に Nuxt 3 が [リリース](https://v3.nuxtjs.org/community/roadmap/) されました。

https://v3.nuxtjs.org/community/roadmap/

Vue Fes 2022 ウェブサイトの Nuxt を 3 へ上げた際、いくつか [対応](https://github.com/vuejs-jp/vuefes-2022/pull/326) を要します。

https://github.com/vuejs-jp/vuefes-2022/pull/326

実際のところ、大変な労力がかかるので、その辺りは覚悟しておきましょう。

大きな変更でいうと、下に示したことが挙げられます。

- 静的ファイル (群) を `static` -> `public` へ変更する
- Dynamic Routes で使用の予定されているルート名を変更する
- 一部 Hooks で `useNuxt2Meta` -> `useHead` へ変更する

また、下に示した `slot` の表記を変更する必要があります。

```vue:TicketPageSection.vue
<template>
  <template slot="title">{{ faq.question }}</template>
</template>
```

次のように `#title` と記載してあげます。

```vue:TicketPageSection.vue
<template>
  <template #title>{{ faq.question }}</template>
</template>
```

あと、思わぬ箇所でハマった点が、いくつか存在しました。

それについても簡単に触れさせていただきます。

#### ソースディレクトリの扱い

ソースディレクトリ (`srcDir`) を設定しない場合は app.vue をルートに置く必要があります。

```
🗂 root
   └ 🗂 assets                   : 画像 (群)
   └ 🗂 components               : コンポーネント
   └ 🗂 composables              : Composable 関数
   └ 🗂 pages                    : ページ
   └ 🗂 plugins                  : プラグイン類
   └ 🗂 public                   : 静的の画像 (群)
   └ 🗂 server                   : サーバ・ミドルウェア
- 📄 app.vue                     : ルートの .vue ファイル
- 📄 package.json                : アプリケーションの package
- 📄 tsconfig.json               : アプリケーションの TS config
```

ソースディレクトリ (`srcDir`) を設定する場合は app.vue をその配下に置きます。

app.vue を誤ってルートに置いてしまった場合は正しくレンダリングされません。

```
🗂 root
   └ 🗂 app                      : srcDir 配下のアプリケーション
      └ 🗂 assets                : 画像 (群)
      └ 🗂 components            : コンポーネント
      └ 🗂 composables           : Composable 関数
      └ 🗂 pages                 : ページ
      └ 🗂 plugins               : プラグイン類
      └ 🗂 public                : 静的の画像 (群)
      └ 🗂 server                : サーバ・ミドルウェア
   - 📄 app.vue                  : ルートの .vue ファイル <- ここの置き場所に注意する
- 📄 package.json                : アプリケーションの package
- 📄 tsconfig.json               : アプリケーションの TS config
```

#### SVG アイコンの扱い

Vue Fes 2022 ウェブサイトでは SVG アイコンの扱いを変更する必要がありました。

これまで [`@nuxtjs/svg`](https://github.com/nuxt-community/svg-module) を利用していました。

```vue:NavPageSection.vue
<template>
  <img
    class="mr-[2.6vw] w-[19.48vw] h-[3.51vw] lg:mr-5 lg:w-50 lg:h-9"
    :src="`/icon/vuefes_logo.svg`"
    :alt="conferenceTitle"
  >
</template>
```

もともと SVG アイコンを Vue コンポーネントとして扱っていない辺り、設計上望ましくありません。

Nuxt 3 へ更新する際、代わりに [`vite-svg-loader`](https://github.com/jpkleemans/vite-svg-loader) を利用することとしました。

```vue:NavPageSection.vue
<script lang="ts" setup>
import VuefesLogo from '~/assets/icon/vuefes_logo.svg'
</script>

<template>
  <VuefesLogo class="mr-[2.6vw] w-[39.48vw] h-[3.51vw] lg:mr-5 lg:w-50 lg:h-9" />
</template>
```

## これまでの Vue Fes をふりかえる

これまでのウェブサイトで採用された技術スタックを下記に示した。

[Vue Fes 2018](https://vuefes.jp/2018)

![](https://i.imgur.com/gID4eSC.png)

[Vue Fes 2019](https://vuefes.jp/2019)

![](https://i.imgur.com/Icux8cC.png)

[Vue Fes 2020](https://vuefes.jp/2020)

![](https://i.imgur.com/NFWlai6.png)

なお、これらを製作した当時に、自身はコアスタッフとして参加していません。

今年のウェブサイト製作にあたって、遅ればせながら各々のリポジトリをチェックさせていただきました。

ざっくり Nuxt 1 をベースに JavaScript で書かれた [2018](https://vuefes.jp/2018) など、基本的に Nuxt をメインの技術スタックとして実装されていることが分かります。

| #                              | Framework                                                              | Language   |
| :----------------------------- | :--------------------------------------------------------------------- | :--------- |
| [2018](https://vuefes.jp/2018) | Nuxt 1 -> 2                                                            | JavaScript |
| [2019](https://vuefes.jp/2019) | Nuxt 2<br />Decorator API                                              | TypeScript |
| [2020](https://vuefes.jp/2020) | Vue CLI 4                                                              | TypeScript |
| 2021                           | -                                                                      | -          |
| [2022](https://vuefes.jp/2022) | Nuxt 3 Bridge (-> 3)<br />Composition API<br />`<script setup>` syntax | TypeScript |

台風による中止という前代未聞の経験から 1 年も経たずして [2020](https://vuefes.jp/2020) の製作を進めていたとは、思いもよりませんでした。

[2022](https://vuefes.jp/2022) のウェブサイトではこれまでの経験を踏まえ、大変メッセージ性の強いウェブサイトになりました。トップ画の SVG アニメーションを取り入れる格好で、それに纏わるロジックを [2019](https://vuefes.jp/2019) より移植しています。

利用できるものは極力利用させていただく、という方針の下で段階を踏みながら一般公開させました。

## 最後に

今回、初めて Vue Fes コアスタッフのひとりとして参画させていただきました。その中でウェブサイトのリードを担当させていただき、全体としてほんとうに貴重な経験をさせていただいた思いを抱いています。

知見発信の促進や、地方の Vue.js コミュニティの再興など、この 3 年余りの期間で失ってしまった文化を取り戻さなければいけないという使命も感じたりしています。

来たる Vue Fes 2023 (仮称) でも引き続きコアスタッフのひとりとして、微力ながらお手伝いさせていただければ (余程の差し込み等無ければ) と前向きに考えています。
