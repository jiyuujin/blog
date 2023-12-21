---
layout: Article.tsx
publish_date: 2023-12-21
title: 'Newt の FormApp を利用して、問い合わせフォームを作成する'
description: 'Vue Fes 2023 では、問い合わせフォームとそれを管理する方法として Newt の FormApp を取り入れさせていただいたので、その使用感をば。'
slug: newt-formapp
reaction: ☎️
category: Front
tags:
  - Advent-Calendar
  - Newt
  - VueFes
---

この記事は jiyuujin Advent Calendar 2023 の 21 日目の記事になります。

https://adventar.org/calendars/9670

ヘッドレス CMS として提供されていた Newt より、新しい問い合わせ管理ツールとして [FormApp](https://www.newt.so/form-app) が発表されました。

https://x.com/newt_cms/status/1598113633124634624?s=20

そこで Vue Fes 2023 では、昨年 Newt の CMS を使っていたご縁より引き続き、この FormApp を利用させていただくことになりました。

https://vuefes.jp/2023/#form

Vue Fes 2023 では、以下内容を集めました。

- お名前
- メールアドレス
- お問い合わせ内容

それぞれ `<input>` タグの `name` より判断、その name 属性から個々のデータを取得して Newt 向けに送信しています。

そして、その送信された情報は Newt 管理画面より確認できるようになっており、その通知を受け取るためのメールアドレスも複数、指定可能となっています。

現時点では、Slack の特定チャンネルに、そうした通知を送信できないようですが。ひょっとすると今後、それが実現される可能性もあるので、こればかりは公式の連絡を待ちましょう。

## FormApp プロジェクトを作成する

導入自体、とてもシンプルに進められます。

Newt 管理画面より、新しいプロジェクトを作成しましょう。

プロジェクトを作成した後、下記 UID 2 点を手元にて記録してください。

- プロジェクト SPACE 用の UID
- FormApp 用のUID

それぞれの UID を組み合わせて、エンドポイントが完成します。

```ts
const endpoint = `https://${config.public.newtSpaceUid}.form.newt.so/v1/${config.public.newtFormUid}`
```

完成したエンドポイント `endpoint` を下に送信してみましょう。

```ts
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
  .then(() => {
    // 送信に成功した場合
  })
  .catch((err) => {
    // 送信に失敗した場合
    console.error(err)
  })
```

実際 `fetch` を利用して、そのエンドポイントに送信するだけとなります。

以下 [useForm.ts](https://github.com/vuejs-jp/vuefes-2023/blob/main/app/composables/useForm.ts) に FormApp へ送信するロジックをまとめました。

https://github.com/vuejs-jp/vuefes-2023/blob/main/app/composables/useForm.ts

Vue 3 系の特徴として、カスタムフックへのドメイン隠蔽が Vue 2 系と比較しても進めやすくなっています。

このカスタムフックを Vue 以外 React や Svelte のプロジェクトでも気軽に使いやすくなっており、是非とも参考になればと考えております。

では、Vue コンポーネント側で、この useForm.ts をどう使っているのか。

```vue
<script lang="ts" setup>
const { name, nameError, validateName } = useForm()

const updateName = (value: string) => {
  name.value = value
}
</script>

<template>
  <InputField
    id="name"
    name="name"
    :title-label="$t('top.contact_form_name_label')"
    :placeholder="$t('top.contact_form_name_placeholder')"
    required
    :error="nameError"
    @input="updateName"
    @blur="validateName"
  />
</template>
```

実際、この useForm.ts にフォーム周りのドメインを隠蔽させた上で、必要に応じて呼び出してあげています。

https://github.com/vuejs-jp/vuefes-2023/blob/main/app/components/FormPageSection.vue

### reCAPTCHA v3 を埋め込む

問い合わせフォームの送信時に Google reCAPTCHA v3 を埋め込むことも可能となります。

一目置かれる存在として、その問い合わせを担当する入力フォームにおいて、スパムなどの不審なリクエストへ対策する必要があります。

なお、Nuxt (Vue) のプロジェクトでは、プラグイン vue-recaptcha-v3 を利用させてもらえそうに考えています。

https://github.com/AurityLab/vue-recaptcha-v3

事前に GCP 管理画面より、reCAPTCHA キーを手元にて記録してください。

キーを記録した後に、フロントエンドでその設定を読み込みます。

```ts
import { VueReCaptcha } from 'vue-recaptcha-v3'

const { vueApp } = useNuxtApp()
const config = useRuntimeConfig()
vueApp.use(VueReCaptcha, {
  siteKey: config.public.reCaptchaWebsiteKey,
  loaderOptions: {
    renderParameters: {
      hl: 'ja',
    },
  },
})
```

送信時に reCaptcha の読込を実行します。

```ts
import { useReCaptcha } from 'vue-recaptcha-v3'

const reCaptchaInstance = useReCaptcha()

await reCaptchaInstance?.recaptchaLoaded()
await reCaptchaInstance?.executeRecaptcha('submit')
```

https://github.com/vuejs-jp/vuefes-2023/blob/main/app/composables/useFormReCaptcha.ts

## 余談

Vue Fes 2023 にて設計・実装を進めた当時こそ、テンプレートやそれにまつわる記事も書かれておりませんでしたが、いま始めるなら Newt 公式よりブログが書かれており、これらも合わせてご確認いただけますと。

(Nuxt 3 で FormApp を使おう編)

https://www.newt.so/docs/tutorials/contact-form-in-nuxt

(Nuxt 3 で CMS を使おう編)

https://www.newt.so/docs/tutorials/get-contents-in-nuxt
