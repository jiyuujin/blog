---
layout: Article.tsx
publish_date: 2024-12-07
title: 'Vue Fes Japan 2024 シェア URL の裏側で Supabase Edge Function は動いていた'
description: '一昨年、昨年に続いて Web サイトの技術をリードさせてもらっていた Vue Fes Japan 2024 では一般参加者に対し、シェア URL 機能を提供しました。その裏側でOGP ヘッダー画像に Supabase Edge Function が一役を買った話に触れさせていただきます。'
slug: supabase-edge-function
reaction: 🎄
category: Server
tags:
  - Supabase
  - PostgreSQL
  - VueFes
  - React
---

:::message

今回は、Vue Fes Japan 2024 で提供されているシェア URL の裏側で、Supabase Edge Function が一役を買っていた話をさせていただきます。

:::

今回捕捉するのは、下記 3 点の中で 2 点目を取り上げます。

- Supabase の DB 設計
- Edge Function の使いどころ
- オンラインネームカード製作・運営の裏側

なんと言っても、昨年以上に今年は Supabase のデータベースをふんだんに使わせてもらいました。

このデータベースをふんだんに使わせてもらったということが、良い意味で Supabase Edge Function との親和性をも高めることができました。

なお、Supabase の具体的な使用状況やシェア URL の仕様詳細については、Vue Fes Japan 2024 開催直前に書いた記事で少し触れさせてもらっているので、そちらをご確認いただきたいと考えています。

https://zenn.dev/comm_vue_nuxt/articles/deep-dive-vuefes-2024-waiwai?redirected=1

## Edge Function の使いどころ

各スピーカー、スポンサー、スタッフを対象に提供されているシェア URL では、OGP 画像が生成されています。

このシェア URL を集めたリンク集は、下記 [シェア URL 集](https://vuefes.jp/2024/sharemap) より確認できます。

https://vuefes.jp/2024/sharemap

実際、シェア URL は Supabase Edge Function の下で動いています。

そもそも、この Supabase Edge Function では、ランタイム Deno 上で実装され、実行されることを目指しています。

> Deno is currently the only open-source JavaScript runtime optimized to run on the edge. This was a key factor in our decision to go with Deno.
>
> (意訳)
> Deno は現在、エッジで実行するように最適化された唯一のオープンソース JavaScript ランタイムです。これが、Deno を選択する決定の重要な要因でした。

https://github.com/orgs/supabase/discussions/7742#discussioncomment-3791678

`supabase functions new` コマンドを使って、新しい Edge Function `hello-world` が作成されます。

```bash
supabase functions new hello-world
```

`hello-world` の下に、エントリーファイル index.ts が作成されました。

```tsx
Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

Deno プロジェクトで、パッケージのパスを解決する手段は、下に示す 4 点が挙げられます。

- 直接 URL を書く
- deps.ts から Named Export を行う
- import_map.json で key にモジュール名を、その value に URL を書く
- 色々廻ってきた結果原点回帰として、これまで私たちが使ってきた npm と同じような形で、package.json のお世話になる

:::details 紹介されていたフォルダ構成

import_map.json で key にモジュール名を、その value に URL を書くことで、パッケージのパスを解決しています。

```
🗂 supabase
  └ 🗂 functions
    ├ import_map.json # A top-level import map to use across functions
    ├ 🗂 _shared
         ├── supabaseAdmin.ts # Supabase client with SERVICE_ROLE key
         ├── supabaseClient.ts # Supabase client with ANON key
         └── cors.ts # Reusable CORS headers
    ├ 🗂 function-one # Use hyphens to name functions
         └── index.ts
    ├ 🗂 function-two
         └── index.ts
    └ 🗂 tests
      └── function-one-test.ts
      └── function-two-test.ts
├ 🗂 migrations
└ config.toml
```

なお、Supabase 公式の [Local development](https://supabase.com/docs/guides/functions/local-development) の中でも、import_map.json でパッケージのパスを解決する方法が紹介されていました。

https://supabase.com/docs/guides/functions/local-development

:::

今回、Vue Fes Japan 2024 では、直接 URL を書く方法で、パッケージのパスを解決しています。

```tsx
import React from 'https://esm.sh/react@18.2.0'
```

あとは、良き形で画像を返すような関数を作成するのを目指します。

- 生成した画像を ImageResponse として返す
- 画像内で使用するフォントを Supabase Storage に置く

```tsx
import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.6/mod.ts'

const FONT_URL = '<フォントのファイルの参照先リンク>'
const font = fetch(new URL(FONT_URL, import.meta.url)).then((res) => res.arrayBuffer())

export default async function handler(req: Request) {
  const fontData = await font

  return new ImageResponse(
    <div>
      {/* 画像 */}
    </div>
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'noto-sans-cjk-jp',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}
```

データベースのテーブル設計に関係なく、原則として主キーの `id` とその所属している model (テーブル) 名が分かれば、取得したい情報を特定することができます。

- スタッフの model `staff` が関数に渡れば、staffs テーブルから取得したいスタッフ情報を特定する
- スポンサーの model `sponsor` が関数に渡れば、sponsors テーブルから取得したいスポンサー情報を特定する
- スピーカー、パネラーの model `speaker` が関数に渡れば、speakers テーブルから取得したいスピーカー、パネラー情報を特定する
- ネームカードの model `attendee` が関数に渡れば、attendees テーブルから取得したい参加者情報を特定する

```tsx
import React from 'https://esm.sh/react@18.2.0'
import { createClient } from 'jsr:@supabase/supabase-js@2'

export default async function handler(req: Request) {
  const params = new URLSearchParams(req.url.split('?')[1])

  const id = params.get('id') ?? ''
  const page = params.get('page') ?? ''

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { data, error } = await supabaseClient.from(page === 'namecard' ? 'attendees' : `${page}s`)
    .select()
    .eq(page === 'namecard' ? 'user_id' : 'id', id)
  if (error) throw error
}
```

:::details Bun における nuxt-og-image の挙動について。

率直に Bun で nuxt-og-image の v3 が動きませんでした (2024 年 8 月当時)

nuxt-og-image v3 正式版がリリースされている一方で、GitHub issue で関連する事象も作成されていましたが、今後修正の入る可能性があります。

https://github.com/nuxt-modules/og-image/issues/112

:::

## 最後に

というわけで、一昨年、昨年に続いて今回も Vue Fes コアスタッフのひとりとして、ふりきって Supabase のお世話になったことを書かせていただいておりました。

先日の Launch Week の発表では、Edge Function を含むポイントについて更新されています。

- WebSocket のサポート
- `temp` ディレクトリで、一時的にファイルを保存、各種処理を実行する
- バックグラウンドで動作するタスクに対するサポートで、レスポンスを送信した後に、重いタスクの処理を実行する
- Cron スケジューラの発表

中でも WebSocket のサポートをきっかけに、OpenAI Realtime API と合わせることでボイスチャットアプリも作成できるようになります。

(ボイスチャットアプリのサンプル動画)

https://x.com/thorwebdev/status/1863961423183032340

改めて、Supabase でも AI の暗躍することになり、ほんとうにその存在感には驚かされます。

https://supabase.com/blog/supabase-ai-assistant-v2

(AI アシスタント v2 の URL)

https://supabase.com/assistant?ref=producthunt
