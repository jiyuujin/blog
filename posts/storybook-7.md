---
layout: Article.tsx
publish_date: 2023-04-27
title: 'Storybook v7 に更新する'
description: '先日 Storybook v7 がリリースされたので、そのマイグレーションについてかいつまんで書かせていただいています。'
slug: storybook-7
reaction: 🐡
category: Server
tags:
  - Storybook
---

なにかとおしごとの場面をはじめ、最近 Storybook に触れる機会が多々存在しており、先日リリースされた v7 について書かせていただきました。

## Storybook v7

先日 Storybook v7 が [リリース](https://github.com/storybookjs/storybook/releases/tag/v7.0.0) されました。

- [Storybook 7.0 - March 2023](https://storybook.js.org/releases/7.0)
- [Storybook 7.0 beta](https://storybook.js.org/blog/7-0-beta/)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Today&#39;s the day: <a href="https://twitter.com/hashtag/StorybookDay?src=hash&amp;ref_src=twsrc%5Etfw">#StorybookDay</a> is here! 🎉<br><br>From 10 am PDT, join a line-up of world class front-end devs, community experts and Storybook maintainers. Learn about cutting-edge UI development &amp; explore everything new with Storybook 7.0.<br><br>📅 Get involved ↓<a href="https://t.co/OWgWGQ2VR3">https://t.co/OWgWGQ2VR3</a></p>&mdash; Storybook (@storybookjs) <a href="https://twitter.com/storybookjs/status/1635663216079405056?ref_src=twsrc%5Etfw">March 14, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

これまで Webpack を基調としてビルドしてきた Storybook が、この度 Vite に変更されている点は大変、大きなポイントのひとつとなっています。

手元の Storybook 環境を v7 に更新する場合は、まず `npx storybook@latest upgrade` を実行してください。

```bash
# storybook@latest
npx storybook@latest upgrade
```

yarn をお使いの方は、適宜読み替えてください。

基本的にこれだけで完了させられます。

続いて Storybook v7 の主な特長を下に示します。

- 使用コマンドの変更
- Vite 基調のビルドへ更新
- CSF (CSF3) における型定義改善
- その他
  - [MDX](https://github.com/mdx-js/mdx/) の v2 サポート
  - [Jest](https://jestjs.io/ja/) と [Testing Library](https://testing-library.com/) を利用したインタラクションテストのサポート
  - [Playwright](https://github.com/microsoft/playwright) を利用した Web ブラウザテストのサポート

### 使用コマンドの変更

Local における serve コマンドが `start-storybook` から `storybook dev` へ、また静的な HTML へ吐き出すコマンドが `build-storybook` から `storybook build` へ変更されています。

```json
/* 変更前 */
{
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

```json
/* 変更後 */
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### Vite 基調のビルドへ更新

先に言ったように Vite を基調としてビルドされている点が、大きなポイントのひとつとなっています。

それはすなわち、これまで Storybook 上で Vite を利用してビルドするのに必要だった @storybook/builder-vite を .storybook/main.js の中で明示しなくても良くなっています。

```js
/* 変更前 */
module.exports = {
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
}
```

```js
/* 変更後 */
module.exports = {
  framework: '@storybook/vue3-vite',
}
```

### CSF (CSF3) における型定義改善

まず、ここで CSF とは Component Story Format の略称となり、一般的に `XXX.stories.ts` のようなファイル形式を指しています。

- [Component Story Format 3 is here](https://storybook.js.org/blog/storybook-csf3-is-here/)

Storybook 上で描画される予定の最小単位 (story) と、そのメタデータ (meta) から構成されており、この CSF では、story 及びそのメタデータを ESM を用いて定義することとなります。

default export のモジュールで共通の story 及びそのメタデータを定義するのに対し、named export のモジュールでは対象コンポーネントの story 及びそのメタデータを定義します。

実際 story の型定義で、個別のコンポーネントにおける props 型定義が反映される (generics が使用される) ようなっています。

```ts
export interface ButtonProps {}

/* 変更前 */
import { Story } from '@storybook/react'
const Template: Story = (args, { argTypes }) => ({
  //
})
```

```ts
export interface ButtonProps {}

/* 変更後 */
import { StoryObj } from '@storybook/react'
const Template: StoryObj<typeof ButtonProps> = (args, { argTypes }) => ({
  //
})

import { StoryFn } from '@storybook/react'
const Template: StoryFn<ButtonProps> = (args, { argTypes }) => ({
  //
})
```

なお、Vue でも React 同様に story の型定義が変更されている点には、ひとつ注意しておきたい。

```ts
export interface ButtonProps {}

/* 変更前 */
import { Story } from '@storybook/vue3'
const Template: Story = (args, { argTypes }) => ({
  //
})
```

```ts
export interface ButtonProps {}

/* 変更後 */
import { StoryObj } from '@storybook/vue3'
const Template: StoryObj<typeof ButtonProps> = (args, { argTypes }) => ({
  //
})

import { StoryFn } from '@storybook/vue3'
const Template: StoryFn<ButtonProps> = (args, { argTypes }) => ({
  //
})
```
