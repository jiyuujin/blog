---
layout: Article.tsx
publish_date: 2022-10-07
title: 'モノレポについて語らいました'
description: 'モノレポのチュートリアルについて、チーム勉強会での登壇に合わせ言語化したので、その記録を簡単に書かせていただきました。'
slug: monorepo-tutorial
reaction: ⛳️
category: Server
tags:
  - Monorepo
  - Nx
  - Turborepo
---

## モノレポとは

この度、モノレポ (Lerna / Nx) について、チーム勉強会で登壇させていただきました。

もとは、現在私自身のジョインさせていただいているプロジェクトで、最近 Nx を利用したモノレポの中で開発を進めています。

キーワードで見る Nx について、ざっくり下記の通りです。

- アプリケーションやライブラリの管理
- 特定プロジェクトに対するビルド
- 並列ビルドやキャッシュ考慮も可能

この Nx は、主に Nrwl 社が開発を進めています。

最近 Lerna の管理も Nrwl 社の開発責任に入っています。

[Announcement: Passing the torch #3121](https://github.com/lerna/lerna/issues/3121)

Nx と Lerna の違いが、より明確に別れていくのでは、と考えたり、となど。

なお、登壇資料の公開はチーム内に限定させていただいた一方、汎用化の一環で Zenn book への [執筆](https://zenn.dev/books/monorepo-tutorial/edit) も行っております。

https://zenn.dev/books/monorepo-tutorial

### リポジトリ一覧

勉強会の登壇を前に、各種リポジトリを整理しました。

- [`Lerna` を利用したユニットテスト](https://github.com/jiyuujin/frontend-tests)
- [`yarn workspaces` を利用したユニットテスト](https://github.com/jiyuujin/yarn_workspace-frontend-tests)
- [`Nx` を利用したプロフィールウェブサイト](https://github.com/nekohack/org)
- [`Turborepo` を利用した技術ブログ](https://github.com/nekohack/blog)

上記リポジトリを参考に、是非とも実際に手を動かしてみましょう。
