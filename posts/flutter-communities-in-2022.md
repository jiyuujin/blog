---
layout: Article.tsx
publish_date: 2022-12-24
title: 'Flutter コミュニティの 2022 年、FlutterKaigi 2022 ふりかえり'
description: 'この記事は Flutter Advent Calendar 2022 の 24 日目の記事です。今年の Flutter コミュニティを中心に振り返る。'
slug: flutter-communities-in-2022
reaction: 🦌
category: Poem
tags:
  - Review
  - Flutter
  - Advent-Calendar
---

Qiita Advent Calendar に出稿するのも今日が最後、ここに来て箸休めです。

これまでの技術記事はこちらより確認いただけます。

- [Deep Dive into Vue Fes Japan](https://blog.nekohack.me/posts/deep-dive-vuefes-2022)
- [Deep Dive into Rev Up](https://blog.nekohack.me/posts/deep-dive-revup-2022)

今年は 2 つの大きな技術カンファレンスを裏で支援していました。

そのうちのひとつ FlutterKaigi について書きます。

なお、今年は仕事とプライベート双方でお世話になった Vite の知見を発信させていただいた。

## スケールに挑戦の 2022 年だった

まずは、これまでのふりかえりを下に示してみます。

- [Flutter コミュニティの 2021 年](https://blog.nekohack.me/posts/flutter-communities-in-2021)
- [Flutter コミュニティの 2020 年](https://blog.nekohack.me/posts/flutter-communities-in-2020)

中でも一番の飛躍を遂げた 2021 年と違って今年、個人として Flutter コミュニティの大きいニュースは 3 つありました。

- Flutter カンファレンス FlutterKaigi 2022 のオーガナイズとそのスケール
- FlutterKaigi 2022 ウェブサイトへのコントリビュート
- Flutter ハンズオン企画への高い精度

私自身は今年、現地より FlutterKaigi の配信を見守りました。

![](https://i.imgur.com/QFKIMkv.jpg)

中でも FlutterKaigi の運営に携わるスタッフをスケールした経験こそ、一番価値がありました。

2021 年、携わったスタッフ一覧 (計 13 名) を下に示してみます。

![](https://i.imgur.com/9u4ocyw.png)

そして今年 2022 年、携わったスタッフ一覧 (計 23 名) を下に示してみます。

![](https://i.imgur.com/4475MVb.png)

率直に数だけで 2 倍近くの意欲あるスタッフに来ていただきました。

これも 6 月末、スタッフ募集を正式に [告知](https://medium.com/flutterkaigi/flutterkaigi-2022%E3%81%AB%E5%90%91%E3%81%91%E3%81%A6-45323dbbe0fb) させていただいた結果、これほどの方々に来ていただいたお陰となっています。

https://medium.com/flutterkaigi/flutterkaigi-2022%E3%81%AB%E5%90%91%E3%81%91%E3%81%A6-45323dbbe0fb

いま一度このタイミングに、感謝を申し上げます。

### 数字で見る FlutterKaigi 2023

今年の FlutterKaigi 2022 ウェブサイトでは、新たに Google アナリティクス 4 を導入しています。

07 月 19 日 (火) から 11 月 29 日 (火) までのデータを計測しました。

- 訪問者数 4932 名
- 閲覧回数について `page_view` というイベント名を観測したところ 11000 回
- スクロール回数について `scroll` というイベント名を観測したところ 11000 回

https://flutterkaigi.jp/2022

それ以外の具体的な数字については、FlutterKaigi 公式の開催報告をご確認いただければ。

- YouTube 配信情報
- 事前登録(申込)、参加者数
- アンケート
- FlutterKaigi 2022 ウェブサイト閲覧件数

https://medium.com/flutterkaigi/flutterkaigi-2022-%E6%B4%BB%E5%8B%95%E5%A0%B1%E5%91%8A-2750ad4eb19a

#### Flutter for Web で Google アナリティクス 4 を利用する

Google アナリティクス 4 の設定は、至ってシンプルとなります。

ここより先は Web 開発者の一参考資料として、聞いてください。

`web/index.html` に `G-XXXXXXXXXX` を設定します。

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'G-XXXXXXXXXX')
</script>
```

## 2022 年 Flutter 技術動向

FlutterKaigi より大きく話題は変わって、今年のふりかえりでは Flutter の技術動向にも触れていきたい。

主な Flutter SDK の更新を下に示してみました。

- Flutter [2.10](https://medium.com/flutter/whats-new-in-flutter-2-10-5aafb0314b12)
- Flutter [3](https://medium.com/flutter/introducing-flutter-3-5eb69151622f)
- Flutter [3.3](https://medium.com/flutter/whats-new-in-flutter-3-3-893c7b9af1ff)

いつもながら stable バージョンのとびとび感が際立っていますね。

具体的には [2.10](https://medium.com/flutter/whats-new-in-flutter-2-10-5aafb0314b12) の Windows 向けデスクトップアプリ、[3](https://medium.com/flutter/introducing-flutter-3-5eb69151622f) の macOS 並びに Linux 向けデスクトップアプリのサポートがありました。

そんな中今月 8 日、来年 2023 年の中頃にも Dart 3 がリリースされる予定の旨と [アナウンス](https://medium.com/dartlang/the-road-to-dart-3-afdd580fbefa) がなされています。

ざっくり以下項目を挙げており、その詳細は同じく来年 1 月 23 日の Flutter Festival で公表されます。

- 完全な Null-Safety をサポート
- Web Assembly (WASM) のコンパイルをサポート
- Macros ([静的メタプログラミング](https://github.com/dart-lang/language/blob/master/working/macros/feature-specification.md))
- その他
  - コアライブラリ API の削除 ([#49529](https://github.com/dart-lang/sdk/issues/49529))
  - デフォルトパラメータの歴史的な構文の削除 ([#2357](https://github.com/dart-lang/language/issues/2357))
  - 明示的な tear-off の要求 ([#2399](https://github.com/dart-lang/language/issues/2399))

このうち、Dart 2.12 のリリースより 3 年を経て Null-Safety のサポートが完結されると明言したのは大変意義深いでしょう。

実際に静的型付の筆頭 TyoeScript を [例](https://www.typescriptlang.org/play?#code/MYGwhgzhAECyCeAVeAHApgHkQPmgbwChpoA3MEAVzWgC5pEBuI6YAewDsIAXAJwuC6seACgD6ZStTqIAlPi4ALAJYQAdBKrQAvNHHkqDAL4FjBAGYV2ApR2hgAJvYCC7eIqXsA5hgCi2YWA8PGDwdE5BIb7YADTQaCBoALZo7Fx0PnKExMSBwfCqKBQQCsLxSSlcMkymZDykAIx0CMjoGOwUiQBGaHUAPtDtICC4OuxoAO5wSKhowgAsAExVBLWkC9oNTGycrAmqIKyewgAGAMSNDdAq0AAkeCT16vpohrEk69d370+ShscyBAISjM0GEDx+mgAhKMKENMswAPQI6AAETQoEC1AAHnYYOwOABaQbgToJWKdChcaDjajAMDsaDcJRDXEQJSeBnE6CCK5pZjfDTUGFDJjEVY4ujtLo9DbgwUMYjMbYQXZofaHE6nBaSwlcnEqOh3LF-AGmJHQJzQEAqKmsEH49hE2EgaAASVSahWgWgiXgABkbWEIvA2h1ujwRtAANr1WILWKLAC6TAI5qcjjsA2dqgt7HsmYdTulPBzAAUeB4qYpqDw0BBYVxVAQHM5XO4vMJfQHuLFicsWy43MovBgAPKdABW6K4-i7NtiACJEMoYNd8VS0CQUgWwz0F8tlar1UcF6cAMx0a3cK4QGgL2Jz7jLIA) に、そうした Null-Safety の恩恵を開発者が受けられるのは大変幸せになります。

Dart 3 の概要について、Dart 公式 Medium で述べられているので、そちらも合わせてご確認いただきたい。

https://medium.com/dartlang/the-road-to-dart-3-afdd580fbefa

昨年の Google I/O で発表された Material 3 の対応について、Flutter 開発チームで多くのコンポーネントを Flutter へ移行し続けています。

この Material 3 進捗状況は GitHub [issue](https://github.com/flutter/flutter/issues/91605) をご確認いただきたい。

https://github.com/flutter/flutter/issues/91605

### FlutterKaigi 2022 ウェブサイトでは

FlutterKaigi 2022 ウェブサイトでも、いくつかお世話になっています。

- ルーティングで go_router
- 状態管理で riverpod

#### go_router について

昨年の FlutterKaigi 2021 ウェブサイトに引き続き、アプリ内で完結させるためのルーティングを設定できるようにしました。

ただし昨年ほど、そのルーティングを利用するには至っていません。

ちなみに、昨年は以下に示す通りのページを各種準備し、それに伴いルーティングを設定しました。

- トップ
- スタッフ一覧
- 採択セッション一覧
- (厳密に言えばページでは無い) ライセンス
- ティーザー (幕間用)
- インタールード (幕間用)

しかし、今年はトップのみページを準備する仕様となっています。

昨年の FlutterKaigi 2021 ウェブサイトについて、詳細が気になる方は以下の [記事](https://blog.nekohack.me/posts/thanks-to-join-flutterkaigi-2021) をご確認いただきたい。

[FlutterKaigi 2021 お疲れさまでした](https://blog.nekohack.me/posts/thanks-to-join-flutterkaigi-2021)

実際、今年はトップのみページを準備する仕様となっていますが、製作前の設計段階ではルーティングを使用する前提でした。

結果的にルーティングライブラリとして、今回初めてお世話になった [go_router](https://pub.dev/packages/go_router) が一番、使いやすいのでは (と、私感)

というのも、基本的に `path` と `builder` (ページのウィジェットなど) を設定するだけで、アプリケーションのルーティングを管理できます。

```dart
import 'package:go_router/go_router.dart';

final _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (_, __) => const TopPage(),
    ),
  ],
);
```

内部的には ChangeNotifier という [仕組み](https://github.com/flutter/packages/blob/main/packages/go_router/lib/src/router.dart#L46) の下で動いています。

https://github.com/flutter/packages/blob/main/packages/go_router/lib/src/router.dart#L46

ルーティングの変更検知用に、合わせて ChangeNotifierProvider を使用して、その変化に対応することも可能となります。

まず Flutter には、命令型 API (Navigator 1.0)、宣言型 API (Navigator 2.0) 2 種類のルーティングメカニズムが提供されています。

この Navigator 2.0 は少々癖もの (私感) の一方で、Navigator 1.0 と一緒に使用でき、必ずしもそれらを置き換えるものでもありません。

#### riverpod について

今年の FlutterKaigi 2022 ウェブサイトでは、状態管理ツールとして riverpod も合わせて使用しています。

基本的には、main.dart などの最上位ルートへ `ProviderScope` を利用することで、全ての Provider が global に宣言されるようなります。

```dart
void main() {
  runApp(ProviderScope(
    child: MyApp(),
  ));
}
```

Provider で go_router を囲んで参照できるようにします。

```dart
import 'package:confwebsite2022/pages/index.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final routerProvider = Provider(
  (ref) => GoRouter(
    debugLogDiagnostics: true,
    routes: [
      GoRoute(
        path: '/',
        builder: (_, __) => const TopPage(),
      ),
    ],
    errorPageBuilder: (context, state) => MaterialPage(
      key: state.pageKey,
      child: Scaffold(
        body: Center(
          child: Text(state.error.toString()),
        ),
      ),
    ),
  ),
);
```

そんな Riverpod も、フロントエンドビルドツールのひとつ [Vite](https://ja.vitejs.dev/) と同じく、リリースサイクルは長くありません。

いつの間にか Riverpod が v1 さらに v2 へ、テンポよく更新されており、中でも v2 のリリースが、今年 2022 年の大きな目玉のひとつとなります。

では、早速 pubspec.yaml の [flutter_riverpod](https://pub.dev/packages/flutter_riverpod) を 2 系に更新します。

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.0.2
```

そもそも Riverpod が求められる場面でそれが必要とされる理由については、[Provider](https://pub.dev/packages/provider) パッケージの欠点があります。

Provider の設計上、改良した [InheritedWidget](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html) に原因があり、それが起因して ウィジェット ツリーに依存するという悪循環を引き起こしています。

```
🗂 MyApp
   └ 🗂 Provider
      └ 🗂 MaterialApp
         └ 🗂 Widget
            └ 🗂 SignIn <- Provider をラップしない場合に ProviderNotFoundException を引き起こす
            └ 🗂 Provider
               - Signed
```

上に示したウィジェットツリーのようにウィジェットを Provider でラップしていない限り、ProviderNotFoundException を引き起こしてしまいます。

この問題を解決するため登場したのが Riverpod で、全ての Provider が global に宣言されます。

では、その Riverpod についてマイグレーションガイドを中心に確認します。

まず Riverpod 0.14 を 1.0 へ更新する際に、Provider を利用する構文に変更があります。

```dart
// Riverpod 0.14
Widget build(BuildContext context, ScopedReader watch) {
  MyModel state = watch(provider);
}
```

`ref.watch(provider)` のひとつに統一されました。

```dart
// Riverpod 1.0
Widget build(BuildContext context, WidgetRef ref) {
  MyModel state = ref.watch(provider);
}
```

また ConsumerWidget の `build` と、Consumer の `builder` のシグネチャも変更されました。

続いて Riverpod 2.0 へ更新する際は、新しく [riverpod_generator](https://pub.dev/packages/riverpod_generator) パッケージが公開されています。

riverpod_generator の `@riverpod` は、ソースコード内のクラスとメソッドの Provider を自動的に生成するために使用できる注釈 API となります。

### Web の書き心地を実感する

当初 url_launcher の `launch()` を利用した際に、Web ブラウザ上でそのリンクを確認できません。

永らく FlutterKaigi のウェブサイトにおいては、この手の Web 体験が損なわれてしまっていました。

```dart
import 'package:url_launcher/url_launcher.dart';

ElevatedButton.icon(
  onPressed: () async => {
    await launch(
      'https://twitter.com/intent/tweet?hashtags=FlutterKaigi',
      webOnlyWindowName: '_blank',
    );
  },
  style: ElevatedButton.styleFrom(
    shape: const StadiumBorder(),
  ),
  icon: SvgPicture.asset(Assets.twitterWhite, width: 20),
  label: Text(appLocalizations.tweet),
),
```

一般的な Web サイトのように、マウスオーバーすることで、ユーザーにアンカーリンクを示すことにします。

url_launcher の `Link` ウィジェットを利用することで、それを実現させられるようになります。

```dart
import 'package:url_launcher/link.dart';

Link(
  uri: Uri.parse(
    'https://twitter.com/intent/tweet?hashtags=FlutterKaigi'),
  target: LinkTarget.blank,
  builder: (BuildContext ctx, FollowLink? openLink) {
    return ElevatedButton.icon(
      onPressed: openLink,
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(),
      ),
      icon: SvgPicture.asset(Assets.twitterWhite, width: 20),
      label: Text(appLocalizations.tweet),
    );
  },
),
```

`target` に `LinkTarget.blank` を指定することで、独立のブラウザとして指定のリンクが開かれます。

#### さらに Web 体験を向上させる努力を惜しまない

一般的な Web サイトでは当たり前のように、ハッシュ (`#`) 付き URL を実装できます。

しかし Flutter (Web) では、その実装が大変難しいと判明、他の方法を模索します。

そこで [`Scrollable.ensureVisible`](https://api.flutter.dev/flutter/widgets/Scrollable/ensureVisible.html) を利用すれば、特定の ID に対し自動でスクロールさせることができるようになりました。

```dart
Future<void> animationScroll(Object anchor) async {
  final context = GlobalObjectKey(anchor).currentContext;
  if (context == null) {
    throw ErrorDescription(
        "An unregistered object was passed in animationScroll.\nYou should register GlobalObjectKey for some widget.");
  }
  await Scrollable.ensureVisible(context,
      duration: const Duration(milliseconds: 1000),
      curve: Curves.fastOutSlowIn);
}
```

実装予定だった、ハッシュ付き URL の ID を引数のひとつとして受け入れます。

あらかじめ、この ID 一覧を enum で定義することとします。

```dart
enum MenuItem { staff, timetable, sponsor }
```

`animationScroll()` に個別の ID を受け入れることで、自動スクロールを実現しています。

```dart
String urlString;
switch (result) {
  case MenuItem.staff:
    await animationScroll(MenuItem.staff);
    return;
  case MenuItem.timetable:
    await animationScroll(MenuItem.timetable);
    return;
  case MenuItem.sponsor:
    await animationScroll(MenuItem.sponsor);
    return;
}
```

一般的な Web サイトのような体験は難しい (実現できるといえば) が、それに近付ける努力を惜しみません。

<video controls playsinline width="100%" autoplay loop muted="true" type="video/mp4" src="https://i.imgur.com/bQ6tvWK.mp4">
  Sorry, your browser doesn't support embedded videos.
</video>

## 最後に

Flutter コミュニティに限らず、来年 2023 年も「挑戦」の姿勢を忘れること無く、コミュニティの運営を邁進していければ幸いです。
