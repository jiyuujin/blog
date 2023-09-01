---
layout: Article.tsx
publish_date: 2023-05-24
title: 'Props に HTML Standard の型定義を利用する'
description: 'ComponentProps と HTMLProps の違いについて調べてみたので、その記録をば。'
slug: react-componentprops-htmlprops
reaction: 🚣‍♀️
category: Front
tags:
  - React
  - TypeScript
---

## Props の型定義を知る

コンポーネントにおける Props の型定義で、既にある型定義を利用しましょう。

それはすなわち噛み砕いていうと、無理して自分用の型定義を作成する必要がないことを意味しています。

実際 Props の型定義では下記より選択できます。

- `IntrinsicElements`
- (より広義で) `ComponentProps` / `ComponentPropsWithRef`
- `HTMLAttributes`
- (より広義で) `HTMLProps`

結論をいうと、積極的に Props の型定義で `ComponentProps` を利用して欲しいと考えています。

`IntrinsicElements` や `ComponentProps` で、複雑な型定義が書かれていますが、大まかにいえばラッパーのひとつと認識できます。

実際、開発者の目線で [`@types/react`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react) の内部実装を確認してみることをおすすめいたします。

### `IntrinsicElements` と `ComponentProps`

[内部実装](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/f3134f4897c8473f590cbcdd5788da8d59796f45/types/react/index.d.ts#L821)

```ts
// node_modules/@types/react/index.d.ts

interface ReactComponentElement<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  P = Pick<ComponentProps<T>, Exclude<keyof ComponentProps<T>, 'key' | 'ref'>>,
> extends ReactElement<P, Exclude<T, number>> {}

type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  T extends JSXElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : {}
```

### `HTMLAttributes` と `HTMLProps`

[内部実装](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/f3134f4897c8473f590cbcdd5788da8d59796f45/types/react/index.d.ts#L1332)

```ts
// node_modules/@types/react/index.d.ts

interface HTMLProps<T> extends AllHTMLAttributes<T>, ClassAttributes<T> {
  // Standard HTML Attributes
}

interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
  // Standard HTML Attributes
}

interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // Standard HTML Attributes
}
```

## I/F 設計の例

`Input` / `TextArea` コンポーネントで HTML 標準の `HTMLInputElement` を利用してみます。

### `Input` コンポーネント

`React.ComponentProps` で `input` を指定しましょう。

```ts
export type InputProps = React.ComponentProps<'input'>
```

`Input` コンポーネントの props に `React.ComponentProps` で指定した型定義を利用しましょう。

```ts
import React from 'react'

export type _InputProps = React.ComponentProps<'input'>

export type InputProps = _InputProps

export function Input(props: InputProps) {
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return <input {...props} onChange={onChange} />
}
```

ここで `_InputProps` に存在しない型のひとつとして、今回は `onSearch()` を新たに Props の型定義へ追加したいと考えます。

```ts
import React from 'react'

export type _InputProps = React.ComponentProps<'input'>

export interface InputProps extends _InputProps {
  onSearch: (input: string) => void // onSearch() の型定義を追加します
}

export function Input(props: InputProps) {
  const { onSearch, ...rest } = props
  const [input, setInput] = useState('')

  const canSend = rest.value

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return (
    <div>
      <input {...rest} onChange={onChange} />
      <button disabled={disabled || !canSend}>
        <Icon name={canSend ? 'carbon' : 'masked-carbon'} />
      </button>
    </div>
  )
}
```

### `TextArea` コンポーネント

`React.ComponentProps` で `textarea` を指定しましょう。

```ts
export type TextAreaProps = React.ComponentProps<'textarea'>
```

`TextArea` コンポーネントの props に `React.ComponentProps` で指定した型定義を利用しましょう。

```ts
import React from 'react'

export type _TextAreaProps = React.ComponentProps<'textarea'>

export type TextAreaProps = _TextAreaProps

export function TextArea(props: TextAreaProps) {
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return <input {...rest} onChange={onChange} />
}
```

ここで `_TextAreaProps` に存在しない型のひとつとして、今回は `onSearch()` を新たに Props の型定義へ追加したいと考えます。

```ts
import React, { ChangeEvent, useState } from 'react'

export type _TextAreaProps = React.HTMLProps<HTMLTextAreaElement>

export interface TextAreaProps extends _TextAreaProps {
  onSearch: (input: string) => void
}

export const TextArea = (props: TextAreaProps) => {
  const { rows = 1, onSearch, ...rest } = props
  const [input, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.currentTarget.value)

  const onClick = () => onSearch(input)

  return (
    <div>
      <textarea {...rest} onChange={onChange} rows={rows} />
      <button disabled={disabled || !canSend}>
        <Icon name={canSend ? 'carbon' : 'masked-carbon'} />
      </button>
    </div>
  )
}
```
