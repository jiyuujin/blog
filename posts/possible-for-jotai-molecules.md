---
layout: Article.tsx
publish_date: 2023-12-15
title: 'jotai-molecules 利用のすゞめ'
description: 'jotai-molecules の使いどころを通して、ライブラリ側がアプリケーションの中で責務を持つか否か学びを得ます。'
slug: possible-for-jotai-molecules
reaction: 🎳
category: Front
tags:
  - React
  - Jotai
  - Advent-Calendar
---

この記事は jiyuujin Advent Calendar 2023 の 15 日目の記事になります。

https://adventar.org/calendars/9670

とあるジョインさせていただいているプロジェクト [EventIn](https://jp.vcube.com/eventdx/eventin) で jotai を使っています。

https://jp.vcube.com/eventdx/eventin

と、そこでそうした jotai の使いどころを整理しつつ、それらのユースケースを想定しました。

https://www.npmjs.com/package/jotai-molecules

`atomFamily` を利用するより、かなり簡潔に書ける方法を追求、堅牢な設計を進めました。

結果的には、そうした設計方針として、atom を molecule へ昇格させつつ、その使用感を通常の atom に近づけられる jotai-molecules を利用いたしました。

## `atomFamily()` 利用を考えてみる

param を受け取って atom を返す関数を作成、すでに作成された atom の場合はキャッシュを返します。

ここで、とあるユーザー情報 (userId) を、アプリケーション全体における state のひとつに、保持するユースケースを考えるとします。

この state 管理に、まず `atomFamily()` を利用する idea がありました。

```ts
import { atomFamily } from 'jotai/utils'

export const userFamily = atomFamily(userId)
```

返した atom をもって、適宜パラメータを取得、入力できるようになります。

```ts
const [userId, setUserId] = useAtom(userIdAtom)
```

しかし、その atom を取得する過程で、少し冗長的となってしまい記述量も増えてしまいます。

```ts
import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

export const userIdAtom = atom<string>('')

export const userIdFamily = atomFamily(
  (userId: string) => atom((get) => get(userIdAtom)),
  (a: string, b: string) => a === b,
)
```

もちろん、この設計を進めたところで、大きな問題はありません。

しかし、このロジックに「バグ」が潜んでいる可能性も、一切否定できません。

ユニットテストを書くことで

### jotai の molecule 活用を考えてみる

scope 指定されたプロバイダー、フックの利用を考えてみます。

https://jotai.org/docs/extensions/scope

ざっくり molecule を引数に渡し、atom を返すようにしたものとなります。

molecule で `getScope` を呼び出して、その scope 配下で返り値として atom を取得します。

```ts
import { atom } from 'jotai'
import { molecule } from 'jotai-molecules'

export const initialUserIdScope = createScope('')

export const userIdMolecule = molecule((getMol, getScope) => {
  const initialUserId = getScope(initialUserIdScope)
  return atom(initialUserId)
})
```

`atomFamily()` を利用するより、記述量も少なく済みました。

```ts
import { useAtom } from 'jotai'
import { useMolecule } from 'jotai-molecules'

const userIdAtom = useMolecule(userIdMolecule)

const [userId, setUserId] = useAtom(userIdAtom)
```

純粋な state 格納、取得についてのロジックは、ライブラリ側 jotai (と jotai-molecules) に任せつつ、固有ドメインのロジックについては自分たちの管轄内で設計・実装を進めることとしました。

今回、state 管理を一例に書かせていただきましたが、こればかりはライブラリ側がアプリケーションの中で責務を持つか否かをしっかり検討しなければいけないことに気付かされました。

## 余談

最近 jotai-molecules は、bunshi へのリブランディングを図っていました。

> jotai-molecules has been renamed to bunshi.
> All new users of this module should use bunshi instead. Bunshi adds support for vue, react and vanilla javascript. Development and features additions will continue under the bunshi package.
> Molecules in jotai-molecules version 1.2.0 are compatible with molecules from bunshi, and they can interoperated and depend on each others. Version 1.2.0 of jotai-molecules is just a wrapper for bunshi.

https://www.npmjs.com/package/jotai-molecules

なお、これまでのバージョンとの互換性があり、Vue や React、Vanilla JavaScript のサポートも追加されているとのこと、React 以外でもこの考え方を実践できそうな気がしております。
