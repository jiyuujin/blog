---
layout: Article.tsx
publish_date: 2025-09-10
title: 'Aikido の API を利用する'
description: ''
slug: aikido-security
reaction: 🍸
category: Server
tags:
  - Aikido
  - Qlty
  - CodeClimate
  - Security
---

## Aikido の API を利用する

Aikido は、ベルギーの Aikido Security BV（2022 年設立）が提供する、コードからクラウドまでを一括保護するオールインワン型セキュリティプラットフォームです。

## 📈 Aikido を事前に調査してみた（非公開）

個人としての調査ログになります。

https://www.notion.so/nekohack/Aikido-2610a39c5e1480f5a794d6fe429961ab?pvs=23

### まとめポイント

ざっくり。

- 価格差
   - Aikido は中小規模でも使いやすい価格帯（$350–700/ 月、年額 $20k 前後）
   - Snyk はユーザー単位課金だが、見積取得が必要
   - Checkmarx は高額で大企業向け
   - SonarQube はコード量に応じた年間固定費
- 導入フロー
   - 迅速導入と手軽さ → Aikido/Snyk
   - 深い分析・ガバナンス → Checkmarx
   - 品質重視なら SonarQube
- 企業規模別の適合性
   - スタートアップ → Aikido
   - 成長企業 → Snyk
   - 大型企業 → Checkmarx
   - 品質重視 → SonarQube

※ 誤った情報の入っている可能性があります。

## Aikido CLI を利用する

GitHub のリポジトリに以下の Secrets を設定してください：

| Secret 名 | 内容 |
| --- | --- |
| `AIKIDO_CLIENT_API_KEY` | Aikido の API キー（[ダッシュボード](https://app.aikido.dev/settings/integrations/continuous-integration) にて API キーを取得） |

### GitHub Actions でのワークフロー例

Code Climate の API と同様に、PR が作成された時点で変更されたファイルを対象に解析が実行されます。

:::details Aikido CLI を利用する。

```yaml
name: Aikido Security Scan

on:
  pull_request:
    branches:
      - main

permissions:
  contents: read
  pull-requests: write

jobs:
  aikido-scan:
    name: Run Aikido SAST & Secrets Detection
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Aikido CLI
        run: npm install --global @aikidosec/ci-api-client

      - name: Get changed files
        id: changed
        uses: tj-actions/changed-files@v41
        with:
          separator: ","

      - name: Run Aikido scan
        id: aikido
        run: |
          aikido-api-client scan-release \
            "${{ github.event.repository.name }}" \
            "${{ github.sha }}" \
            --apikey "${{ secrets.AIKIDO_CLIENT_API_KEY }}" \
            --json-output scan-results.json || true

      - name: Filter for changed files only
        id: filter
        run: |
          CHANGED_FILES="${{ steps.changed.outputs.all_changed_files }}"
          echo "Changed files: $CHANGED_FILES"
          # Extract relevant findings only (pseudo-code, needs real jq)
          jq --arg files "$CHANGED_FILES" '
            .issues | map(select(.file | IN($files)))
          ' scan-results.json > filtered-results.json

      - name: Comment only changed file issues
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          message: |
            🔎 **Aikido Scan Issues (Changed Files Only)**
            See below for security issues detected in files modified in this PR:
            ```json
            ${{ steps.filter.outputs.filtered-results }}
            ```
```

:::
