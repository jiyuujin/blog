---
layout: Article.tsx
publish_date: 2023-12-18
title: 'Azure Container Apps ワークショップ まとめ'
description: 'Microsoft 様による Azure Container Apps ワークショップを振り返る。'
slug: azure-workshop-a-little
reaction: 🎧
category:
tags:
  - Review
  - Azure
  - AzureContainerApps
---

この記事は jiyuujin Advent Calendar 2023 の 18 日目の記事になります。

https://adventar.org/calendars/9670

先日 11 月 8 日に開かれた Microsoft 様による Azure Container Apps ワークショップのレポートを簡単にまとめさせていただきました。

https://azure.microsoft.com/ja-jp/products/container-apps

現在 [wevnal](https://wevnal.co.jp/service/chatbot/) で、一フルスタックのエンジニアとしておしごとさせていただいております。

実際、wevnal のプロジェクトでは、Azure Container Apps の導入されているプロジェクトが存在しています。

それを踏まえて、基盤技術や戦略を理解し、より効果的なソリューションやベストプラクティスを得るため、このワークショップへ参加させていただきました。

なお、私自身、当日の昼に所用がございましたので、途中参加のリモート参加という形になっております。

これまで (現在も) AWS をメーンに使ってきた (きている) 私にとって、下の比較表を念頭に今回のワークショップ参加に臨ませていただきました。

|AWS|Azure|
|:---|:---|
|Elastic Container Service / Fargate|Container Apps|
|Fargate|Container Instances|
|App Runner|Web App for Containers|
|Elastic Container Registry|Azure Container Registry|
|Elastic Kubernetes Service|Azure Kubernetes Service|

ちなみに、Azure 公式からも、同様の比較表が公開されています。

機会あればこちらもご参照いただきたい。

https://learn.microsoft.com/ja-jp/azure/architecture/aws-professional/services

## Azure Container Apps ハンズオンのさわりを

そもそもコンテナとはなんぞやという話から始まり、そのコンテナ技術を利用する上で必要となりそうな前提知識、コンテナを活用できる利用シーンへの理解を深めます。

- Docker コンテナのプロセスを確認する
- 名前空間 (namespace) でファイルシステムやネットワークを分離する
- cgroups (Control Group) で CPU やメモリ、ディスク I/O、ネットワークを制限する

その理解に努めた上で、Docker イメージの構築と、Azure Container Registry の作成、Azure Container Apps の作成を進めました。

AWS の ECS 同様、この Azure Container Apps の作成まで、Azure Portal の中で作成操作が完結できるのは、ほんとうに便利な世の中であることを改めて気付かされました。

そして、これより先は Azure ならではという形で、この Azure Container Apps を運用するにあたって、リビジョンやアプリケーションのスケーリングなどの詳細な設定を操作できることを学びます。

https://learn.microsoft.com/ja-jp/azure/container-apps/revisions-manage?tabs=bash

https://learn.microsoft.com/ja-jp/azure/container-apps/tutorial-scaling?tabs=bash

### 余談

奇しくも私自身も、同期間に上京しておりましたが、あいにく私用で現地参加は叶いませんでした。

wevnal 公式 note では、現地参加された方よりブログが上がっています。

https://note.com/wevnal/n/nd6392fd7d855
