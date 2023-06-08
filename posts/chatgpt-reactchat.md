---
layout: Article.tsx
publish_date: 2023-05-26
title: 'ChatGPT (OpenAI) を React チャット上で動かす'
description: '先日「カスタムフックを作ってみよう」と称したハンズオンを開催させていただいたことに伴い、そのチャレンジ企画として ChatGPT の導入方法について簡単に書かせていただきました。なお、その前提として今回は React チャットに対し、ChatGPT を組み込むことを目指しています。'
slug: chatgpt-reactchat
reaction: 🚣‍♀️
category: Server
tags:
  - OpenAI
  - ChatGPT
  - React
---

React のハンズオン第 1 弾を昨年 3 月、そして第 2
弾を先日開催させていただいたことに伴い Zenn book を執筆させていただきました。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff-more

中でも今回、これまでに React
でカスタムフックを作成する理由、方法について学んできました。

今回、準備したチャレンジ課題を解説していきます。

下記マイルストーンに沿って、チャレンジ課題を進めてみましょう。

- `<textarea>` をベースにしたコンポーネントを作成する
- ChatGPT の API を実行するため、カスタムフック `useChatCompletion()` を作成する
- `<textarea>` よりユーザーの入力した値を取得し、それを受け取って ChatGPT の API
  を実行した結果へ反映する

なお、ChatGPT の API へアクセスするカスタムフックは `useChatCompletion()`
とします。

## `<textarea>` をベースにしたコンポーネントを作成する

まずは `<textarea>` を作成します。

