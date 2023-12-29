---
layout: Article.tsx
publish_date: 2023-12-05
title: 'I/O (I/F 設計) を見える「形」にして、設計を詰めていく'
description: '特にこの 1 年、設計にこだわってきた中、いま一度設計手法について言語化してみました。'
slug: interface-design-at-first
reaction: 🍜
category: Poem
tags:
  - Review
  - Engineering
  - Advent-Calendar
---

この記事は jiyuujin Advent Calendar 2023 の 5 日目の記事になります。

https://adventar.org/calendars/9670

とあるジョインさせていただいていた (る) プロジェクト [EventIn](https://jp.vcube.com/eventdx/eventin) では、モノレポ Nx 環境で MUI をベースに「デザインシステム」を構築しておりました。

https://jp.vcube.com/eventdx/eventin

その場では、コンポーネントの props として、その interface を明らかにしてから基本設計や詳細設計を詰めていくことを心がけています。

このプロセスに開発者、時にはデザイナーも間に入って、認識すり合わせを進めます。

もちろん、ソースコードが完成して PR を作成すると、[Chromatic](https://www.chromatic.com/) を利用させてもらっていましたので、そのプレビュー環境で確認してもらいます。

https://www.chromatic.com/

:::details 最近 Chromatic の活用事例を多くの場で耳にします。

Chromatic では UI レビュー、技術レビュー双方の観点からチェックできるツールとなります。

コンポーネントの仕様書を書くことができ、また Storybook のビルドで吐き出された、静的な HTML ファイルを下に、ホスティングも行うことができ、それを利用して開発者間で確認することが可能となります。

- [デザインシステムの Storybook と Chromatic 活用の紹介](https://zenn.dev/sakito/articles/7a7c2e0800cf69)
- [Chromatic を導入しました！](https://zenn.dev/fullyou/articles/3b2d1bd1e6ce79)
- [Chromatic を使って爆速で Storybook をチームと共有する](https://dev.classmethod.jp/articles/chromatic-storybook-review-and-deploy/)

:::

ですが、この「対話」についてはあくまで実装前の段階、事前に I/F 設計のフェーズを設けました。

基本的に MUI の I/O を利用しつつ、MUI には無く EventIn には必要なことを「形」に作り上げていきます。

### ボタンコンポーネントを例に

ボタンのサイズについて MUI の仕様上、選択できるパラメータが複数存在します。

しかし、それらすべてが EventIn では必要無い場合、TypeScript 標準搭載の `Pick` を利用することで、余計な設定を省くことができます。

```ts
type _Size = "x2-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "x2-large";

interface ButtonProps {
  size: Pick<_Size, "x-small" | "small" | "medium" | "large">;
}
```

そもそも、size 属性ごと EventIn では必要無い場合、こちらも TypeScript 標準搭載の `Omit` を利用することで、余計な設定を省くことができます。

```ts
import { ButtonBase } from "@mui/material";

type _ButtonProps = Parameters<typeof ButtonBase>[0];

export interface ButtonProps extends Omit<_ButtonProps, "size"> {
  //
}
```

余計な設定を省くことで、不用意なバグを生むことの低減に繋がります。

そして、余計かどうかを判断するには、事前の「対話」が必要でコミュニケーションコストは大きくなります。

この結果、どうしても +α で書かなければいけないロジック、ないし UI が存在する場合に、それについてのユニットテストを書くことを心がけました。

自身これまでの性格として何事も難しく考えるタチがあり、ソースコードが肥大化してしまう結果に結びついてしまっていました。

折角、使わせてもらうと決断したライブラリを 100% 信用することはもちろん、利用できるものは最大限利用させていただくという姿勢をこれからも堅持しつつ、より一層設計に向き合っていきたいと思います。

### ボタン以外のコンポーネントを例に

ボタンコンポーネントと同じく、コンポーネントの props に HTML Standard の型定義を利用しましょう。

その詳細について先日、当ブログより書かせていただきましたので、そちらをご確認いただければ。

https://blog.nekohack.me/posts/react-componentprops-htmlprops/

### 設計の足しに Type Challenges おすすめ

今年 2023 年の夏ころ Type Challenges を使った無料サービスのローンチで話題となりました。

https://mosya.dev/type-challenges

まさにこの下となった Type Challenges を自身も挑戦させていただきました。

正直 easy レベルでも難しいと感じるかもしれません。

https://github.com/type-challenges/type-challenges

しかし、このさわりだけを進めたところで、十二分に設計の足しになると考えています。

## 最後に

いま一度、自身の書いたコードをフレッシュな気持ちで見たところ、結構冗長的な箇所が多いと気付かされます。

いわゆる、一般的に言われているような「クソコード」と認識されてしまいますが、そうならないようこれからは機能を足し算で増やさず、使えるものは最大限使いつつ「引き算」でより良い形、設計にできれば、などと考えております。
