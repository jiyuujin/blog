---
layout: Article.tsx
publish_date: 2024-03-08
title: 'Create-React-App (CRA) から Rspack へリプレースした際の気付き'
description: 'Create-React-App (CRA) から Rspack へリプレースした際の気付きを簡単に書かせていただきました。'
slug: cra-to-rspack
reaction: 🚚
category: Front
tags:
  - TypeScript
  - Rsbuild
  - React
---

:::message

アップグレードの観点に困っている方など、ご一読いただければ幸いです。

:::

昨年よりジョインさせていただいている wevnal では、チャットボットを管理するため CS 向けにそれを円滑に管理しやすくしたプロダクトが存在しています。

https://wevnal.co.jp/service/chatbot/

今回そうしたプロダクトについて、フロントエンドで Create-React-App (CRA) を利用させていただいものを、Rsbuild (Rspack) へリプレースを推進しました。

奇しくも、先月末 28 日には v1 リリースプランが上がっており、今年 7 月にも Rsbuild v1 がリリースされるよう動いているとのこととなります。

https://github.com/web-infra-dev/rsbuild/discussions/1678

## Rsbuild (Rspack) とは

まず前提として Rspack はマルチスレッドを利用しつつ、パフォーマンスを向上させるため Rust で webpack の一部が書き換えられており、並列処理や増分コンパイル、最適化されたホットモジュールとの交換といった機能が組み込まれています。また、webpack のスキーマ並びに各種ローダー (babel-loader や less-loader など) との互換性も、特徴のひとつに挙げられます。

:::message

Rspack と同じく Rust で書かれている SWC について。JavaScript のみならず、CSS や PostCSS など他のフレームワークでも使用できる Rspack に対し、全ての主要な Web ブラウザで使用できる JavaScript をバンドルすることに重点を置いている SWC となります。

:::

:::message

Rspack と違って Go で書かれている ESBuild について。webpack スキーマとの互換性について ESBuild にはなく、並列アーキテクチャや増分コンパイルも ESBuild ではサポートされていません。

:::


なお、この Rspack については昨年 12 月のイベントで kazupon 氏より、ぎゅっと凝縮した形で話されております。機会あれば、そちらをご確認いただきつつ、その中身については以下スライドのリンクよりご参照ください。

https://speakerdeck.com/kazupon/vue-and-vite-rustify

### Rspack プロジェクトは Bytedance の開発改善より始まった

Rspack は Bytedance の web-infra-dev チームが中心となって開発されています。

https://github.com/web-infra-dev

Rust 製の Rspack を中心に色々なツールチェインを開発しています。

- [Rspack](https://github.com/web-infra-dev/rspack)
- [Rsbuild](https://github.com/web-infra-dev/rsbuild)
- [Rspress](https://github.com/web-infra-dev/rspress)
- [Rsdoctor](https://github.com/web-infra-dev/rsdoctor)
- [Oxc](https://github.com/web-infra-dev/oxc)
- [Modern.js](https://github.com/web-infra-dev/modern.js)
- [Garfish](https://github.com/web-infra-dev/garfish)

Rspack は Webpack エコシステムと相互運用を提供する高速バンドラで、babel-loader や less-loader、sass-loader などの基本的なローダは公式にサポートされています。

今後も継続的にパフォーマンス向上に努めながら、コミュニティからのフィードバックを得て必要なものを取り入れていくとのこと。

ちなみに Webpack との比較について、Rspack 公式のベンチマークをご参照ください。

- [the case of Cold Start](https://www.rspack.dev/misc/benchmark.html#data)
- [the case of 10,000 React components](https://www.rspack.dev/misc/benchmark.html#data-1)

## Rsbuild の v1 リリースプランが公開された

前置きでも書きましたが、Rsbuild の v1 リリースプランによると、今年 7 月までに Rsbuild v1 がリリースされるよう動いているとのことでございます。

https://github.com/web-infra-dev/rsbuild/discussions/1678

Rsbuild をベースにした Rslib という新しいツールが実装、ライブラリビルドモードが提供される予定となります。マルチビルド構成の実装方法、バンドルレスのサポート方法、esm / cjs / dts 出力のサポート方法など、Rslib の重要な設計を明確にする必要があります。

Rspack モードと Webpack モードで異なる CSS 実装を有しているところ、近く Rspack ネイティブの mini-css-extract-plugin に移行します。

https://github.com/web-infra-dev/rspack/issues/3210

その他、上位レベルのフレームワーク用サーバー API `rsbuild.getServerAPIs()` など、残る JavaScript API を安定化させることを目指します。

- `html.tagsByEntires` 削除
- `output.enableCssModuleTSDeclaration` 削除 -> 外部に移行予定
- `output.disableXXX` 削除に伴い `output.disableMinimize` リアーキ (計画) の議論開始を予定

まだ、ESM 出力を提供していない @rsbuild/core および @rsbuild/shared の ESM 出力をサポートします。

## Rsbuild (Rspack) を導入する

基本的に公式のマイグレーションガイドを確認いただくことをおすすめします。

https://rsbuild.dev/guide/migration/cra

アンインストールとインストールは、いつもの `npm` コマンドを使いましょう。

```bash
# Create-React-App (CRA) 削除
npm remove react-scripts

# Rspack 追加
npm add @rsbuild/core @rsbuild/plugin-react -D
```

使用コマンドを `react-scripts` から `rsbuild` へ変更します。

ルートに rsbuild.config.js を置きます。この書き方自体 Vite における vite.config.js と相通ずる部分があり、それに慣れている方は抵抗も少ないと考えています。

実際 Rspack を有効にするため、@rsbuild/plugin-react の API を読み込みます。

```ts
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default ({ mode }) => {
  return defineConfig({
    plugins: [pluginReact()],
  })
}
```

その後、必要に応じて Rspack の諸設定を実装していきます。

- テンプレートファイル `./public/index.html` のパスを `html.template` に設定する
- 出力ディレクトリ `dist` を `output.distPath.root` に設定する

環境変数が存在する場合は `tools.rspack.plugins` を確認してみましょう。

その `tools.rspack.plugins` で `rspack.DefinePlugin` インスタンスを初期化、各環境変数を設定します。

### 余談

なんといってもビルド速度の早さを体感してください。

Create-React-App (CRA) では、ビルド時間におよそ 10 分近くかかっていたところ。

![](https://i.imgur.com/SM6PSgK.png)

Rspack では、ビルド時間が 5 分で済みました。

![](https://i.imgur.com/kGLmTbb.png)

[マイグレーションガイド](https://rsbuild.dev/guide/migration/cra) を確認する限りは移行コストは決して高くないと考えていますが、Webpack の使い方次第ではそのコストもばかにはならなさそうな気がしています。

#### レガシーブラウザ向けを考慮する

ありがたいことにレガシーブラウザ向けを考慮する必要はありませんでしたが、このコード変換についてもデフォルトで SWC を使用できます。

target オプションで、サポートする環境を指定できます。

```ts
import { defineConfig } from '@rsbuild/core'

export default ({ mode }) => {
  return defineConfig({
    target: ['es2015', 'node'],
  })
}
```

SWC は Stage 3 以上のプロポーザルから全てのコードをサポートしており、@babel/preset-env の機能や browserslist にも対応しているため、ほとんどのケースで Babel から置き換えられます。
