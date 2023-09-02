---
layout: Article.tsx
publish_date: 2023-09-02
title: 'Google I/O 2023、Microsoft Build 2023 と WWDC 2023 についてまとめました'
description: '今年の Google I/O、Microsoft Build と WWDC の Recap と称して、技術ネタをざっくりまとめさせていただきました。'
slug: pwanight-52-temp
reaction: 🎨
category: Poem
tags:
  - GoogleIO
  - MicrosoftBuild
  - WWDC
---

昨年同様 PWA Night で、先日行われた Google I/O 2023 と WWDC 2023 の Recap
と称して登壇させていただく方向で考えていましたが、様々な諸都合により執筆だけに限らせていただいております。

## 簡潔なまとめ

私の肩書き上 Web エンジニアとアプリエンジニアを名乗っていることで、やや Web
とモバイルに偏重気味になっている点はお許しください。

- ある程度は想定していたものの AI 一色という、気合を感じた
  - Apple は Apple らしく、そこまで AI を連呼していなかった
- モバイル界隈では Dart 3 のリリース
- 手堅い Web の進化

中でも Google や Microsoft、Apple 各社のエコシステムに AI
が注入される話題ばかりと、たいへん大きな話題が多いよう考えています。

今後それ関連の話題が世間を賑わすものと考えると、さぞかし夢も広がるでしょう。

### AI 界隈

各社 AI の動きを見ていきます。

- Google (PaLM 2, etc)
- Microsoft (Windows Copilot, Microsoft 365 Copilot, etc)
- Apple (ML for Keyboard, private LLM)

#### Google

