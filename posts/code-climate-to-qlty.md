---
layout: Article.tsx
publish_date: 2025-08-06
title: 'Code Climate の API を qlty.sh に移行する'
description: ''
slug: code-climate-to-qlty
reaction: 🍸
category: Server
tags:
  - CodeClimate
  - Qlty
---

## Code Climate の API を qlty.sh に移行する

最近、コード品質チェック用の新しいツール [Qlty](https://docs.qlty.sh/what-is-qlty) が登場したのをきっかけに、これまで使っていた Code Climate から思い切って移行することにしました。

https://docs.qlty.sh/what-is-qlty

というのも、先月 18 日以降、Code Climate の API は新プラットフォーム qlty.sh へ完全移行されることが発表され、それに伴って旧 API や cc-test-reporter を使ったCIワークフローが非推奨となりました。今後は、cc-test-reporter を利用しているパイプラインで 503 エラーが返される ようになるため、急ぎ対応が必要に。

そんな背景もあり、「Qlty、なんか良さそうだし、もう移行しちゃおう」と思い立ち、わりとスピーディーに移行を進めています。

この記事では、移行を決めた理由、実際に使ってみた感想、導入手順やハマりポイントなどを、実体験ベースでまとめています。
コード品質ツールの選定や切り替えを検討している方の参考になればうれしいです。

https://docs.qlty.sh/migration/guide

## Qlty CLI を使ってみる

`qlty check` で、各種 Linter (ESLint など) を実行し、コードの静的解析を行います。

```bash
qlty check ./src/index.ts
```

解析結果を qlty_output.txt に出力することもできます。

```bash
qlty check ./src/index.ts > qlty_output.txt
```

### Qlty CLI を利用する

Code Climate API 利用時の設定ファイル .codeclimate.yaml を .qlty/qlty.toml に置き換えます。

プロジェクトルートで .qlty/qlty.toml を作成し、その内容を貼り付けます。

```bash
qlty config show
```

Qlty CLI を利用すると、下記のような YAML を書けば対応することができます。

:::details Qlty CLI を利用する。

```yaml
name: qlty Analysis

on:
  pull_request:
    branches: [develop]

jobs:
  qlty-analysis:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # すべての履歴を取得

      - name: Set up Node (or Ruby, Python depending on your repo)
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install qlty.sh
        run: |
          curl -sSf https://qlty.sh/install.sh | sh
          echo "$HOME/.qlty/bin" >> $GITHUB_PATH

      - name: Get changed files (only .js files as example)
        id: changes
        run: |
          FILES=$(git diff --name-only origin/${{ github.event.pull_request.base.ref }}...HEAD | grep -E '\.ts$' || true)
          echo "$FILES"
          FILES_ESCAPED=$(echo "$FILES" | tr '\n' ' ')
          echo "files=$FILES_ESCAPED" >> $GITHUB_OUTPUT

      - name: Run qlty on changed files and save output
        if: steps.changes.outputs.files != ''
        id: analyze
        run: |
          qlty check ${{ steps.changes.outputs.files }} > qlty_output.txt || echo "qlty exited with error"
          echo "ANALYSIS_RESULT<<EOF" >> $GITHUB_ENV
          cat qlty_output.txt >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV
        env:
          QLTY_TOKEN: ${{ secrets.QLTY_TOKEN }}

      - name: Comment analysis results on PR
        if: steps.changes.outputs.files != ''
        uses: peter-evans/create-or-update-comment@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          issue-number: ${{ github.event.pull_request.number }}
          body: |
            🧪 **qlty Analysis Report**

            以下は `qlty` による静的解析の結果です：

            ```
            ${{ env.ANALYSIS_RESULT }}
            ```

            🔍 詳細は [Actionsログ](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})
```

:::
