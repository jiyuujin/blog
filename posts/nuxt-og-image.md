---
layout: Article.tsx
publish_date: 2023-12-07
title: 'OGP 動的画像生成に nuxt-og-image を使う'
description: 'Nuxt で OGP 動的画像生成するならという観点で、モジュール nuxt-og-image を推させていただきます。'
slug: nuxt-og-image
reaction: 🐡
category: Server
tags:
  - Advent-Calendar
  - Nuxt
  - Nuxt3
  - VueFes
---

この記事は jiyuujin Advent Calendar 2023 の 7 日目の記事になります。

https://adventar.org/calendars/9670

Nuxt 3 で動的 OGP 画像を作成する選択肢のひとつに og-image モジュールがあります。

率直に Vue コンポーネントを使用して、独自の `og:image` を作成するというもので、容易にその環境を構築できます。

内部的には [Satori](https://github.com/vercel/satori) が動いており、実際に Tailwind / UnoCSS を使用しつつ、レンダリングしています。また、エッジの動作も保証しており、Vercel Edge、Netlify Edge また Cloudflare Workers などと組み合わせられます。

https://nuxt.com/modules/og-image

Vue Fes Japan 2023 でも来日、一スピーカーとして登壇された [Harlan Wilton 氏](https://twitter.com/harlan_zw) が中心となって、開発が進められています。

Vue Fes 2023 公式 Web サイトでは、静的ビルド (`nuxt generate`) によって、スタティックな HTML を吐き出しています。

### OGP 画像生成の下となるテンプレートを作る

まず、nuxt-og-image を使う前提として `experimental.componentIslands` 機能をオンにする必要があります。

「[コンポーネントアイランド](https://nuxt.com/docs/api/components/nuxt-island)」という概念で、Nuxt 3.1 より使えるようになっています。

https://github.com/nuxt/framework/pull/5689#issuecomment-1316966356

`/components/Og` 配下に OgTemplate.vue を作成します。

コンポーネント名はもちろん、OgTemplate.vue を置くディレクトリ名を含め、個別にカスタマイズできます。

ディレクトリ名のカスタマイズについては、nuxt.config.ts の `ogImage.componentDirs` で、作成したいディレクトリ名として追加してあげましょう。

```ts
export default defineNuxtConfig({
  ogImage: {
    componentDirs: ['og'],
  },
  experimental: {
    componentIslands: true,
  },
})
```

ちなみに Vue Fes 2023 では、全体的に `/components` 配下のディレクトリをドメインごと区切っておりそのすべてが小文字で始まっているため、デフォルトの大文字で始まるディレクトリ名 `/components/Og` には違和感を覚え、カスタマイズすることを選択いたました。

そして、実際に `/components/og` 配下に OgTemplate.vue 作成を進めていきます。

といっても、基本的にはこれまで通りの Vue の書き方を実践いただければ、全く問題ありません。

```vue
<script setup lang="ts">
import { useUserRole } from '~/composables/useUserRole'
import { FormUser, Role } from '~/types/app'
import { linkUrl } from '~/utils/constants'

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  signedUser: {
    type: Object as PropType<FormUser>,
    required: true,
  },
})
const { backgroundColor, textColor } = useUserRole()
</script>

<template>
  <div
    :style="{
      background: `url(${linkUrl}og/og_background.png)`,
      width: '100%',
      paddingTop: '107px',
      textAlign: 'center',
      fontFamily: `'din-2014', '游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', sans-serif`,
    }"
  >
    <div>
      <div
        :style="{
          color: '#fff',
          fontSize: '36px',
          fontWeight: '700',
          justifyContent: 'center',
        }"
      >
        HELLO!! I AM
      </div>
      <div
        :style="{
          margin: '10px auto 0',
          width: '120px',
          height: '120px',
        }"
      >
        <img
          :src="signedUser.avatar_url"
          alt=""
          width="120"
          height="120"
          decoding="async"
          :style="{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            border: '4px solid #fff',
            borderRadius: '50%',
          }"
        />
      </div>
      <div
        :style="{
          color: '#fff',
          fontSize: '48px',
          fontWeight: '900',
          maxHeight: '1.5em',
          justifyContent: 'center',
          margin: '10px 80px 0',
          textShadow: '0px 0px 16px #27384A',
          overflow: 'hidden',
          lineHeight: '150%',
        }"
      >
        {{ signedUser.full_name }}
      </div>
    </div>
    <div
      :style="{
        background: backgroundColor(signedUser.role as Role),
        color: textColor(signedUser.role as Role),
        margin: '10px auto 0',
        justifyContent: 'center',
        padding: '8px 32px',
        borderRadius: '100px',
        fontSize: '36px',
        fontWeight: '700',
        textTransform: 'uppercase',
      }"
    >
      {{ signedUser.role }}
    </div>
  </div>
</template>
```

あと CSS は、Web サイト内で使用されている Pinceau を使わず、ベタ書きで記載することにしました。

おそらく、Pinceau を解釈するランタイムまで (まだ) 対応されていないと考えられるため、無難にベタ書きした方が早いと言う判断から来ています。

また、OGP 画像で特別に使いたいフォントがあれば、それ独自のフォントも nuxt.config.ts の `ogImage.fonts` より設定できるため、その追加したいフォントを追加してあげましょう。

```ts
export default defineNuxtConfig({
  ogImage: {
    fonts: [
      {
        name: 'notosansjp-black',
        weight: 900,
        path: '/fonts/NotoSansJP-Black.ttf',
      },
    ],
  },
})
```

### 静的な情報を扱うページで nuxt-og-image を使う

まず、セッションの詳細ページにおける OGP 画像が生成から。

(Harlan Wilton 氏)

https://vuefes.jp/2023/sessions/harlan-zw

![](https://i.imgur.com/NwmgKnj.png)

セッションの詳細ページでは、Nuxt 3 公式 Hooks [`useHead`](https://nuxt.com/docs/api/composables/use-head) を利用して、Meta タグの生成を目指しました。

`generalOg` という Meta タグの属性を作成するためのユーティリティ関数を、事前に作成しておきます。

作成すると、必要な Page コンポーネントで `useHead` を呼び出していただき、適宜 `generalOg` を読み込んでください。

```ts
const conferenceTitle = 'Vue Fes Japan 2023'
export const linkUrl = 'https://vuefes.jp/2023/'

const generalOg = (oGProp: OGProp = {}): Meta[] => {
  const { description, title, url, image } = oGProp
  return [
    {
      hid: 'description',
      name: 'description',
      content: description ? description : ogDescription,
    },
    {
      hid: 'og:site_name',
      name: 'og:site_name',
      content: title ? title : conferenceTitle,
    },
    {
      hid: 'og:type',
      name: 'og:type',
      content: 'website',
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: description ? description : ogDescription,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: title ? title : conferenceTitle,
    },
    {
      hid: 'og:url',
      name: 'og:url',
      content: url ? url : linkUrl,
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: image ? image : `${linkUrl}og/top.png`,
    },
    {
      hid: 'og:image:secure_url',
      name: 'og:image:secure_url',
      content: image ? image : `${linkUrl}og/top.png`,
    },
  ]
}

useHead({
  titleTemplate: (titleChunk) => `${speakerData.profile.name} | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `${speakerData.profile.name} | ${conferenceTitle}`,
      description: `${speakerData.profile.name} のスピーカー情報を掲載しています。`,
      url: `${linkUrl}sessions/${speakerData.id}`,
    }),
  ],
})
```

### 動的な情報を扱うページで nuxt-og-image を使う

一方、オンラインネームカードに伴う各参加者の詳細ページにおける OGP 画像が生成から。

(jiyuujin 自ら)

https://vuefes.jp/2023/users/e4c8e6e2-d4ee-4f98-bba9-1c08e2f7baae

![](https://i.imgur.com/BVqvFA3.png)

参加者の詳細ページについても同様に [`useHead`](https://nuxt.com/docs/api/composables/use-head) を利用することで Meta タグは生成されますが、内部的には先のスタティックな HTML として吐き出される訳ではありません。

参加者の情報は Supabase のデータベースに保存されており、公式 Web サイトでは非同期で取得しています。それらの情報が動的に取得されている都合上、プレレンダリングした上で OGP 画像を生成することを目指しました。

Nuxt 3 公式より提供されている [Lifecycle Hooks](https://nuxt.com/docs/guide/going-further/hooks) を利用して、事前に Supabase 上の情報取得を目指しました。

では、nuxt.config.ts の `hooks.'nitro:config'` を編集しましょう。

```ts
export default defineNuxtConfig({
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return
      }

      const supabaseUrl = process.env.SUPABASE_URL
      const supabaseKey = process.env.SUPABASE_KEY
      if (!supabaseUrl || !supabaseKey) return

      const client = createClient(supabaseUrl, supabaseKey, {})
      const { data, error } = await client.from('event_users').select()
      if (error) return

      const routes = data?.map((d) => `/users/${d.user_id}`)
      nitroConfig.prerender?.routes?.push(...(routes || []))
    },
  },
})
```

すると、静的ビルド (`nuxt generate`) を経て、各参加者の詳細ページの HTML も吐き出されるようになります。

なお、実際の製作過程において、こちらの静的ビルドを思い切って SSR へ切り替えるなどの方策も考えられました。ですが、大胆な改修も求められるので現実的な方策と考えず、SSR への切り替えを採用することはありませんでした。

初期ローンチの際、合わせて OGP のレンダリングまでちゃんと考慮しつつ、ホスティング先 (今回の Vue Fes 2023 であれば Netlify を使う) とその手法も検討する必要はありましたが、とはいえ SSG で事足りるであろうとたかをくくってしまっていたのは正直なところになります。

### OGP 画面を確認するため Nuxt DevTools を利用する

OGP 画像が生成されているか確認できるようにするため、Nuxt DevTools OG Image Playground を組み合わせることもできます。

https://devtools.nuxt.com/

この OG Image Playground を使うために Nuxt DevTools を構築する必要があります。

Nuxt DevTools をインストールします。

```bash
# npm
npm i -D @nuxt/devtools

# yarn
yarn add -D @nuxt/devtools

# pnpm
pnpm install -D @nuxt/devtools
```

では、nuxt.config.ts の `devtools.enabled` のフラグを `true` に更新しましょう。

```ts
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
})
```

こちらで local の Web サーバが起動した際、該当の画面下に Nuxt DevTools (と、それを開くためのポチ) が目に見えるようになります。

![](https://i.imgur.com/CjcOxfT.png)

もちろん Web ブラウザの Elements ツリーから、直接 Meta タグを確認することもできます。

Vue Fes 2023 における動作確認では基本 Elements ツリーから、直接 Meta タグ並びに OGP 画像を確認いたしました。
