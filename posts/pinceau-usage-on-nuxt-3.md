---
layout: Article.tsx
publish_date: 2023-12-14
title: 'Vue (Nuxt 3) で Pinceau (CSS-in-JS/TS) を使う'
description: 'Vue Fes 2023 では、CSS を書く方法として CSS-in-JS/TS ツールの Pinceau を取り入れさせていただいたので、その使用感をば。'
slug: pinceau-usage-on-nuxt-3
reaction: 💃
category: Front
tags:
  - Advent-Calendar
  - Pinceau
  - Nuxt
  - Nuxt3
  - VueFes
---

この記事は jiyuujin Advent Calendar 2023 の 14 日目の記事になります。

https://adventar.org/calendars/9670

そもそも Vue で CSS を書く方法を、下に示してみます。

- Scoped
- CSS modules
- Tailwind CSS / UnoCSS

React におけるプロジェクトと違い、あまり CSS in JS/TS のツールは、見受けられませんでした。

しかし、Vue 環境でも CSS in JS/TS を使用可能な [Pinceau](https://www.npmjs.com/package/pinceau) について書かせていただきます。

[Vue Fes Japan Online 2022](https://vuefes.jp/2022) のとあるセッション内で上がった技術ネタより起因しました。このイベントをきっかけに Vue Fes Japan 2023 公式ウェブサイトでの採用を進めました。最近も 1.0 ベータへ更新されています。

https://vuefes.jp/2023

ざっくり Pinceau について、解説すると。

下に示した、ごくシンプルな Vue コンポーネントがあったとします。

CSS を書く方法がいろいろ存在する中、TypeScript で CSS を書けるようになりました。

```vue
<script setup lang="ts">
const pinceauUrl = ref('https://www.npmjs.com/package/pinceau')
</script>

<template>
  <div class="wrapper">
    <a :href="pinceauUrl" target="_blank">
      Pinceau
    </a>
  </div>
</template>

<style lang="ts" scoped>
css({
  '.wrapper': {
    display: 'grid',
    placeItems: 'center',
    '::v-deep(a)': {
      color: '{color.vue.green}',
    },
  },
})
</style>
```

他、ざっくり説明させていただくと、下に示す通り。

- Design System に則って設定できる
- CSS でスクリプト関数を渡せる
- Auto Complete が効く

もちろん、書き味として、型補完も効いてきます。

ちなみに、開発者向けに VS Code をお使いの方には朗報、その拡張機能も利用できます。

https://marketplace.visualstudio.com/items?itemName=yaelguilloux.pinceau-vscode

## Pinceau 環境を構築する

Pinceau パッケージをインストールしましょう。

Pinceau の導入については、[公式ドキュメント](https://pinceau.dev/get-started/installation) と合わせご確認ください。

Vue Fes 2023 ウェブサイトでは、Nuxt 3 の上に構築を目指していましたので、とてもシンプルに構築できます。

```bash
pnpm install -D pinceau
```

https://www.npmjs.com/package/pinceau

正直、この Pinceau を構築する過程で、ひとつハマったポイントがありました。

Nuxt のバージョンとの不一致より伴う、型定義を巡るエラーに出会します。

こういう依存関係は粘り強くエラーと向き合っていくしかありません。

nuxt.config.ts の module に `pinceau/nuxt` を追加してください。

```ts
export default defineNuxtConfig({
  modules: ['pinceau/nuxt'],
})
```

### トークン情報をカスタマイズする

メディアクエリをはじめ、カラーやフォントサイズなどに代表されるデザイントークンを定義してみます。

ルートに tokens.config.ts を作成します。

```ts
import { defineTheme } from 'pinceau'

export default defineTheme({
  //
})
```

メディアクエリをはじめ、カラーやフォントサイズなどに代表されるデザイントークンを定義してみます。

ルートに tokens.config.ts を作成します。

作成した tokens.config.ts をnuxt.config.ts より読み込みます。

```js
export default defineNuxtConfig({
  pinceau: {
    configFileName: 'tokens.config',
  },
})
```

基本的に Pinceau 導入のフェーズは、いたってシンプルとなります。

#### メディアクエリを定義する

メディアクエリを定義したい場合は、下のように記せます。

```ts
import { defineTheme } from 'pinceau'

export default defineTheme({
  media: {
    mobile: '(max-width: 771px)',
    tablet: '(max-width: 981px)',
    desktop: '(max-width: 1920px)',
  },
})
```

実際に Vue コンポーネントでは、下のように使います。

```vue
<style lang="ts" scoped>
css({
  '.container': {
    margin: 0,
    '@tablet': {
      margin: '0 auto',
    },
    '@mobile': {
      margin: '0 auto',
    },
  },
})
</style>
```

#### 独自のカラーを定義する

独自のカラーを定義したい場合は、下のように記せます。

```ts
import { defineTheme } from 'pinceau'

export default defineTheme({
  color: {
    vue: {
      blue: '#35495E',
      green: '#42B983',
    },
  },
})
```

実際に Vue コンポーネントでは、下のように使います。

```vue
<style lang="ts" scoped>
css({
  '.link': {
    fontFamily: 'DIN',
    fontSize: 'calc(18*{fontSize.base})',
    fontWeight: '700',
    color: '{color.vue.green}', // 独自のカラーを定義する
    lineHeight: '1',
    whiteSpace: 'nowrap',
  },
})
</style>
```

#### 独自のフォントサイズを定義する

独自のフォントサイズを定義したい場合は、下のように記せます。

```ts
import { defineTheme } from 'pinceau'

export default defineTheme({
  fontSize: {
    base: '0.0625rem',
  },
})
```

実際に Vue コンポーネントでは、下のように使います。

```vue
<style lang="ts" scoped>
css({
  '.link': {
    fontFamily: 'DIN',
    fontSize: 'calc(18*{fontSize.base})', // 独自のフォントサイズを定義する
    fontWeight: '700',
    color: '{color.vue.green}',
    lineHeight: '1',
    whiteSpace: 'nowrap',
  },
})
</style>
```

## Pinceau 1.0 ベータへ更新する

Vue Fes 2023 ウェブサイトでは、当日直前のバージョン更新を避けるため、この新しい 1.0 ベータへ更新せず、当日を迎えたのでその恩恵は受けていません。

なお、1.0 ベータについては、以下 CHANGELOG をご確認いただきたい。

中でも [1.0-beta.1](https://github.com/Tahul/pinceau/releases/tag/v1.0.0-beta.1) に集中していました。

https://github.com/Tahul/pinceau/releases/tag/v1.0.0-beta.1
