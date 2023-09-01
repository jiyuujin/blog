---
layout: Article.tsx
publish_date: 2023-04-19
title: 'Vue Fes 2023 ティザーオープンの裏側'
description: '昨年に続いて Vue Fes 2023 Web サイトの技術をリードさせていただいております。先週迎えた初期ローンチに伴い、今回は早めに昨年との違いを触れさせていただきました。'
slug: deep-dive-vuefes-2023-ahead
reaction: 👻
category: Front
tags:
  - Vue
  - Vue3
  - Nuxt
  - Nuxt3
  - VueFes
---

Vue Fes Japan 2023

(OGP 画像)

![](https://i.imgur.com/ik1tOZO.png)

https://vuefes.jp/2023

昨年の Vue Fes Japan Online 2022 ウェブサイト製作を開始した当初は Nuxt 3 もまだリリースされていませんでしたが、今年は大きく悩むことなく (?) Nuxt 3 を選定させていただきました。

私自身の役割について、今回も技術のリードとして取り組まさせていただくとともに、Web サイトチームのリードとして引っ張らせていただいております。

昨年同様、初期ローンチまでの間で緻密な設計を心がけました。

なお、開催が無事に終わるまではリポジトリを public に変更させられないため、取り急ぎかいつまんでご紹介させていただきます。

まず package.json 内の依存関係を下へ示してみます。

```json
{
  "devDependencies": {
    "@markuplint/vue-parser": "3.2.0",
    "@markuplint/vue-spec": "3.2.0",
    "@nuxt/devtools": "0.2.5",
    "@nuxtjs/device": "3.1.0",
    "@types/node": "18.13.0",
    "@typescript-eslint/eslint-plugin": "5.51.0",
    "@typescript-eslint/parser": "5.51.0",
    "eslint": "8.33.0",
    "eslint-plugin-vue": "9.9.0",
    "eslint-plugin-vuejs-accessibility": "2.1.0",
    "husky": "8.0.3",
    "markuplint": "3.2.0",
    "nuxt": "3.2.3",
    "pinceau": "0.18.0",
    "prettier": "2.8.4",
    "typescript": "4.9.5",
    "vee-validate": "4.7.4",
    "vite-svg-loader": "4.0.0",
    "vitest": "^0.29.3",
    "vue-gtag": "2.0.2-beta.0",
    "vue-recaptcha-v3": "2.0.1",
    "vue-tsc": "1.2.0"
  }
}
```

補足事項は [Nuxt DevTools](https://devtools.nuxtjs.org/) を有効化していることでしょうか。

![](https://user-images.githubusercontent.com/904724/217796838-597625f1-3f5a-4fb1-9720-68fd1c7d6615.jpg)

活用方法の模索こそ現在進行形となりますが、かくいう私自身は現在、本業のおしごとで全く Vue.js をさわらない日常を送っています。

折角、こうしたオープンソースのプロダクトへコントリビュートする機会、興味のあるものに取り組んでいくということは大変意義深いものと考えています。

続いてディレクトリ構成を下へ示してみます。

```
🗂 root
   └ 🗂 app                      : app 配下のアプリケーション
      └ 🗂 assets
      └ 🗂 components
      └ 🗂 composables
      └ 🗂 layouts
      └ 🗂 pages
      └ 🗂 plugins
      └ 🗂 public
      └ 🗂 types
      └ 🗂 utils
   └ 🗂 scripts
- 📄 nuxt.config.ts              : Nuxt の config ファイル
- 📄 package.json                : アプリケーションの package
- 📄 tsconfig.json               : アプリケーションの TS config
```

基本的な構造こそ昨年とあまり変わっておらず、初期ローンチ以後度重なる機能追加を経るも、全体の体裁は崩れないものと考えています。

なお、今年は Vue Fes 2023 全体として広報活動にも注力しており、先日デザイナーのわかまつさんが今回のウェブサイトのデザインについて [寄稿](https://note.com/hachi_ihcah/n/na60e5fa4a64e) されています。

<!-- note のリンクを貼り付ける -->

https://note.com/hachi_ihcah/n/na60e5fa4a64e

(デザインコンセプト)

![](https://i.imgur.com/QFyYEXG.png)

## 昨年とココが違う Vue Fes 2023

デザインはわかまつさんの記事を確認していただくとして、これより先は開発の視点で書かせていただきました。

今回のキーワードについて、下記キーワードが挙げられます。

- Nuxt 3 (Vue 3) -> 今回は Nuxt 3 正式版を使用しています
- Pinceau (CSS in TS) -> 新たに挑戦しています
- TypeScript -> vue-tsc を導入しています
- Composition API
- `<script setup>` syntax
- Newt FormApp -> 新たに挑戦しています
- Netlify

基本的に、今年は思い切って挑戦することをモットーに行動させていただきます。

昨年の秋に Nuxt 3 正式リリースを迎え、漸く腰を据えて開発できる状態となったいま、保守的な姿勢で居続けるのは非常に勿体無いと考えています。

また、オープンソースのプロダクトへコントリビュートする機会、積極的に experimental な機能も試していきたい。

その上で、今回捕捉するのは、以下 3 点挙げることとします。

- CSS 選定
- 問い合わせの管理
- その他 (Lint / Typecheck)

### CSS 選定

まず、昨年採用した Tailwind CSS を、今年は採用しませんでした。代わりに CSS in TS のひとつ [Pinceau](https://pinceau.dev/) を採用させていただいています。

![](https://raw.githubusercontent.com/Tahul/pinceau/646f1d626187fdc9ba748fb20f9649ea718113c0/docs/public/cover.jpg)

ざっくりいうと、下みたく CSS を型安全に書けるというものになります。

```
<style lang="ts">
css({
  '.root': {
    display: 'grid',
    gap: '4px',
  },
  // ...
})
</style>
```

ちなみに、昨年の Vue Fes Japan Online 2022 の Peephole でも、その紹介がなされましたが、この Pinceau を今年のウェブサイトで使用することになりました。

もちろん、いまこのタイミングで 0.x 系の Pinceau を選定するというのは、一プロダクト企業のプロジェクトとしては絶対に取り得ない選択肢かと考えています。

しかし、オープンソース (OSS) のプロジェクトかつ Vue のひとつの「象徴」として、stable なものを使う形式で落ち着いてしまって良いのか、といった疑問符がついてまわりました。

実際、メンバー間のムードや昨年の KPT など総合的に鑑みて Pinceau を選定、この 1 年間はお世話になろうと決意した形になります。

Pinceau の導入については、[公式ドキュメント](https://pinceau.dev/get-started/installation) と合わせご確認ください。

```js
export default defineNuxtConfig({
  modules: ['pinceau/nuxt'],
})
```

今回、採用した Nuxt (v3 正式版) 上では、Pinceau のテーマ及びユーティリティに対する型定義の設定など自動で読み込まれるようになっています。

CSS を書く上で必要となるデザイントークンについては、プロジェクトルートに tokens.config.ts を置きます。

そして nuxt.config.ts より `pinceau.configFileName` を読み込んでください。

```js
export default defineNuxtConfig({
  pinceau: {
    configFileName: 'tokens.config',
  },
})
```

基本的に Pinceau 導入のフェーズは、いたってシンプルとなります。

#### カラートークンを定義する

昨年採用の Tailwind CSS においても、ルートの tailwind.config.js で、カラートークンを中心に定義していました。

https://github.com/vuejs-jp/vuefes-2022/blob/main/tailwind.config.js#L5

Pinceau においても同様に、カラートークンを定義できます。

```js
import { defineTheme } from 'pinceau'

export default defineTheme({
  color: {
    white: '#FFF',
    vue: {
      blue: '#35495E',
      green: '#42B983',
    },
    typescript: {
      blue: '#3178C6',
    },
  },
})
```

なお、下のようにケバブケースとして定義することは (いまのところ) できないので気を付けましょう。

```js
import { defineTheme } from 'pinceau'

export default defineTheme({
  color: {
    'vue-blue': '#35495E', // NG
    'vue-green': '#42B983', // NG
  },
})
```

### 問い合わせの管理

続いて問い合わせのフォームでは、昨年採用した Netlify form を、今年は採用しませんでした。代わりに Newt の [FormApp](https://www.newt.so/form-app) を採用させていただいています。

![](https://prcdn.freetls.fastly.net/release_image/95676/6/95676-6-75b1a533f1bca5881e59aeb346bba080-1200x630.jpg?format=jpeg&auto=webp&quality=85%2C75&width=1950&height=1350&fit=bounds)

奇しくも時を同じくして、[Newt](https://www.newt.so/) 公式のチュートリアルが発表されていました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">NewtのForm Appを利用して、Nuxt3で問い合わせフォームを作成するチュートリアルを公開しました🎉<br><br>自動返信・受信通知の設定はもちろん、少し面倒なバリデーションやGoogle reCAPTCHA v3の導入についても扱っています。Nuxtでフォームを作ってみたい方は是非どうぞ🥳<a href="https://t.co/v5WO3wOCxH">https://t.co/v5WO3wOCxH</a></p>&mdash; Newt (@newt_cms) <a href="https://twitter.com/newt_cms/status/1626009600943362049?ref_src=twsrc%5Etfw">February 16, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

一応、Newt 公式のチュートリアルが発表されたのは、問い合わせツールの選定後になります。

なお、昨年同様 Newt の CMS を使わせていただくかについては、現在検討中です。

おいおいどうなったのか、共有させていただければと考えております。

こちらは Newt 側で作成したスペースの UID と、フォームの UID を読み込む必要があります。

```js
export default defineNuxtConfig({
  publicRuntimeConfig: {
    newtSpaceUid: process.env.NUXT_NEWT_SPACE_UID,
    newtFormUid: process.env.NUXT_NEWT_FORM_UID,
  },
})
```

ここで、基本的には [Newt 公式のチュートリアル](https://www.newt.so/docs/tutorials/contact-form-in-nuxt) を見ていただくのが、大変分かりやすいと考えています。

https://www.newt.so/docs/tutorials/contact-form-in-nuxt

[`useRuntimeConfig`](https://nuxt.com/docs/guide/going-further/runtime-config) は `#app` よりアクセスできます。

```html
<form
  method="post"
  :action="`https://${NUXT_NEWT_SPACE_UID}.form.newt.so/v1/${NUXT_NEWT_FORM_UID}`"
>
  <input type="text" name="Full name" />
  <input type="text" name="Email" />
  <textarea type="text" name="Description" />
  ...
  <button type="submit">Submit</button>
</form>
```

実際、一番シンプルな方法は `<form>` タグを利用していただくこととなります。

HTML 標準のバリデーションで間に合う場合はこのまま進めてください。しかし、固有のバリデーションを実装する場合は、vee-validate と合わせ `fetch` を利用していただくこととなります。

なお、今回 Vue Fes 2023 では、問い合わせ専用のカスタム hook を作成しました。

問い合わせに必要なデータモデルを作成します。

- 名前を入力する name モデル
- メールアドレスを入力する email モデル
- メッセージの詳細 (本文) を入力する detail モデル

Newt へアクセスする責務、バリデーションエラーを設定する責務に分けました。

まず `useForm` に Newt へアクセスする責務を含めます。

```ts
import { useForm as useValidateForm } from 'vee-validate'

export function useForm() {
  const { useFieldModel, handleSubmit } = useValidateForm()
  const [name, email, detail] = useFieldModel(['name', 'email', 'detail'])
  const config = useRuntimeConfig()

  const endpoint = `https://${config.newtSpaceUid}.form.newt.so/v1/${config.newtFormUid}`
  const isSent = ref(false)

  const isSubmitting = computed(() => {
    if (!name.value || !email.value || !detail.value) return false
    if (name.value && email.value && detail.value) return true
    return false
  })

  const onSubmit = handleSubmit(async function (values) {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value)
    })
    await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(() => (isSent.value = true))
      .catch((err) => (console.error(err)))
  })

  return { name, email, detail, isSent, isSubmitting, onSubmit }
}
```

続いて `useFormError` にバリデーションエラーを設定する責務を含めます。

```ts
export function useFormError() {
  const nameError = ref('')
  const emailError = ref('')
  const detailError = ref('')

  const submitError = ref('')

  function validateName(value: string) {
    if (value === '') {
      nameError.value = '名前を入力してください'
      return
    }
    nameError.value = ''
  }

  function validateEmail(value: string) {
    if (value === '') {
      emailError.value = 'メールアドレスを入力してください'
      return
    } else if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
      emailError.value = 'メールアドレスの形式を確認してください'
      return
    }
    emailError.value = ''
  }

  function validateDetail(value: string) {
    if (value === '') {
      detailError.value = '問い合わせ内容を入力してください'
      return
    }
    detailError.value = ''
  }

  return {
    nameError,
    emailError,
    detailError,
    submitError,
    validateName,
    validateEmail,
    validateDetail,
  }
}
```

こうして作成したカスタム hook を、適宜コンポーネント側より使うよう書くことで、込み入ったドメインの情報を小分けにできます。

```js
const { name, email, detail, isSent, onSubmit } = useForm()
```

```html
<form @submit="onSubmit">
  <input type="text" :name="name" />
  <input type="text" :name="email" />
  <textarea type="text" :name="detail" />
  ...
  <button type="submit">Submit</button>
  <div v-if="isSent">メッセージ送信に成功しました。</div>
</form>
```

ここまで来ると、あとはフロントエンドの描画になります。

この描画で、先の Pinceau を活用しています。

実際の描画について、この場では割愛させていただきます。

### その他

まずは、適切な Lint ツールを選定します。といってももちろん適切なツール選定ということ自体、今年に限ったものではありません。

昨年と違って StyleLint を止めました。そもそも CSS in TS のひとつ Pinceau を採用する以上、CSS に Lint をかける意味は無いと判断しました。

一方、今年初めて markuplint を導入しています。昨今アクセシビリティの考え方を通して、ありとあらゆる人たちが一切の障壁なく平等にウェブサイトが使用できるのを目指す必要があります。

ただ、現状 recommend ルールのプリセット適用にとどまっており、以後ルールの見直し、拡充を図っていきます。

```.markuplintrc
{
  "extends": ["markuplint:recommended"],
  "parser": {
    ".vue$": "@markuplint/vue-parser"
  },
  "specs": {
    ".vue$": "@markuplint/vue-spec"
  }
}
```

続いて、型定義について、見ていきます。

今回 Vue Fes 2023 では初めて、SFC ファイルの型チェックライブラリ [`vue-tsc`](https://www.npmjs.com/package/vue-tsc) を利用しています。

というのも、昨年 Vue Fes 2022 では、その `vue-tsc` を採用せずウェブサイトの開発を進めていたの、などと指摘を受けてしまいますが。

```bash
vue-tsc --noEmit
```

実際 vue-tsc が使用されているプロジェクトもかなり多いか、と。

- [vue-tsc で SFC 内の template も含めて TypeScript の型チェックを行う](https://madogiwa0124.hatenablog.com/entry/2022/05/14/215610)
- [vue-tsc を使った TypeScript Strict Mode の漸進的導入](https://tech.visasq.com/introduce-vue-tsc/)
- [Vue3 + TypeScript + Tailwind の環境構築](https://zenn.dev/ymgn____/articles/e7709e88948446)

## 最後に

という形で、昨年に続いて今回も Vue Fes コアスタッフのひとりとして、さまざまなことにチャレンジさせていただいております。

今回、昨年とは違う点を中心に、さわりの部分を解説してきた技術仕様のうち、まだいくつかの課題を抱えたままのものもあるでしょう。

<!--
具体的な話は割愛 mm

`tokens.config.ts` でカラーを定義します。
ここで pinceau の挙動が怪しいのでは、という問題に直面しています。
-->

しかし、その中でも引き続きウェブサイトチームのプロジェクトリードを担当させていただき、初期ローンチを果たしたいま開催のその日まで邁進させていきたいと考えています。

ちなみに、昨年の Vue Fes 2022 の [ふりかえり記事](http://blog.nekohack.me/posts/deep-dive-vuefes-2022) も合わせて再掲しておきます。

http://blog.nekohack.me/posts/deep-dive-vuefes-2022

また今年はこのような知見発信の促進はもちろん、地方の Vue.js コミュニティの再興なども、積極的にやっていけたらと考えています。
