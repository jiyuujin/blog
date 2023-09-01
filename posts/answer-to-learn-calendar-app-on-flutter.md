---
layout: Article.tsx
publish_date: 2022-09-02
title: 'カレンダーアプリで学ぶパッケージ開発'
description: '2022 年初めての Flutter ハンズオンとして、Zenn book 「カレンダーアプリで学ぶパッケージ開発」を共同執筆いたしました。'
slug: answer-to-learn-calendar-app-on-flutter
reaction: ⏳
category: Application
tags:
  - Flutter
---

遅ればせながら 2022 年初めてのハンズオンを 2 か月前に開催いたしました。

https://flutter-jp.connpass.com/event/250745/

前回の開催からかなり日数は経っていたものの、大変多くの参加者に見てもらえたと考えています。

![](https://i.imgur.com/XutICWH.png)

[Flutter 日本ユーザーグループ](https://flutter-jp.connpass.com/) (Flutter Japan User Group) では、これまで 9 回の開催を重ねてきました。

- 辞書アプリ
- 写真編集アプリ
- 通話アプリ (WebRTC)
- Atomic Design (Flutter for Web)
- 人狼ゲーム (Flutter for Web)
- 家計簿アプリ

詳細は @jiyuujin 自ら、昨年 4 月 DevRel/Online の場で [登壇](https://slides.com/jiyuujin/comunity-handson-2021) させていただいたのでそちらをご確認いただければ幸いです。

| 作る手段                          | 周辺技術を学ぶ          | アプリ or Web | Flutter バージョン     | 主催                     |
| :-------------------------------- | :---------------------- | :------------ | :--------------------- | :----------------------- |
| 辞書アプリを作る                  | Firebase                | アプリ        | v1.9.1+hotfix.6-stable | Flutter Japan User Group |
| Instagram のようなアプリを作る    | StatefulWidget          | アプリ        | 1.17.2-stable          | Flutter Japan User Group |
| 通話アプリを作る                  | WebRTC                  | アプリ        | 1.17.2-stable          | Flutter Japan User Group |
| ポータルサイトを作る              | Atomic Design           | Web           | 1.23.0-18.1.pre-beta   | Flutter Japan User Group |
| 人狼ゲームを作る                  | Riverpod                | Web           | 1.26.0-17.6.pre-beta   | Flutter Japan User Group |
| 家計簿アプリを作る                | Riverpod (+ API server) | アプリ        | 2.2.2-stable           | Flutter Japan User Group |
| カレンダーアプリを作る            | Plugins                 | アプリ        | 3.0.0 (特に指定せず)   | Flutter Japan User Group |

なお、唯一 WebRTC の回はスポンサー (ブイキューブ様) に付いてもらっています。

Flutter Osaka の [ドキュメント](https://flutter-osaka.netlify.app/handson/calendar.html) にもまとめています。

https://flutter-osaka.netlify.app/

初回の開催より 2 年以上経過し、いままでのハンズオンと違う新しい風を吹かせてみることも必要とのこと、講師担当を [ちゅーやん](https://github.com/chooyan) さんに変更してみました。

## ハンズオンの進め方

これまで、原則として [大西優司](https://2019.kfug.jp/session/onishiyuji/) 先生に全ての権限を任せていたのが実情です。

とはいえ、人狼ゲームをテーマに扱って以降、私自身も積極的にレビュー参加させていただきました。

改善を要することもいくつか存在し、日々コミュニティ運営の中で吸収することもしばしば。

事前準備のフェーズで環境構築に関係するドキュメントを遺すことはあっても、メインのアプリ製作に関係するドキュメントを遺すことはありませんでした。

このように、ハンズオンの質をどこまで追求するか、という点で意見の衝突も増えてきました。

そこで今回は下記のことを中心に、ドキュメントを遺すことに取り組んでいます。

- 事前の開発で、念入りに設計・実装する
- Zenn book を利用して執筆する
- Zoom を利用して配信する

むしろこれまでは念入りに設計・実装していなかったの、と言われてしまいそうな内容です。

また、原則として [ちゅーやん](https://github.com/chooyan) さんにメインとなるアプリの設計を、自身はそのレビューとテスト (ユニットテスト・ウィジェットテスト) を中心にコントリビュートさせていただきました。

おいおい Flutter のテストについては後日、書かせていただければ幸いです。

### カレンダーアプリ製作

今回は Flutter 上で、指定した月のカレンダーが表示されるアプリを製作します。

| #          | iOS                                  |
| :--------- | :----------------------------------- |
| Screenshot | ![](https://i.imgur.com/iqYDqQ7.png) |

ロジックや見た目の責務を考えながら、各パッケージの実装を進めていくことを Flutter を学ぶことが可能となっています。

なお、その詳細は Zenn book を利用して執筆しており、アーカイヴ動画と合わせ [ドキュメント](https://flutter-osaka.netlify.app/handson/calendar.html) をご確認いただきたい。

https://flutter-osaka.netlify.app/handson/calendar.html

## その他

Google I/O 2022 で話題となった Flutter 3 について、自ら冒頭で触れさせていただいた。

登壇スライドは 6 月の PWA Night で Recap と称して登壇させていただいたもので、今回のハンズオンイベントでは Flutter 3 に焦点を合わせて話しています。

https://docs.google.com/presentation/d/1Y5ubD-CzpH8nFVWBaD_Fq5RSHCzxhTi6yIsAp45VH8w/edit?usp=sharing
