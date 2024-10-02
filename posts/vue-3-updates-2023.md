---
layout: Article.tsx
publish_date: 2023-12-22
title: 'React っぽさを忘れよう、今年の Vue のアップデートを確認する'
description: '2023 年リリースされた Vue 3.3 / 3.4 のアップデートを見てみましょう。ひょっとすると React に浸っている方は、その React っぽさから完全に抜けきれていない可能性があります。'
slug: vue-3-updates-2023
reaction: ⛹️
category: Front
tags:
  - Advent-Calendar
  - Vue
---

この記事は jiyuujin Advent Calendar 2023 の 22 日目の記事になります。

https://adventar.org/calendars/9670

先日 Vue Fes Japan 2023 ウェブサイトのリポジトリが公開されました。

https://github.com/vuejs-jp/vuefes-2023

が、最新の Vue のお作法に則っていますかと聞かれると、正直そこの自信は全くありません。

本業の都合上自身は完全に React 脳に浸っており、どこかしら React っぽく書けば Vue も動くのではと考えたり、でございます。

昨年 8 月にリリースされた Vue 3.2 では、いま Vue を始めるなら普通に書くであろう `<script setup>` 構文、style タグにおける `v-bind` の対応が入りました。

https://blog.vuejs.org/posts/vue-3-2

(`<script setup>` 構文)

```vue
<script setup>
import { ref } from 'vue'

const color = ref('red')
</script>
```

(style タグにおける `v-bind` 関数)

```vue
<style scoped>
button {
  color: v-bind(color);
}
</style>
```

あまり Vue を知らない、おさわりしていない方でも、おそらく `<script setup>` 構文くらいは耳にされたものと考えています。

## Vue 3.3 「るろうに剣心」

今年 5 月にリリースされました。

https://blog.vuejs.org/posts/vue-3-3

Vite 並びに Webpack をお使いの方は、合わせて依存関係を確認する必要があります。

- volar / vue-tsc@^1.6.4
- vite@^4.3.5
- @vitejs/plugin-vue@^4.2.0
- vue-loader@^17.1.0

そして、開発者改善の動きはひじょうに嬉しいところ。

まず、冗長的にしか書けなかった `defineEmits` で、より簡潔に書けるようになりました。

```ts
// Before
const emit = defineEmits<{
  (e: 'foo', id: number): void
  (e: 'bar', name: string, ...rest: any[]): void
}>()

// After
const emit = defineEmits<{
  foo: [id: number]
  bar: [name: string, ...rest: any[]]
}>()
```

コンポーネントにおける Props の型を複合的に定義できるようになりました。

```vue
<script setup lang="ts">
import type { Props } from './foo'

// 複合的に型を定義できるようになった
defineProps<Props & { extraProp?: string }>()
</script>
```

型定義のジェネリクスは `generic` 属性を利用します。

```vue
<!-- generics 属性を利用できるようになった -->
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

### 型周りの開発者改善を経て

Vue Fes Japan 2023 の InputField.vue における Props を確認してみましょう。

React っぽさが抜けていない場合、下のように書いてしまいます。

```vue
<!-- Before -->
<script setup lang="ts">
import { InputHTMLAttributes } from 'vue'

type _InputFieldProps = Omit<InputHTMLAttributes, 'onInput' | 'onBlur'>
interface InputFieldProps extends /* @vue-ignore */ _InputFieldProps {
  titleLabel: string
  error: string
  value?: string
  placeholder?: string
  disabled?: boolean
}

const props = defineProps<InputFieldProps>()
</script>
```

正直、不思議とアプリケーションとして動いてしまうので、気付かぬうちにスルーしてしまいます。

しかし、`generic` 属性を利用しつつ、複合的に型を定義することで、しっかり React っぽさから抜けられます。

```vue
<!-- After -->
<script setup lang="ts" generic="T extends Omit<InputHTMLAttributes, 'onInput' | 'onBlur'>">
import { InputHTMLAttributes } from 'vue'

const props = defineProps<T & {
  required?: boolean
  disabled?: boolean
  titleLabel: string
  error?: string
}>()
</script>
```

こればかりは、新しい Vue に慣れるしかありません。

## 現在進行形で開発中の Vue 3.4 「スラムダンク」

間も無くリリースされる見込み、現在は DRAFT 版 (まだ変更の可能性あり) のリリースノートが、Evan 氏の GIST に上がっています。

https://gist.github.com/yyx990803/061593abfbaf1f2e3ddeee9094a6e6bf

TypeScript 5.2 より利用可能な `using` 構文をはじめ、PostCSS モジュールのアップデートが入っています。

- グローバルディレクティヴにおける `generics` サポートが追加
- 型定義 `ComponentInstance` が追加
- コンパイル時の機能フラグ `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` が追加

また、既存 API が非推奨化並びに削除される機能も多く、こちらについてもぜひ気に留めたい。

一時期、話題を賑わせた、`$ref` 使って state 管理を目指した Reactivity Transform については、削除 (別のプラグインとして提供) されることが決まっています。

https://ja.vuejs.org/guide/extras/reactivity-transform

### Reactivity システムの改善

Reactivity システムの内部挙動にパフォーマンス方面で改修が行われているとのこと、computed で変更されない場合その依存関係にトリガーされなくなるなど、関連する API にいくつか変化が予定されています。

https://github.com/vuejs/core/pull/5912

## 最後に

昨年 11 月の Nuxt 3 正式リリースをきっかけに、今年 2023 年漸く、安定的に Vue を使えるようになった 1 年ではと考えています。その矢先、エコシステムの一部では Rust 書き換えなど次の開発改善が進められていたりと、引き続き「活発」でございます。

また、Vue 3 のコアをミニマムに落とし込んだ [chibivue](https://github.com/Ubugeeei/chibivue) が X (Twitter) を中心に大きな話題となっており、私自身もまたおさわりしながら、学習の機会を作らせていただければと考えています。

https://github.com/Ubugeeei/chibivue

私自身なかなかそうした OSS の領域に踏み込めてはいませんが、何かしらのきっかけで関与できれば良いものと考えていますので、上手く捕捉していければ。
