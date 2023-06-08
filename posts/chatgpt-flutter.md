---
layout: Article.tsx
publish_date: 2023-04-21
title: 'ChatGPT (OpenAI) を Flutter チャット上で動かす'
description: 'Flutter × Supabase ハンズオンに伴い、その延長戦の企画として簡単に書かせていただきました。'
slug: chatgpt-flutter
reaction: 🪶
category: Server
tags:
  - OpenAI
  - ChatGPT
  - Flutter
---

Flutter Japan User Group (Osaka) のハンズオンも、かれこれ第 11 弾を迎えました。

![](https://i.imgur.com/WcZuL1D.png)

(ハンズオン開催履歴)

| 作る手段                       | 周辺技術を学ぶ          | アプリ or Web | Flutter バージョン     | 主催                     |
| :----------------------------- | :---------------------- | :------------ | :--------------------- | :----------------------- |
| 辞書アプリを作る               | Firebase                | アプリ        | v1.9.1+hotfix.6-stable | Flutter Japan User Group |
| Instagram のようなアプリを作る | StatefulWidget          | アプリ        | 1.17.2-stable          | Flutter Japan User Group |
| 通話アプリを作る               | WebRTC                  | アプリ        | 1.17.2-stable          | Flutter Japan User Group |
| ポータルサイトを作る           | Atomic Design           | Web           | 1.23.0-18.1.pre-beta   | Flutter Japan User Group |
| 人狼ゲームを作る               | Riverpod                | Web           | 1.26.0-17.6.pre-beta   | Flutter Japan User Group |
| 家計簿アプリを作る             | Riverpod (+ API server) | アプリ        | 2.2.2-stable           | Flutter Japan User Group |
| カレンダーアプリを作る         | Plugins                 | アプリ        | 3.0.0 (特に指定せず)   | Flutter Japan User Group |
| チャットアプリを作る           | Supabase                | アプリ        | 3.7.7 (特に指定せず)   | Flutter Japan User Group |

今回 Supabase の [タイラー](https://twitter.com/dshukertjr)
さんを招聘して、ハンズオン企画第 11 弾を開催させていただきました。

前回のカレンダーアプリ同様、詳細は Zenn book
に書かれていますので、そちらをご確認いただければ。

https://zenn.dev/dshukertjr/books/flutter-supabase-chat

![](https://i.imgur.com/VGwooNe.png)

実際 Flutter アプリで Supabase を使う手順について、チャットのロジック実装と UI
装飾に分けて進めてきました。

タイラーさんの作成したプロジェクトに参加者が乗り込む、という案は私自身考え付きませんでした。

<video controls playsinline width="100%" autoplay loop muted="true" type="video/mp4" src="https://i.imgur.com/lhOwgvI.mp4">
  Sorry, your browser doesn't support embedded videos.
</video>

飲み込みの早さには大変驚かれされます。

その延長戦企画のひとつとして Flutter アプリの Supabase チャットに、いま流行りの
ChatGPT を組み合わせる記事を書かせていただきました。

この記事では、いくつか準備させていただいたチャレンジ課題を解説していきます。

下記マイルストーンに沿って、チャレンジ課題を進めてみましょう。

- 関数 `requestChatGPT()` を作成、ChatGPT の回答を生成する
- 関数 `requestImageGenerate()` を作成、画像を生成する

なお、ChatGPT の API へアクセスする関数は `requestChatGPT()` や
`requestImageGenerate()` とします。

## OpenAI の API 実行環境を整備する

OpenAI を使うために OpenAI Console より OPENAI SECRET
を発行、作成します。実際、その OpenAI Console で作成した OPENAI SECRET を
`OPENAI_API_KEY` に設定します。

```dart
String OPENAI_CHAT_COMPLETIONS_API =
  'https://api.openai.com/v1/chat/completions';
String OPENAI_API_KEY = '';
```

### ChatGPT の回答を生成する

API の詳細は
[Chat completions 公式](https://platform.openai.com/docs/guides/chat/chat-completions-beta)
を確認しながら、その実行を書いてみましょう。

https://platform.openai.com/docs/guides/chat/chat-completions-beta

これより解答例になります。

まずは、関数 `requestChatGPT()` を作成します。

今回 Flutter アプリで呼び出す HTTP クライアントに dio を選定します。

先日メンテ継続不可との記事が投稿されましたが、すぐ CFUG (http://flutter.cn/)
へ移管されています。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The dio package for <a href="https://twitter.com/FlutterDev?ref_src=twsrc%5Etfw">@FlutterDev</a> and <a href="https://twitter.com/dart_lang?ref_src=twsrc%5Etfw">@dart_lang</a> has been transferred to CFUG (<a href="https://t.co/YmZownRg3p">https://t.co/YmZownRg3p</a>) and we&#39;ll soon start to maintain the package again. Sorry for the inconvenience and looking forward to seeing you guys again. We&#39;ll also explore funding for the package.</p>&mdash; Alex Li (@AlexV525) <a href="https://twitter.com/AlexV525/status/1624978831860989952?ref_src=twsrc%5Etfw">February 13, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

(CFUG のことば)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;re thrilled to officially take over the maintenance of the amazing <a href="https://twitter.com/hashtag/dio?src=hash&amp;ref_src=twsrc%5Etfw">#dio</a> package for <a href="https://twitter.com/hashtag/Flutter?src=hash&amp;ref_src=twsrc%5Etfw">#Flutter</a> and <a href="https://twitter.com/hashtag/Dart?src=hash&amp;ref_src=twsrc%5Etfw">#Dart</a> developers. Big thanks to <a href="https://twitter.com/duwen65952787?ref_src=twsrc%5Etfw">@duwen65952787</a> and the dio / diox contributors for their fantastic work. 🚀 <a href="https://twitter.com/hashtag/flutterdev?src=hash&amp;ref_src=twsrc%5Etfw">#flutterdev</a> <a href="https://twitter.com/hashtag/dartlang?src=hash&amp;ref_src=twsrc%5Etfw">#dartlang</a> <br>Read more: <a href="https://t.co/z7hIiOMHd9">https://t.co/z7hIiOMHd9</a></p>&mdash; Flutter China 💙 (@FlutterChina) <a href="https://twitter.com/FlutterChina/status/1625322040252317697?ref_src=twsrc%5Etfw">February 14, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

では、[`dio`](https://pub.dev/packages/dio) をインストールします。

https://pub.dev/packages/dio

```yaml
dependencies:
  flutter:
    sdk: flutter

  dio: ^5.1.1 # 今回は dio をインストールします
  supabase_flutter: ^1.6.0
```

なお、CFUG への移管と時を同じくして、dio は v5 へアップデートされています。

エラーの enum 定義が変更されていたり、地味に変更点が多いので注意したい。

[dio 5.0.0 がリリースされたのでマイグレーションガイドなんかをね](https://blog.dalt.me/3712)

```dart
String OPENAPI_CHAT_COMPLETIONS_API =
  'https://api.openai.com/v1/chat/completions'
String OPENAPI_SECRET = ''

void requestChatGPT(List<Map<String, String>> messages) async {
  Dio dio = Dio();
  dio.options.headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer $OPENAI_API_KEY'
  };

  try {
    Response response = await dio.post(
      OPENAI_CHAT_COMPLETIONS_API,
      data: {
        'model': 'gpt-3.5-turbo',
        'messages': messages,
      },
    );

    String result = response.data['choices'][0]['message']['content'];
    setState(() {
      answer = result;
    });
  } catch (e) {
    String result = e.toString();
    setState(() {
      answer = result;
    });
  }
}
```

状態の変化したことを教えてくれる `setState()` で ChatGPT
のレスポンスを取得します。

そして、そのまま Supabase へその値をデータベースに更新します。

```dart
setState(() {
  answer = result;

  final myUserId = supabase.auth.currentUser!.id;
  sendMessage(myUserId, answer);
});
```

取り急ぎ、Flutter アプリ内で ChatGPT を動かすロジックを作るなら、基本的に OpenAI
の API を実行するだけで ChatGPT からの答えが返ってきます。

回答は
[`ver.2023.2.1-rc.1` branch](https://github.com/jiyuujin/flutter-openai-chat/tree/ver.2023.2.1-rc.1)
をご確認いただければ幸いです。

### UI 仕上げ

自分自身のコメントに限らず ChatGPT
からの答えも、コメントの表示位置を反転させるのが望ましいでしょう。

```dart
// 自分自身のコメントでかつ ChatGPT ではないものに対して表示位置を反転させるよう更新
if (message.isMine && !message.isChatGPT) {
  chatContents = chatContents.reversed.toList();
}
```

Supabase 管理画面上で ChatGPT 用のユーザーを作成します。

あらかじめ ChatGPT 用の UID を記録すると、実際 ChatGPT
かどうかの判別を付けられます。

```dart
String CHATGPT_UID = '';

Message.fromMap({
  required Map<String, dynamic> map,
  required String myUserId,
}) : id = map['id'],
      profileId = map['profile_id'],
      content = map['content'],
      createdAt = DateTime.parse(map['created_at']),
      isMine = myUserId == map['profile_id'],
      isChatGPT = myUserId == CHATGPT_UID;
```

逐一 UID
をチェックいただきつつ、常に会話している感覚を味合わせれば、ユーザー体験として良さそうです。

## 最後に

現時点で個人的にまだ GPT-4 の model
を使えない状態ですが、少なくとも今後当たり前の存在となってくるのは間違い無いでしょう。

(再掲) ざっとソースコードを確認したい方は、下記コミットログをご確認ください。

https://github.com/jiyuujin/flutter-openai-chat/tree/ver.2023.2.1-rc.1