| Standard                             | Focused                              |
| :----------------------------------- | :----------------------------------- |
| ![](https://i.imgur.com/IEPBQWZ.png) | ![](https://i.imgur.com/WJojfua.png) |

`<textarea>` に必要な `ChatInput`
コンポーネントと、送信用ボタンのアイコンを作成する必要があります。

- `ChatInput` コンポーネントを作成する
- 送信用ボタンのアイコンを作成する

#### `ChatInput` コンポーネントを作成する

`ChatInput` コンポーネントとして `src/components/ChatInput.tsx` を作成します。

実際 `ChatInput` コンポーネントにおける props の型定義に HTML 標準の
`HTMLTextAreaElement` を利用します。

```ts
import React, { ChangeEvent, useState } from "react";
import { ReactComponent as Carbon } from "../assets/carbon.svg";

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props;
  const [input, setInput] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value);

  const onClick = () => onSearch(input);

  return (
    <div className="flex gap-1">
      <textarea {...rest} onChange={onChange} rows={rows} />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  );
};
```

このように、コンポーネントにおける Props
の型定義では、既にある型定義を利用していきましょう。

`React.ComponentProps` を利用する方法に焦点を当てた記事があります。

https://blog.nekohack.me/posts/react-componentprops-htmlprops

続いて、スタイルに Tailwind CSS を充てると、下のように書くことが可能となります。

```ts
import React, { ChangeEvent, useState } from "react";
import { ReactComponent as Carbon } from "../assets/carbon.svg";

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props;
  const [input, setInput] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value);

  const onClick = () => onSearch(input);

  return (
    <div className="flex gap-1">
      <textarea
        {...rest}
        onChange={onChange}
        rows={rows}
        className="grid border border-solid border-purple-500 focus:border-purple-700 text-black font-bold relative w-full rounded py-2 px-4"
      />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  );
};
```

#### 送信用ボタンのアイコンを作成する

`<textarea>` の右には、送信用ボタンとして SVG アイコンを使用します。

![](https://i.imgur.com/OCX2gWO.png)

実際 Vite + React 上でこのような SVG
アイコンを使用するため、[`vite-plugin-svgr`](https://www.npmjs.com/package/vite-plugin-svgr)
をインストールする必要があります。

```bash
# pnpm
pnpm install -D vite-plugin-svgr

# npm
npm i -D vite-plugin-svgr

# yarn
yarn add -D vite-plugin-svgr
```

https://www.npmjs.com/package/vite-plugin-svgr

vite.config.js より
[`vite-plugin-svgr`](https://www.npmjs.com/package/vite-plugin-svgr)
を読み込みます。

```js
import svgr from "vite-plugin-svgr";

export default {
  plugins: [
    react(),
    svgr(), // => ここを追加する
  ],
};
```

これをもって SVG アイコンが React
コンポーネントとして読み込まれるようになります。

そして、指定したい箇所に対し `<Carbon />` と書くことで、実際に SVG アイコンが
React コンポーネントとして読み込まれるようになります。

```ts
import { ReactComponent as Carbon } from "../assets/carbon.svg";
```

これより解答例になります。

```ts
import React, { ChangeEvent, useState } from "react";
import { ReactComponent as Carbon } from "../assets/carbon.svg";

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props;
  const [input, setInput] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value);

  const onClick = () => onSearch(input);

  return (
    <div className="flex gap-1">
      <textarea {...rest} onChange={onChange} rows={rows} />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  );
};
```

スタイルに Tailwind CSS を充てると、下のように書けます。

```ts
import React, { ChangeEvent, useState } from "react";
import { ReactComponent as Carbon } from "../assets/carbon.svg";

export type _ChatInputProps = React.HTMLProps<HTMLTextAreaElement>;

export interface ChatInputProps extends _ChatInputProps {
  onSearch: (input: string) => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { rows = 1, onSearch, ...rest } = props;
  const [input, setInput] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.currentTarget.value);

  const onClick = () => onSearch(input);

  return (
    <div className="flex gap-1">
      <textarea
        {...rest}
        onChange={onChange}
        rows={rows}
        className="grid border border-solid border-purple-500 focus:border-purple-700 text-black font-bold relative w-full rounded py-2 px-4"
      />
      <button onClick={onClick}>
        <Carbon />
      </button>
    </div>
  );
};
```

## ChatGPT の API 実行できる環境を整備する

OpenAI を使うために OpenAI Console より OPENAI SECRET を発行、作成します。

### 環境変数を設定する

OpenAI Console で作成した OPENAI SECRET を `VITE_APP_OPENAPI_SECRET`
に設定します。

```.env
VITE_APP_FIREBASE_KEY="YOUR_VITE_APP_FIREBASE_KEY"
VITE_APP_FIREBASE_DOMAIN="YOUR_VITE_APP_FIREBASE_DOMAIN"
VITE_APP_FIREBASE_PROJECT_ID="YOUR_VITE_APP_FIREBASE_PROJECT_ID"
VITE_APP_FIREBASE_APPID="YOUR_VITE_APP_FIREBASE_APPID"
VITE_APP_LIFF_ID="YOUR_VITE_APP_LIFF_ID"
VITE_APP_OPENAPI_SECRET="YOUR_VITE_APP_OPENAPI_SECRET" # => ここを上書きする
```

API の詳細は
[Chat completions 公式](https://platform.openai.com/docs/guides/chat/chat-completions-beta)
を確認しながら、その実行を書いてみましょう。

https://platform.openai.com/docs/guides/chat/chat-completions-beta

これより解答例になります。

### ChatGPT の API を実行した結果へ反映する

まずは、カスタムフック `useChatCompletion()` を作成します。

```ts
const OPENAPI_CHAT_COMPLETIONS_API =
  "https://api.openai.com/v1/chat/completions";
const OPENAPI_SECRET = import.meta.env.VITE_APP_OPENAPI_SECRET;

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export function useChatCompletion() {
  async function chatCompletions(
    messages: Message[],
  ): Promise<Message | undefined> {
    const body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
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

    return data.choices[0].message;
  }

  return { chatCompletions };
}
```

### `<textarea>` よりユーザーの入力した値を取得、それを受け取る

続いてフォーム用に、カスタムフック `useChatForm()` を作成します。

```ts
import { useState } from "react";
import { useChatCompletion } from "./useChatCompletion";

export function useChatForm() {
  const [answer, setAnswer] = useState("");
  const { chatCompletions } = useChatCompletion();

  async function search(input: string) {
    if (!input) {
      alert("Please input something.");
      return;
    }

    const res = await chatCompletions([
      {
        role: "user",
        content: input,
      },
    ]);
    setAnswer(res?.content || "");
  }

  return { answer, search };
}
```

pages コンポーネントの `src/pages/Top.tsx`
より作成したカスタムフックを使用することを目指します。

これは ChatGPT のレスポンスを取得する責務をカスタムフック `useChatCompletion()`
に隠蔽、もうひとつ作成のカスタムフック `useChatForm()`
よりアクセスさせることを狙います。

```ts
const { answer, search } = useChatForm();
```

結果として、関連する責務が `useChatForm()` に隠蔽されるようなっていれば OK。

```ts
export function Top() {
  const { answer, search } = useChatForm();

  return (
    <div>
      <h2>
        {answer}
        <ChatInput onSearch={search} />
      </h2>
    </div>
  );
}
```

回答は
[`ver.2023.2.1` branch](https://github.com/jiyuujin/vite-react-liff/tree/ver.2023.2.1)
をご確認いただければ幸いです。

ざっとソースコードを確認したい方は、下記コミットログをご確認ください。

https://github.com/jiyuujin/vite-react-liff/commit/5d363733cf2e0413bb791109e0434f1624322db3

## 最後に

なおも引き続き、ChatGPT を始めとした AI
関連のニュースや知見が、目まぐるしい量であふれています。

日々、様々な活用事例が誕生し AI
の精度もブラッシュアップされると共に、私たちもそれに合わせて学習することを心がけていきましょう。
