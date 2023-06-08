---
layout: Article.tsx
publish_date: 2023-03-06
title: 'ChatGPT (OpenAI) を AWS Lambda / Slack 上で動かす'
description: 'ChatGPT (OpenAI) の API 利用開始に伴い、その導入方法について簡単に書かせていただきました。なお、その前提として今回は個人 Slack に対し、ChatGPT を組み込むことを目指しています。'
slug: chatgpt-slack
reaction: 🤖
category: Server
tags:
  - OpenAI
  - ChatGPT
  - AWS
  - AWSLambda
---

最近話題になっている ChatGPT を触れさせていただきました。先日 3 月 2 日 OpenAI
から、汎用言語モデル ChatGPT と音声認識モデル Whisper の API が発表されました。

実際にこの発表をもって、アプリや製品へ ChatGPT
を組み込むことが実現可能になっています。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">ChatGPT and Whisper are now available through our API (plus developer policy updates). We ❤️ developers: <a href="https://t.co/vpoyxZ7XnD">https://t.co/vpoyxZ7XnD</a></p>&mdash; OpenAI (@OpenAI) <a href="https://twitter.com/OpenAI/status/1630992406542970880?ref_src=twsrc%5Etfw">March 1, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## CLI を試す

まず OpenAI のアカウントを登録、secret キーを作成してください。

作成した secret キーを `<OPENAPI_SECRET>` に設定、curl コマンドで API
を実行してください。

```bash
curl https://api.openai.com/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <OPENAPI_SECRET>' \
  -d '{
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": "Hello!"}]
}'
```

ChatGPT より、ちゃんと返答されてきたら OK。

```bash
{
  "id": "<CHATCMPL_ID>",
  "object": "chat.completion",
  "created": 1677905078,
  "model": "gpt-3.5-turbo-0301",
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  },
  "choices": [{
    "message": {
      "role": "assistant",
      "content":"\n\nHello there! How can I assist you today?"
    },
    "finish_reason": "stop",
    "index": 0
  }]
}
```

## Chat completions を試す

CLI で ChatGPT の挙動を確認できたら、実際にアプリケーションへ ChatGPT
を組み込んでいきましょう。

そこで、手元の環境より Chat completions の API を実行していくこととなります。

この実行に必要なリクエストパラメータは以下の通りとなります。

- 言語モデル
- 入力する文字列

今回使用する言語モデルは `gpt-3.5-turbo` となります。なお、昨年 2022
年の暮れに最新だった言語モデルは `text-davinci-003` となります。

言語モデル `text-davinci-003` を使用する際、リクエストパラメータに `prompt`
を設定します。

```js
const body = JSON.stringify({
  model: "text-davinci-003",
  prompt: "日本の首都って何だっけ？",
});
```

### gpt-3.5-turbo

この `text-davinci-003` を比較すると、リクエストパラメータに `role`
が追加されました。

OpenAI 公式によると、この `role` は system、user、assistant
のいずれかが入ります。

```js
const body = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "日本の首都って何だっけ？",
    },
  ],
});
```

それぞれの概要については下に示す通りとなります。

- system: ChatGPT にどんな対応をしてほしいか、設定を記載する
- user: ユーザーが入力する
- assistant: ChatGPT が返答する

### Chat completions を実行する

リクエストパラメータが揃えば、Chat completions を実行する準備が整います。

その際、先に作成した OpenAI の secret キーを読み込みます。

```js
import fetch from "node-fetch";

const OPENAPI_CHAT_COMPLETIONS_API =
  "https://api.openai.com/v1/chat/completions";
const OPENAPI_SECRET = "";

const body = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "日本の首都って何だっけ？",
    },
  ],
});

const res = await fetch(OPENAPI_CHAT_COMPLETIONS_API, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAPI_SECRET}`,
  },
  body,
});
const data = await res.json();
console.log("🚀 ~ file: openai-lambda.md:76 ~ data:", data);
```

API の詳細は
[Chat completions 公式](https://platform.openai.com/docs/guides/chat/chat-completions-beta)
を確認いただければ幸いです。

https://platform.openai.com/docs/guides/chat/chat-completions-beta

## 作成のエンドポイントを AWS Lambda で実行する

今回は Slack の Slash Command より ChatGPT を使用できることを目指します。

まずは [Slack Apps](https://api.slack.com/apps) より Slash Command
を作成します。コマンド名はもちろん、デプロイ済のエンドポイント URI
を設定することで、新しい Slash Command を作成できます。

```js
import { APIGatewayProxyHandler } from 'aws-lambda'
import queryString from 'query-string'

export const hello: APIGatewayProxyHandler = async (event) => {
  const reqBody = queryString.parse(event.body)
  console.log(
    '🚀 ~ file: openai-lambda.md:145 ~ consthello:APIGatewayProxyHandler= ~ reqBody.text:',
    reqBody.text,
  )
}
```

作成した Slash Command でコマンドといっしょに入力された値を AWS Lambda
側で受け取るため、そのリクエストパラメータより受け取ります。そして、ChatGPT
に解析して欲しい入力値として `messages.content` へ設定します。

```js
import { APIGatewayProxyHandler } from 'aws-lambda'
import queryString from 'query-string'
import fetch from 'node-fetch'

const OPENAPI_CHAT_COMPLETIONS_API = 'https://api.openai.com/v1/chat/completions'
const OPENAPI_SECRET = ''

export const hello: APIGatewayProxyHandler = async (event) => {
  const reqBody = queryString.parse(event.body)

  const body = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: reqBody.text,
      },
    ],
  })

  const res = await fetch(OPENAPI_CHAT_COMPLETIONS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAPI_SECRET}`,
    },
    body,
  })
  const data = await res.json()
}
```

TypeScript のコンパイルは ESBuild を採用、専用の Serverless
プラグインがあり、それを利用させていただきしました。

一応、ソースコードを一般向けに公開する形で、リポジトリを下に置いておきます。

https://github.com/jiyuujin/openai-slack

もちろん AWS Lambda は従量課金になります、破産しない程度で ChatGPT
を使っていきましょう。

## 最後に

ChatGPT を始めとした AI
関連のニュースや知見は、日々目まぐるしい量であふれています。主に
[おはようエンジニア](https://ohayo.nekohack.me/)
でも扱っている、はてぶなどでホットエントリー入りしたものだけでも、かなり多くの知見があふれていました。

- [AI 以外](https://ohayo-friday.nekohack.me/)
- [AI 特化](https://ohayo-ai.nekohack.me/)

今回は秘匿情報をほとんど扱っていない個人 Slack に対して、ChatGPT
を使えるようにしました。

なお、今後広い一般社会ではこの手のような ChatGPT
を活用した新たなサービスが多く出てくることは、必然となります。

日々こうした ChatGPT の活用事例が誕生し AI
の精度もブラッシュアップされると共に、これまでの常識が全く違うものとして世間に生まれていくことでしょう。
