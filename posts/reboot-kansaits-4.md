---
layout: Article.tsx
publish_date: 2023-11-24
title: '勉強会でもオフラインの良さを痛感'
description: 'コロナ禍ぶり、およそ 3 年の間を経て、オフラインのミートアップを復活・開催させていただきました。'
slug: reboot-kansaits-4
reaction: 🪁
category: Poem
tags:
  - TypeScript
---

今年はいくつかオフラインのカンファレンスも経験した傍ら、普段の小規模なミートアップでもその良さを実感させていただきました。

![](https://i.imgur.com/bNmR1SX.jpg)

想定の参加枠まで行かなかったまでも、積極的に聞かれている方が多く開催して良かったと考えています。

今回　Re:boot kansai.ts として、オフラインで開催させていただきました。

https://kansaits.connpass.com/event/299545/

この度、ミートアップの会場を提供いただきました [サイボウズ株式会社](https://cybozu.co.jp/) 様には、たいへん感謝申し上げます。

## 登壇を公募するとは

まず、登壇に手を挙げていただいた皆さまには、感謝申し上げます。直近カンファレンスのスタッフ業に勤しんでいた私自身も、登壇する機会を伺っておりましたが、今回はやむを得ずスキップさせていただきました。

今回、全て公募形式としてイベントをホストさせていただきましたが正直、全てこの公募形式とするのは、いろいろな意味でしんどい部分も感じました。

良くもコロナ禍を機に、登壇のハードルがじわりと上がっている気がしています。名の通った方々が登壇することも、これから登壇を試みようと検討されている方々にとっては、敬遠してしまう可能性も否定できません。

余談ですが、3 番目に登壇された [ryounasso](https://x.com/ryounasso) さんは初めて挑戦されたとのことで、そういった敬遠してしまうような方が全くいないという訳でもないのでひとまずは安心できそうな気もします。

とはいえここまで気にする必要も無いとは考えていますが、全体的にコミュニティ運営へ対してちゃんと向き合わなければいけません、という「自戒の念」を持ちました。

### 登壇の内容について

ざっくりいま流行りの AI や Hono から TypeScript の内部実装まで、幅広い内容を聞くことができました。

それぞれの詳細は、登壇スライドを読んでいただくとして、改めて見直しておきたいところ。

node の環境でも、ゆるふわに ChatGPT を使えるようにしたライブラリ LangChain.js について。Next.js の boiler template を使うことで、容易にスタートアップできるという話。

TypeScript の内部コードを読んでみた話、レイヤごとに解説されたいへん分かりやすかったです。

TypeScript 5.2 より導入された Copy Array メソッドは総じてパフォーマンスも良く、型エラーで特段ハマることも少ないため、素直に使っていきましょう。

https://speakerdeck.com/optimisuke/langchainyarunarapythonyoritypescriptnofang-gainziyane

https://speakerdeck.com/ryounasso/typescript-konhairanonei-ce-nipian-zu-woru-reru

https://speakerdeck.com/jiko21/copying-array-methods-arrived-at-typescript

https://speakerdeck.com/is_ryo/honogaliang-sasou