![](https://i.imgur.com/lNUlX1s.png)

PaLM 2 が発表されました。また AI Responsibility (責任ある AI) を実現するため、ウォーターマーキングとメタデータへの注力も表明。

- [PaLM 2 のご紹介](https://japan.googleblog.com/2023/05/palm-2.html)
- [PaLM 2 の技術レポート](https://ai.google/static/documents/palm2techreport.pdf)

Android Studio Bot で、チャットボットが変更のコードを作成してくれる機能が発表されました。

さらに Google 検索に生成 AI、Google Cloud のシステム開発に何でも AI が教えてくれる Duet AI という計画も発表されました。

[Introducing Duet AI for Google Cloud – an AI-powered collaborator](https://cloud.google.com/blog/products/application-modernization/introducing-duet-ai-for-google-cloud?hl=en)

#### Microsoft

![](https://i.imgur.com/H3rNhYC.jpg)

Windows Copilot や Microsoft 365 Copilot への AI 搭載が発表されました。また ChatGPT と Copilot 間のプラグイン共通化も発表されています。

- [Windows 365 Boot: deploy the public preview today!](https://techcommunity.microsoft.com/t5/windows-it-pro-blog/windows-365-boot-deploy-the-public-preview-today/ba-p/3827937)
- [Microsoft outlines framework for building AI apps and copilots; expands AI plugin ecosystem](https://news.microsoft.com/source/features/ai/microsoft-outlines-framework-for-building-ai-apps-and-copilots-expands-ai-plugin-ecosystem/)

さらに bing 検索の機能強化策をはじめ Azure AI という、より効果的に Azure OpenAI Service と組み合わせられる Azure AI Studio の計画も発表されました。

- [Bing at Microsoft Build 2023: Continuing the Transformation of Search](https://blogs.bing.com/search/may_2023/Bing-at-Microsoft-Build-2023)
- [Build next-generation, AI-powered applications on Microsoft Azure](https://azure.microsoft.com/en-us/blog/build-next-generation-ai-powered-applications-on-microsoft-azure/)

#### Apple

![](https://i.imgur.com/hLPZyB6.jpg)

なんと言っても AR ヘッドセット [Apple Vision Pro](https://www.apple.com/apple-vision-pro/) が発表されました。

https://www.apple.com/newsroom/2023/06/introducing-apple-vision-pro/

visionOS の [準備](https://developer.apple.com/visionos/prepare/) を読み解いてみると Metal シェーダが SwiftUI でサポートされたことに伴い、エフェクトの効いた UI が Swift で製作できるようになっています。

Apple らしく、大々的に AI の発表があった訳ではありませんが、iOS 17 でリリースされる予定の Autocorrect (キーボードにおける機械学習) に LLM が活用されているとのこと。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If it’s not clear yet, this is what I think will happen soon. <br><br>Every major tech company except Apple has announced their own LLM. <br><br>Apple have spent years perfecting their on-device neural engine. Capable of some absolute insane operations. Loads of compute in a small and energy…</p>&mdash; Linus (●ᴗ●) (@LinusEkenstam) <a href="https://twitter.com/LinusEkenstam/status/1638999208911949845?ref_src=twsrc%5Etfw">March 23, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Web 界隈

- 今年も強い Web の実現に向けて Google の手堅い動きがあった
- 引き続き Apple の Web に対する気合を感じた

JavaScript フレームワークにおける Firebase
ホスティングのサポート拡大や、TensorFlow
エコシステムの機能強化をはじめ、多くの事柄が発表されました。

中でも下に示す 3 つの大項目に注目したいと考えています。

- Core Web Vitals (CWV) 指標改善
- Baseline 枠組創設
- 個別の Web ブラウザ (Safari)
  - SafariViewController より PWA の注入
  - その他
    - `<model>` タグ
    - `<select>` タグ内に `<hr />`
    - Popover API
    - HTTP Early Hints 対応
    - HEIC / HEIF 画像形式
    - WebGL オフスクリーンキャンバスの 3D 対応

CWV における FID の INP 置き換えが発表されました。

[Google will replace FID with INP as Core Web Vitals metric](https://searchengineland.com/google-replace-fid-inp-core-web-vitals-414546)

また Baseline という枠組の下で Web の改善が進められことも、今年の Google I/O
ならではとなります。

[Introducing Baseline](https://web.dev/introducing-baseline/)

### モバイル界隈

なんといっても、前から言われていた Dart 3 (Flutter 3.10)
のリリースは大変話題になっています。

- [Announcing Dart 3](https://medium.com/dartlang/announcing-dart-3-53f065a10635)
- [What’s new in Flutter 3.10](https://medium.com/flutter/whats-new-in-flutter-3-10-b21db2c38c73)

ちなみに、一昨年リリースの Flutter 2 より継続的に対応されてきた Null Safety
化が、Dart 3 のリリースをもって完了されたのはたいへん喜ばしいことになります。

昨年より引き続き Dart/Swift の書き味が良くなっています。

とりわけ Dart については Flutter だけでしか書かなくなるのも勿体無いでしょう。

これを機に、サーバーサイド Dart もひとつの流行りを見せていただければ、全体として
Dart の知見が増え良い相乗効果が期待できるものと考えています。

- Dart 3
  - レコード操作が強化された
  - パターンマッチ操作が強化された
  - クラス修飾子を利用した制御のサポート
- Swift 5.9
  - if や switch の表現が強化された
  - データフロー改善
    - view にデータを持ち込むラッパー `@State` や `@Environment`
  - Swift Micros の強化
  - C++ への拡張
  - コピー不可能な型が導入された

まずレコード操作について、毎回クラスを定義する必要がなくなりました。

Destructuring を利用すれば、スマートに `getPaginatedData()`
を呼ぶことができます。

```dart
Future<({ List<Item> items, int currentPage, int totalPages })>
 getPaginatedData(int currentPage) async {
  return (
    items: items,
    currentPage: currentPage,
    totalPages: totalPages,
  );
}

// before
final data = await getPaginatedData(currentPage);
final items = data.items;
final currentPage = data.currentPage;
final totalPages = data.totalPages;

// after
final (:items, :currentPage, :totalPages) = await getPaginatedData(currentPage);
```

Supabase タイラーさんの記事より引用させていただきました。

[Dart 3 でやってくる Record 型の紹介](https://qiita.com/dshukertjr/items/17894b429b65d9ab14e3)

次にパターンマッチ操作について、レコードを別の新しい変数として分割できるようになりました。

下の例では、スマートに `name` と `age` を呼ぶことができます。

```dart
var (String name, int age) = getAvatarInfo({
  'name': 'jiyuujin',
  'age': 28,
})；
print('$name is $age years old.')；
```

こちら Okazy さんの記事もぜひ、参考にしていただくと良いように考えています。

[Dart 3 の新機能 Records と Patterns について](https://zenn.dev/mimimi_dev/articles/7f951f8714e2a9)

なお、レコードやパターンマッチの FizzBuzz
サンプルも、ブコメされていたりとお手隙のタイミングにチェックしておきたいと。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Dart 3のRecordとpattern matching使った簡単なFizzBuzzサンプル(　´･‿･｀)<a href="https://t.co/5LO3Nl2Tif">https://t.co/5LO3Nl2Tif</a> <a href="https://t.co/hyCVIc9X69">pic.twitter.com/hyCVIc9X69</a></p>&mdash; mono (@_mono) <a href="https://twitter.com/_mono/status/1658307863033565185?ref_src=twsrc%5Etfw">May 16, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

https://dartpad.dev/?id=77bdfa6bae817467874e04ead942f5da

もちろんこれだけに留まらないが、言語として書き味が良くなることは素直に歓迎したい。

それぞれの詳細について、下記記事をチェックしていただければ幸いです。

- [Announcing Dart 3](https://medium.com/dartlang/announcing-dart-3-53f065a10635)
- [What’s new in Flutter 3.10](https://medium.com/flutter/whats-new-in-flutter-3-10-b21db2c38c73)

一方で Swift の変更点にも触れておきたい。

https://developer.apple.com/videos/play/wwdc2023/10164/

まず Swift 5.9 がリリースされています。

https://www.hackingwithswift.com/articles/258/whats-new-in-swift-5-9

Swift 以外の発表にも注目しておきたい。

- SwiftData (beta) が発表
- SwiftUI のアニメーションが進化

CoreData の後継 (!?) として SwiftData の発表がありました。

この度 Swift
に向け完全に再設計されており、外部ファイルフォーマット無し、ソースコードに焦点を当てます。

[SwiftData | Apple Developer Documentation](https://developer.apple.com/documentation/swiftdata?changes=latest_minor)

SwiftUI Spring Animations (beta) で 開発者向けの
[Cheat Sheet](https://github.com/GetStream/swiftui-spring-animations)
が公開されました。

[Spring | Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/spring)

## 最後に

おはようエンジニアのポッドキャスト内で、それぞれの速報版をお送りしました。

- [2023/05/12 週 - Google I/O 2023](https://ohayo-friday.nekohack.me/posts/2023-05-12-weekly/)
- [2023/05/26 週 - Microsoft Build 2023](https://ohayo-ai.nekohack.me/posts/2023-05-26-weekly/)
- [2023/06/09 週 - WWDC 2023](https://ohayo-friday.nekohack.me/posts/2023-06-09-weekly/)

こちらも合わせてご確認いただきたい。
