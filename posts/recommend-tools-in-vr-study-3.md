---
layout: Article.tsx
publish_date: 2020-06-21
title: 'Slackを中心に世界は廻っている'
description: 'VR 勉強会 #3 (#study_in_vr) で登壇させていただきました。YouTube Live上でお話できなかった、GitHub API v4 をどのように使っているかなど、皆さまの参考になればと思います。'
slug: recommend-tools-in-vr-study-3
reaction: 🌐
category: Server
tags:
  - Slack
  - Google-Apps-Script
  - Google-Clasp
---

## 推しツール

そもそもここでいう `ツール` は大変広過ぎる意味を持ちますが、今回はちょっとでも面倒と感じる瞬間を低減させるために導入を進めた手段が多いと考えています。

これから説明する全ての基本になっている存在が Slack となります。

- Slack -> 全ての基本になっている存在
- GitHub API v4
- GitHub ISSUE
- Google Apps Script
- Google Cloud (Trigger Run)
- Google Spreadsheet
- Nuxt.js (Vue.js)
- Netlify

## 情報の仕入れに Slack を使う

⚠️ こちらは cluster / YouTube Live 上でお話した内容となります。

基本的に IFTTT を利用して、はてなエントリーや note の RSS を追跡しています。個人 slack かつ専用の channel に流していますが、これだけではありません。

流れる全ての情報の内、自ら何らかの `顔文字アクション` を取った情報について GAS を利用して指定のスプレッドシートに蓄積させることを目指しました。

```js
const baseUrl = 'https://slack.com/api/conversations.history'
const baseParams = [
  'token=' + token,
  'channel=' + channel,
  'oldest=' + messageTs,
  'latest=' + messageTs,
  'inclusive=' + true,
]

const latestMessage = ''
const params = baseParams.concat([latestMessage]).join('&')
const encodeType = 'application/x-www-form-urlencoded'
const res = postMessageToSlack(baseUrl + '?' + params, encodeType)

function postMessageToSlack(url, encodeType) {
  const res = UrlFetchApp.fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': encodeType,
    },
  })
  return JSON.parse(res)
}
```

`/api/conversations.history` のように、適切なパラメータを設定することで、正しくリアクションを受け取れるようになります。

そしてその情報を、自分だけのために製作・運用を進めている管理画面 (Nuxt + Firestore) で表示させました。

※ なお 2023 年現在、当ウェブサイトの製作・運用を停止しています。

![admin-tip](//images.ctfassets.net/gzkue3szf85p/2lYQN5gx0MyYGXfsGn8JpS/18067dbb843ab4ec8056d624632bea9f/ss_admin_2.JPG)

個別の技術仕様ついては、割愛させていただきます。

そんな中、自動化を進める上で特に力を入れたポイントを主に 2 点列挙します。

- ひとつはスプレッドシート名を「年月」で管理したこと
- 存在する年月を使う場合はそのシート名を、逆にそれが存在しなかった場合は新たなシートを作成したこと

```js
const today = new Date()
const sheetName = Utilities.formatDate(today, 'Asia/Tokyo', 'yyyyMM')

const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName)

// 存在していない場合新たに作る
if (!sheet) SpreadsheetApp.create(sheetName)
```

そしてもうひとつは、フロントエンド (Nuxt.js) から読み込む際に予め、使い易く情報を成形しています。

Firestore 上で作っているスキーマは以下の通りになります。

```js
export interface TipForm {
  title: string
  url: string
  description: string
  tags: number[]
  event: number
  time: Date
}
```

ここで主に、情報成形後に入力しているカラムは `title` や `url` となります。予め正規表現を使って、容易に URL を抜き出します。すると、フロントエンド (Nuxt.js) では API を叩いて上手く配置してあげるだけ、それなりの Web サイトとして自身の見たい情報を集約できるようになります。

また、そう遠くない内に実現したいこと。それは、現状 Firebase Auth により私自身のみが見られるようになっていますが、それを他の人たちも見られるようにしたいと考えています。

### 情報の仕入れに、こんなツールも使う

Chrome で新しいタブを開いた時に、その場でテックニュースを仕入れることのできる Chrome Extension の存在があるとのこと。

それから私もちょこちょこ触らせていただいてます。

- [Chrome extension](https://chrome.google.com/webstore/detail/daily-20-source-for-busy/jlmpjdjjbgclbocgajdjefcidcncaied?hl=en)
- [Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/daily/)

## 番外編

⚠️ こちらは cluster / YouTube Live 上でお話しなかった内容となります。

- 週一 KPT で使うドキュメントを自動生成する
- API 設計書を HTML として吐き出す

### 週一 KPT で使うドキュメントを自動生成する

一日の始まりに進捗を確認すること。また `週一KPT` 恐らく私自身だけではなく各個人でやっているでしょう。

そのまとめ作業にかける時間を少しでも低減したい。そこで直近一週間のコミットログや、各 label に応じて ISSUE を取得しています。

たとえば、コミットログを出すクエリは以下の通りとなります。

```js
const currentDate = dayjs().format('YYYY/MM/DD')

const pastQuery = `
  query{
    viewer {
      repositories(first: 100) {
        nodes {
          defaultBranchRef {
            target {
              ... on Commit {
                history(since: "${currentDate}") {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`
```

喫緊やらなきゃいけない ISSUE を取得するクエリは以下の通りとなります。

```js
const query = `
  {
    repository(owner: "${USER}", name: "${REPO}") {
      id,
      name,
      description,
      issues(first: 50, states: OPEN) {
        totalCount,
        nodes {
          title
        }
      },
      labels(first: 10) {
        nodes {
          name,
          id
        }
      }
    }
  }
`
```

後はそのクエリを含めた API を叩きます。

ざっくりだけどこうやってクエリを書けることがわかると、日々つまらないことから少しは気持ちが変わります。

```js
const params = {
  headers: {
    Authorization: 'Bearer ' + TOKEN,
  },
  method: 'get',
  contentType: 'application/json',
  payload: JSON.stringify({
    query: query,
  }),
  muteHttpExceptions: true,
}

const response = await UrlFetchApp.fetch(API_V4, params)
const json = JSON.parse(response.getContentText())
```

毎日同じ時間帯に流すトリガーを設定することで、日々の進捗を slack を見るだけで把握できると共に、ちょっとした手間を省くことができました。

### API 設計書を HTML として吐き出す

これまでのような ISSUE 管理に留まりません。事前準備の HTML に合わせ情報を書き出す用途で、この GAS を利用しますが、API 設計書として読み込む際もこの GAS を活用します。

```js
onClick = function () {
  google.script.run.sourceTemplateMenu_onClicked()
}
```

HTML テンプレート上に設定したボタンの発火メソッドで自動的に書き出す処理を掘り込みます。

```js
private static insertValues(content: string, info: ApiInfo): string {
  content = StringUtil.replaceAll(content, "#{apiId}", info.apiId);
  // ..
  return content;
}
```

すると容易に設計書として吐き出すことができます。
