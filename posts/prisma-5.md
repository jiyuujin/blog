---
layout: Article.tsx
publish_date: 2024-03-10
title: 'Prisma 5 へ更新した際の気付き'
description: 'Prisma 4 との違いについて書かせていただきました。'
slug: prisma-5
reaction: ♣️
category: Server
tags:
  - Prisma
---

:::message

今回は Zenn スクラップにも書き起こしています。

https://zenn.dev/jiyuujin/scraps/5023e639491712

:::

## Prisma 5 へ更新する

Prisma 5 に必要な Minimum バージョンを確認しましょう。

- Node.js 16.13
- TypeScript 4.7
- PostgreSQL 9.6
- 組み込みの SQLite 3.41.2

既存の 4 から 5 へ更新する際は、公式のマイグレーションガイドを確認します。

https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-5

Prisma ORM 5 へアップグレードするため、両方のパッケージを更新する必要があります。

```bash
# npm
npm install @prisma/client@5
npm install -D prisma@5

#yarn
yarn up prisma@5 @prisma/client@5

# pnpm
pnpm upgrade prisma@5 @prisma/client@5
```

### jsonProtocol 対応

jsonProtocol により、起動時間が大幅に改善されました。この対応により、非推奨 API の `--preview-feature` も削除されている点に注意しましょう。


(Prisma 4 まで)

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["jsonProtocol"]
}
```

(Prisma 5 では)

```
generator client {
  provider = "prisma-client-js"
}
```

### 非推奨 API の削除

- Prisma Client から `rejectOnNotFound` パラメータが削除
- Prisma CLI から、非推奨フラグが削除
  - `--clean`
  - `--early-access-feature`
  - `--experimental`
  - `--experimental-reintrospection`
  - `--force`
  - `--preview-feature`

### 配列のショートカットが削除

対象要素がひとつでも必ず、配列として渡さなければいけなくなりました。

- `OR` 演算子
- `in` 演算子、`notIn` 演算子
- PostgreSQL における JSONpath フィールド
- スカラーリスト
- MongoDB のコンポジットタイプ

(Prisma 4 まで)

```ts
await prisma.user.findMany({
  where: {
    OR: { email: 'alice@prisma.io' }
  }
})
```

(Prisma 5 では)

```ts
await prisma.user.findMany({
  where: {
    OR: [{ email: 'alice@prisma.io' }]
  }
})
```

### runtime/index.js が削除

Prisma Client から runtime/index.js が削除されました。

(Prisma 4 まで)

```ts
import { Decimal } from '@prisma/client/runtime'

Decimal
```

(Prisma 5 では)

```ts
import { Prisma } from '@prisma/client'

Prisma.Decimal
```

### その他

`beforeExit` ライブラリエンジンからフックが削除され、代わりに Node.js の終了イベントを使用します。

(Prisma 4 まで)

```ts
this.$on('beforeExit', async () => {
  await app.close();
});
```

(Prisma 5 では)

```ts
process.on('exit', , async () => {
  await app.close();
});
```

## 最後に

こうしてチェックしてみたところ、Prisma 5 で jsonProtocol を採用したことによるパフォーマンス向上はうれしい話となります。

Node.js 18/20 へ更新したアカツキ、ついでに Prisma 5 へも更新する時間を取っていきましょう。

さらに Prisma 5 を調査するには、CHANGELOG を確認してください。

https://github.com/prisma/prisma/releases/tag/5.0.0
