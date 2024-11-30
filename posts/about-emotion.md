---
layout: Article.tsx
publish_date: 2023-09-02
title: 'React で Emotion を使う'
description: 'デザインシステムを構築しながら、CSS-in-JS に Emotion を使用します。'
slug: about-emotion
reaction: 🦑
category: Front
tags:
  - React
  - Emotion
---

## CSS-in-JS について

今回、プロジェクト内の勉強会でデザインシステムのワークショップを開催しました。モノレポ環境 (Nx) の下、コンポーネントの汎用化をいかにして進めていくか共有しています。

それにあたって、初学者を対象に CSS-in-JS の基礎について書かせていただいています。

ちなみに、そのワークショップは下記の順に進めていきます。

- Nx の local generator を利用して、実装予定のコンポーネントのベースを生成する
- CSS-in-JS (Emotion) を利用して、コンポーネントを実装する
- Local の web サーバで storybook を起動する
- Pull Request を作成する
- Chromatic の走る様子を確認する
- 運用フローを確認する

## React で、スタイル (CSS) を管理する

React における CSS の管理手法は主に、下記 4 つの方法が列挙されます。

なお、今回は CSS-in-JS に焦点を合わせるため、他の管理手法 (CSS Modules や styled-jsx、 Tailwind CSS) については一切触れません。

- CSS Modules
- styled-jsx
- CSS-in-JS
- Tailwind CSS
- Vanilla Extract

### そもそも CSS-in-JS とは

CSS-in-JS として CSS を管理する方法は、下記 2 点存在します。

- [styled-components](https://styled-components.com/docs)
- [emotion](https://emotion.sh/docs/introduction)

まずは、両者の違いについて npm trends を見てみましょう。

- [`@emotion/react` vs `styled-components`](https://npmtrends.com/@emotion/react-vs-styled-components)
- [`@emotion/react` vs `@emotion/styled` vs `styled-components`](https://npmtrends.com/@emotion/react-vs-@emotion/styled-vs-styled-components)

![](https://i.imgur.com/ppAjkNm.png)

![](https://i.imgur.com/9B67lZv.png)

### エディタで CSS-in-JS を使用する

デフォルト設定のままだと、エディタ (VS Code、など) で CSS-in-JS のコードのハイライトは効きません。そこで、それを効かせるためには、拡張機能のお世話になりましょう。

VS Code で CSS-in-JS のソースコードに対してハイライトを効かせる場合は、そ s の拡張機能 [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components) をインストールしてください。

https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components

[vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components) をインストールすることで、編集者の視認性が格段に向上 (下記参照) します。

![](https://i.imgur.com/ESxIAmv.png)

## 実際に CSS-in-JS の管理ツールを使用する

代表的な管理ツールは主に、下記 2 点あります。

- styled-components を利用する
- emotion を利用する

### styled-components を利用する

React で CSS-in-JS を取り入れるには styled-components パッケージをインストールする必要があります。

TypeScript で書いている際は、型定義ファイルも合わせてインストールしておきましょう。

```bash
# styled-components
npm i styled-components
npm i @types/styled-components -D

# styled-components
yarn add styled-components
yarn add @types/styled-components -D
```

styled-components を利用する際は `styled` props を利用する手立てがあります。

実際にその `styled` props をインポートしてみましょう。

```tsx:Button.styles.tsx
// Button.styles.tsx

import styled from "styled-components";

export const button = styled.button`
  padding: 6px 16px;
  background-color: #295180;
  color: #303030;
  border-radius: 4px;
  border-color: #295180;
  border-style: solid;
  font-weight: 600;
  font-size: 11px;
  line-height: 20px;
`;
```

続いて `styles.button` を利用することで、該当のスタイルへアクセスできるようになります。

```tsx:Button.tsx
// Button.tsx

import * as styles from "./Button.styles";

export function Button({ title }) {
  return (
    <button css={styles.button}>
      {title}
    </button>
  );
}
```

すると、実際に styled-component の `styled` props を利用して書いたスタイルが、コンポーネント上に反映されることとなります。

また styled-components では `css` props を利用する手立てもあります。

実際にその `css` props をインポートしてみましょう。

```tsx:Button.styles.tsx
// Button.styles.tsx

import { css } from "styled-components";

export const button = css`
  padding: 6px 16px;
  background-color: #295180;
  color: #303030;
  border-radius: 4px;
  border-color: #295180;
  border-style: solid;
  font-weight: 600;
  font-size: 11px;
  line-height: 20px;
`;
```

こうして styled-components で書いたスタイルが、コンポーネント上に反映されることとなります。

### emotion を利用する

React で Emotion を使用するには emotion/react パッケージ、または emotion/styled パッケージをインストールする必要があります。

```bash
# @emotion/react / @emotion/styled
npm i @emotion/react
npm i @emotion/styled

# @emotion/react / @emotion/styled
yarn add @emotion/react
yarn add @emotion/styled
```

それぞれ `css` props を使う emotion/react と、先の styled-components ライクに書ける emotion/styled という特長があります。

- emotion/react
- emotion/styled

今回 Emotion を使用するにあたって、前者 emotion/react を利用します。

emotion/react のメリットについては、こちらの [記事](https://techlife.cookpad.com/entry/2021/03/15/090000) を確認いただくのが分かり易いと考えています。

[レシピサービスのフロントエンドに CSS in JS を採用した話](https://techlife.cookpad.com/entry/2021/03/15/090000)

記事中このあたりで、私も多々同意しています。

- それぞれのスタイル定義をカプセル化できること
- CSS Modules や styled-jsx と比較した際の静的解析の導入しやすさ
- styled-components と比較した際の定義されたスタイルコンポーネント名の把握しにくさ

実際にその `css` props をインポートしてみましょう。

```tsx:Button.styles.tsx
// Button.styles.tsx

import { css } from "@emotion/react";

export const button = css`
  padding: 6px 16px;
  background-color: #295180;
  color: #303030;
  border-radius: 4px;
  border-color: #295180;
  border-style: solid;
  font-weight: 600;
  font-size: 11px;
  line-height: 20px;
`;
```

続いて `styles.button` を利用することで、該当のスタイルへアクセスできるようになります。

```tsx:Button.tsx
// Button.tsx

import * as styles from "./Button.styles";

export function Button({ title }) {
  return (
    <button css={styles.button}>
      {title}
    </button>
  );
}
```

こうして Emotion で書いたスタイルが、コンポーネント上に反映されることとなります。

なお、フレームワークに依存せず、最もシンプルに Emotion を使用する際は emotion/css パッケージをインストールする必要があります。

```bash
# @emotion/css
npm i @emotion/css

# @emotion/css
yarn add @emotion/css
```

以後 emotion/css でも emotion/react と同じように書けます。
