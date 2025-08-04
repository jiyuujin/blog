---
layout: Article.tsx
publish_date: 2025-08-04
title: 'Docker Desktop から Colima に移行します'
description: ''
slug: docker-desktop-to-colima
reaction: 🦭
category: Server
tags:
  - Docker
  - DockerDesktop
  - Colima
---

## なぜ今、Docker Desktop から Colima へ移行するのか？

コンテナ開発の現場で長らく定番となっていた Docker Desktop。しかし、近年ではその使用に関していくつかの課題や制約が指摘されるようになってきました。特に、ライセンスの変更による有償化、パフォーマンスの懸念、バックグラウンドでのリソース使用量の多さなどが、開発者の間で話題になっています。

こうした背景の中、注目されているのが「Colima（Container On Lima）」という軽量な Docker 互換ツールになります。Colima は macOS と Linux 上で動作し、オープンソースかつシンプルな設計である点が特徴になります。内部的には **Lima（Linux 仮想マシン）** の上にコンテナ環境を構築する仕組みを採用しており、Docker CLI との高い互換性を保ちながら、より開発者フレンドリーな環境を提供しています。

本記事では、Docker Desktop から Colima への移行に際しての移行手順について網羅的に解説していきます。Docker Desktop に不満を感じている方や、より軽快でオープンな環境を求めている方にとって、Colima は非常に魅力的な選択肢となりうるかと考えています。

## Docker Desktop から Colima に移行する

では、Docker Desktop から Colima に移行しましょう。

https://github.com/abiosoft/colima

### 前提条件 (Prerequisites)

Docker Desktop を停止した後、それをアンインストールします。完了後、バイナリを削除して `~/.docker` もまるごと削除します。

（docker や docker-compose をインストールしていなければ）`docker compose` にパスを通すよう設定します。

```bash
brew install docker docker-compose

mkdir -p ~/.docker/cli-plugins
ln -sfn /opt/homebrew/opt/docker-compose/bin/docker-compose ~/.docker/cli-plugins/docker-compose
docker compose version
```

### 手順 (Process)

HomeBrew を使用して Colima をインストールします。わずか一コマンドで Docker コンテナの起動可能な Linux VM 環境を構築することができます。

```bash
brew install colima docker-buildx

# .zshrc に DOCKER_HOST の設定情報を追加する
export DOCKER_HOST="unix://$HOME/.colima/docker.sock"
colima version

# docker-buildx のパスを追加する
ln -sfn $(which docker-buildx) ~/.docker/cli-plugins/docker-buildx
docker buildx version

# VM 環境を構築する
colima start

# Apple Silicon Mac にて VM 環境を構築する（詳細なスペックを記載する例）
colima start --cpu 8 --memory 12 --disk 128 --arch aarch64 --vm-type=vz --vz-rosetta --mount-type virtiofs

# Intel Mac にて VM 環境を構築する（詳細なスペックを記載する例）
colima start --cpu 8 --memory 12 --disk 128 --vm-type qemu --mount-type virtiofs

# Colima の挙動を確認する
colima status

```

Colima のログは以下コマンドにより確認できます。

```bash
less ~/.colima/_lima/colima/ha.stderr.log
```
