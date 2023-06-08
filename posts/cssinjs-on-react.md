---
layout: Article.tsx
publish_date: 2022-10-26
title: 'React で CSS-in-JS を書く - Emotion を利用する'
description: 'プロジェクト内の勉強会でデザインシステムのワークショップ開催にあたって、初学者を対象に CSS-in-JS の基礎について書かせていただいています。'
slug: cssinjs-on-react
reaction: 🍶
category: Front
tags:
  - React
  - CSS-in-JS
  - Styled-Components
  - Emotion
---

# CSS-in-JS

## はじめに

先日、プロジェクト内の勉強会でデザインシステムのワークショップを開催しました。モノレポ環境
(Nx) の下、コンポーネントの汎用化をいかにして進めていくか共有しています。

それにあたって、初学者を対象に CSS-in-JS の基礎について書かせていただきました。

ちなみに、そのワークショップは下記の順に進めていきます。

- Nx の local generator を利用して、実装予定のコンポーネントのベースを生成する
- CSS-in-JS (Emotion) を利用して、コンポーネントを実装する
- Local の web サーバで storybook を起動する
- Pull Request を作成する
- Chromatic の走る様子を確認する
- 運用フローを確認する

## React で CSS を管理する

React における CSS の管理手法は主に、下記 4 つの方法が列挙されます。

なお、今回は CSS-in-JS に焦点を合わせるため、他の管理手法 (CSS Modules や
styled-jsx、 Tailwind CSS) については一切触れません。

