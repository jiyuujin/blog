---
layout: Article.tsx
publish_date: 2023-12-06
title: 'turborepo 配下でデザインシステムを構築する'
description: '小噺になります。Vue Fes Japan Online 2022 並びに Vue Fes Japan 2023 で、使用 (予定) のコンポーネント群について、超・簡易的なデザインシステムを構築している。'
slug: vuefes-ui-experimental
reaction: 🗼
category: Front
tags:
  - Advent-Calendar
  - Storybook
  - AWS
  - AWSAmplify
  - VueFes
---

この記事は jiyuujin Advent Calendar 2023 の 6 日目の記事になります。

https://adventar.org/calendars/9670

幸い自身がウェブサイトチームで色々とチャレンジさせていただいていたことから、試験的に turborepo 配下でデザインシステムの **走り** を構築してみました。

正直、自ら学習の一環でさくっと構築しつつ、コンポーネントとそれに対応したストーリーを実装しています。なお、それぞれのウェブサイトで、取り入れさせていただいている CSS も [Tailwind CSS](https://tailwindcss.com/) と [Pinceau](https://pinceau.dev/) で異なる上に、デザインコンセプトも全く同じものではありません。

ホスティングは 2022 年、2023 年双方とも、サブパスで確認できるよう吐き出し先をリネームしつつ、最終的には [AWS Amplify](https://aws.amazon.com/jp/amplify/) で static に落としています。

(Vue Fes Japan Online 2022)

https://main.d3aik7iyoiwh62.amplifyapp.com/2022/

(Vue Fes Japan 2023)

https://main.d3aik7iyoiwh62.amplifyapp.com/2023/

こうしたモノレポ環境を、実際のアプリケーション構築へ応用することも、十二分に可能といえば全くできなくはありません。

深く話せる機会があれば、それまでしばらくの間お待ちいただければ、でございます。
