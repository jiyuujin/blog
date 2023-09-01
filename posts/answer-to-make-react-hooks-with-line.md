---
layout: Article.tsx
publish_date: 2023-05-18
title: 'LINE と共に React Hooks をものにする'
description: 'LINE Developer コミュニティで React hooks × LINE Front-end Framework のハンズオンを企画するにあたって、当ブログではその補足を説明させていただきます。'
slug: answer-to-make-react-hooks-with-line
reaction: 🤶
category: Front
tags:
  - React
  - TypeScript
  - FirebaseHosting
  - LIFF
---

この度大好評企画 (?) 第 2 弾として、今年も [LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/) を React 上で動かす Web アプリについて、ハンズオンの企画を進めておりました。

![](https://i.imgur.com/gyRfACU.png)

と言いますのも、この 1 年間に大きな変化がありました。

今年 2023 年 1 月、LINE (Developers Community) さまより LINE API Expert 認定を受けました。

LINE Front-end Framework の提供している LIFF API を中心として、これまで以上に技術知見を発信させていただきます。

:::message .is-primary LIFF アプリを製作する。

目指すゴールはフロントエンドライブラリ [React](https://ja.reactjs.org) でひとつの Web アプリを作ること。[LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/) と [Firebase Authentication](https://firebase.google.com/docs/auth) を合わせアプリ内で LINE 認証を使えるようにします。

LIFF は LINE Front-end Framework の略で [LINE 社](https://linecorp.com/) が提供する Web アプリのプラットフォームです。このプラットフォームで動作する Web アプリを LIFF アプリと呼びます。

| LINE Auth                            | Signed                               |
| :----------------------------------- | :----------------------------------- |
| ![](https://i.imgur.com/1SD6yfH.jpg) | ![](https://i.imgur.com/pqQPnYp.jpg) |

なお、実際の成果物は [Firebase Hosting](https://firebase.google.com/docs/hosting) にデプロイを済ませており、 [Next.js](https://nextjs-liff.web.app/) 並びに [React on Vite](https://vite-react-liff.web.app/) をご確認いただければ幸いです。

:::

企画にあたって利用するフロントエンド・フレームワークは、今回も [Vite](https://github.com/vitejs/vite) を選択します。

![](https://i.imgur.com/1NpQ4Gm.png)

また、今回のターゲットもフロントエンド初学者を想定しています。

目標については昨年の目標に加え、下記の通り新しい目標を設定しました。

- React を触る、JSX (TSX) に慣れる
- カスタムフック化を通して設計の一端を身に付ける -> 今回設けた新しい目標

もはや、単純に Web アプリを製作して済むフェーズではないと判断しました。

ソースコードの実装として 100% の状態にまで持ってくる必要は無いと考えていますが、しかし技術負債にならない程度の最善策のひとつとしてできる限りの設計を押さえておく必要があります。

実際、今回の LINE Front-end Framework へのアクセスを始め、コアとなる設計の考え方はフロントエンド・フレームワークに依存することはありません。

三者三様、フロントエンド・フレームワークを選択するのは自由であるいま、改めてコアの部分を理解することは大変重要と考えています。

## もう少し喋っておきたいこと

先日リリースされた LIFF v2.22.0 のプラガブル SDK についても活用していきましょう。

プラガブル SDK の詳細については、先日の記事を確認してください。

https://blog.nekohack.me/posts/liff-2-22

また、今回 [Zenn book](https://zenn.dev/books) ではチャレンジ企画をご用意しました。

今年 2023 年 3 月に ChatGPT と Whisper モデルの API 利用が開始されました。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">ChatGPT and Whisper are now available through our API (plus developer policy updates). We ❤️ developers: <a href="https://t.co/vpoyxZ7XnD">https://t.co/vpoyxZ7XnD</a></p>&mdash; OpenAI (@OpenAI) <a href="https://twitter.com/OpenAI/status/1630992406542970880?ref_src=twsrc%5Etfw">March 1, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

アプリや製品へ組み込むため、汎用言語モデル ChatGPT と音声認識モデル Whisper の API が使えるようなっています。

これをきっかけに ChatGPT を利活用する事例が続出、おはようエンジニアでも毎週話題になっています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今日から AI 関連の話題を別のドメインに分けました<br>まずはこちらから進めます <a href="https://twitter.com/hashtag/ohayo_engineer?src=hash&amp;ref_src=twsrc%5Etfw">#ohayo_engineer</a> <a href="https://t.co/9wKWTIPYAz">https://t.co/9wKWTIPYAz</a></p>&mdash; おはようエンジニア 🙋‍♀️ (@ohayo_eng) <a href="https://twitter.com/ohayo_eng/status/1641592771294408704?ref_src=twsrc%5Etfw">March 31, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

なお、チャレンジ企画では下記マイルストーンに沿って進めてみましょう。

- `<textarea>` をベースにしたコンポーネントを作成する
- ChatGPT の API 実行できる環境を整備する
  - 環境変数を設定する
  - ChatGPT の API を実行した結果へ反映する
  - `<textarea>` よりユーザーの入力した値を取得、それを受け取る

今後 LIFF アプリを製作する上で、LINE のミニアプリと合わせ ChatGPT を始めとした OpenAI の API を利用するケースが増えるという話があります。

### LINE Developer コミュニティから

今回の教材は [Zenn book](https://zenn.dev/books) を利用しています。

https://zenn.dev/jiyuujin/books/react-hooks-x-liff-more

5 月 17 日当日の動画は、アーカイヴ化されています。

https://www.youtube.com/watch?v=D8GeQyrueEY

<!--
また参加された皆さまには、アンケートにご回答いただければ。

https://docs.google.com/forms/d/e/1FAIpQLSdiP9kc3BkpwVrrV5ieuy8u3TnRXUWPB3VUbGDPYrBkPMaIHA/viewform
-->

## その他

Vite または Next.js 上で動く LIFF アプリをご確認いただければ幸いです。

また Vite 上で React を動作させる [サンプル](https://github.com/jiyuujin/template-vite-react) や、 Next.js 上で React を動作させる [サンプル](https://github.com/nekohack-oss/nextjs) も合わせご確認いただきたい。

- [https://github.com/jiyuujin/vite-react-liff](https://github.com/jiyuujin/vite-react-liff)
- [https://github.com/jiyuujin/nextjs-liff](https://github.com/jiyuujin/nextjs-liff)
- [https://github.com/jiyuujin/template-vite-react](https://github.com/jiyuujin/template-vite-react)
- [https://github.com/nekohack-oss/nextjs](https://github.com/nekohack-oss/nextjs)