- [CSS Modules](https://github.com/css-modules/css-modules)
- [styled-jsx](https://www.npmjs.com/package/styled-jsx)
- [CSS-in-JS](https://2021.stateofcss.com/ja-JP/technologies/css-in-js/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [vanilla-extract](https://vanilla-extract.style/)

### そもそも CSS-in-JS とは

CSS-in-JS として CSS を管理する方法は、下記 2 点存在します。

- [styled-components](https://styled-components.com/docs)
- [emotion](https://emotion.sh/docs/introduction)
- [linaria](https://linaria.dev/)

まずは、両者の違いについて npm trends を見てみましょう。

[`@emotion/react` vs `@emotion/styled` vs `@linaria/core` vs `styled-components`](https://npmtrends.com/@emotion/react-vs-@emotion/styled-vs-@linaria/core-vs-styled-components)

![](https://i.imgur.com/cWqxdWx.png)

### エディタで CSS-in-JS を使用する

デフォルト設定のままだと、エディタ (VS Code、など) で CSS-in-JS
のコードのハイライトは効きません。そこで、それを効かせるためには、拡張機能のお世話になりましょう。

VS Code で CSS-in-JS のソースコードに対してハイライトを効かせる場合は、そ s
の拡張機能
[vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
をインストールしてください。

https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components

[vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
をインストールすることで、編集者の視認性が格段に向上 (下記参照) します。

![](https://i.imgur.com/ESxIAmv.png)

## 実際に CSS-in-JS の管理ツールを使用する

代表的な管理ツールは、下に示すように 3 点あります。

- styled-components を利用する
- emotion を利用する
- linaria を利用する

このうち styled-components や emotion
の使用方法について、触れさせていただきます。

数ある観点のうち、ビルド後のバンドルサイズは、注目したい観点のひとつとして存在しています。実際
emotion を利用する根拠のひとつに、しばしばそれが挙がります。

また、最近ホットな話題としてしばしば名の上がる linaria と、それ以外
(styled-components と emotion) に分類できます。

linaria は、ゼロランタイムな CSS-in-JS
の管理ツールとなります。動的なスタイルを多用する場合は、ビルドしたタイミングでそれに伴うカスタムのプロパティが増え、結果として
HTML ファイルの肥大化に繋がってしまいます。

今回は、それぞれの管理ツールの大枠を理解することに留めるとともに、実際にそれらを比較・判断する部分まで言及しないことを改めて伝えておきます。

### styled-components を利用する

React で CSS-in-JS を取り入れるには styled-components
パッケージをインストールする必要があります。

TypeScript
で書いている際は、型定義ファイルも合わせてインストールしておきましょう。

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

とあるボタンのスタイルについて `styled` props を使用して書きます。

```js:Button.styles.tsx
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

続いて `styles.button`
を利用することで、該当のスタイルへアクセスできるようになります。

```js:Button.tsx
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

すると、実際に styled-component の `styled` props
を利用して書いたスタイルが、コンポーネント上に反映されることとなります。

また styled-components では `css` props を利用する手立てもあります。

実際にその `css` props をインポートしてみましょう。

```js:Button.styles.tsx
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

こうして styled-components
で書いたスタイルが、コンポーネント上に反映されることとなります。

### emotion を利用する

Emotion を利用するため、インストールを要するパッケージは、主要なところで下記 3
点示すように、いろいろ存在します。

- emotion/css
- emotion/react
- others
  - emotion/styled

emotion/styled パッケージは、既存の styled-components
より移行した際に、利用することが多いと考えています。

:::details

emotion/styled は styled-components ライクに書ける、という特長があります。

:::

しばしば emotion/css と emotion/react
を履き違えて使用してしまうケースも存在しています。

emotion/css の得られるメリットについて、下に示してみました。

- 生 react の `className` prop を使用できる
- カスタムの JSX パーサが無い
- babel の設定や file pragmas が無い
- 余計な tsconfig が無い
- React コンポーネント以外のクラス名を生成できる

続いて emotion/react
の得られるメリットについて、同じような形で下に示してみました。

- emotion/cache の設定は不要
- `css` 関数を利用して、容易にアクセスできる
- 容易にサーバサイドレンダリング (SSR) の有無を考慮できる

emotion/css パッケージは、多くの JavaScript フレームワークにとらわれず Emotion
を使用できます。

React で Emotion を使用するには emotion/react パッケージ、または emotion/styled
パッケージをインストールする必要があります。

```bash
# @emotion/react
npm i @emotion/react

# @emotion/react
yarn add @emotion/react
```

emotion/react では、実際に `css` 関数を利用して、各スタイルにアクセスします。

今回 Emotion 使用にあたって、選定した emotion/react
のメリットについては、こちらの
[記事](https://techlife.cookpad.com/entry/2021/03/15/090000)
を確認いただくのが分かり易いと考えています。

https://techlife.cookpad.com/entry/2021/03/15/090000

記事中このあたりで、私も多々同意しています。

- それぞれのスタイル定義をカプセル化できること
- CSS Modules や styled-jsx と比較した際の静的解析の導入しやすさ
- styled-components
  と比較した際の定義されたスタイルコンポーネント名の把握しにくさ

実際にその `css` props をインポートしてみましょう。

```js:Button.styles.tsx
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

続いて `styles.button`
を利用することで、該当のスタイルへアクセスできるようになります。

```js:Button.tsx
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

こうして Emotion
で書いたスタイルが、コンポーネント上に反映されることとなります。

なお、フレームワークに依存せず、最もシンプルに Emotion を使用する際は
emotion/css パッケージをインストールする必要があります。

```bash
# @emotion/css
npm i @emotion/css

# @emotion/css
yarn add @emotion/css
```

以後 emotion/css でも emotion/react と同じように書けます。

## 最後に

ひと通り読んでいただきありがとうございます。

こればかりは一度、手元の環境に何らかの管理ツールをインストール、実際に使用してみましょう。

いざ使用してみた実感として、おのおの styled-components と emotion
の間にそこまで大きな差分は無いことを実感します。

## その他

これまで多くの知見が発信されており、合わせてこちらも確認いただけると幸いです。

### 参考資料一覧

- そもそも emotion とはなんぞや、という話
  - [レシピサービスのフロントエンドに CSS in JS を採用した話](https://techlife.cookpad.com/entry/2021/03/15/090000)
- emotion 選定にあたって、事前に linaria も検討していた話
  - [Emotion の選定理由](https://b.0218.jp/202207142324.html)
- emotion のメンテナが CSS-in-JS を止めるってよ、という話
  - [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)
