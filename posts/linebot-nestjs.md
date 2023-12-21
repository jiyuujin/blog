---
layout: Article.tsx
publish_date: 2023-12-20
title: 'LINE Messaging API を Nest.js 上で動かす'
description: 'ChatGPT (OpenAI) と組み合わせることの多い LINE Messaging API の導入方法について、簡単に書かせていただきました。なお、今回はハマったワナを中心に書かせていただきます。'
slug: linebot-nestjs
reaction: 🐼
category: Server
tags:
  - LINEBot
  - NestJS
  - TypeScript
  - Advent-Calendar
---

この記事は jiyuujin Advent Calendar 2023 の 20 日目の記事になります。

https://adventar.org/calendars/9670

現在ジョインさせていただいているプロジェクト [Engagement/Relation](https://wevnal.co.jp/service/chatbot/) でも、LINE チャットボットを利用しており、その API 仕様を認識させていただく機会が多く増えました。

https://wevnal.co.jp/service/chatbot/

また今年は、巷で大きく話題をかっさらった OpenAI の [ChatGPT](https://openai.com/chatgpt) と組み合わせているという方も多いと耳にします。

そんな ChatGPT と合わせしばしば使われた LINE Messaging API を触れさせていただきます。

https://developers.line.biz/ja/docs/messaging-api/overview/

なお、今回はバックエンドのフレームワークに Express を取り入れず、代わりに Nest.js を利用させていただきます。

https://docs.nestjs.com/

と言いますのは、他ドメインの情報も組み込む想定があったので、より堅牢な設計を進めるなら是非とも Nest.js を選択したいという想いからでございます。

## bodyParser の扱いに注意する

まず、デフォルトの bodyParser を無効にします。

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {
  const options: NestApplicationOptions = {
    bodyParser: false, 
  };

  const app = await NestFactory.create(AppModule, options);
  await app.listen(3000);
}
bootstrap();
```

これをもって、Nest の bodyParser が呼ばれ、勝手にその body がオブジェクト化されてしまうのを防ぎます。

そして、先に LINE Bot SDK を適用し、後にその bodyParser をあてるよう設定します。

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configuration';
import { LINEBotModule } from './linebot/linebot.module';

@Module({
  imports: [
    LINEBotModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### LINE Bot 用のアプリケーション構造に慣れる

こればかりは慣れるしかありません。

```
🗂 linebot
  └ linebot.module.ts
    └ linebot.controller.ts
      └ linebot.service.ts
```

LINE Developers 管理画面より、新規で Messaging API のチャンネルを作成します。

作成した後、チャンネルシークレット並びにチャンネルアクセストークンを手元に記録しましょう。

```
LINE_CHANNEL_SECRET=
LINE_CHANNEL_ACCESS_TOKEN=
```

@nestjs/config の `ConfigModule.forRoot` で、環境変数を含めた configuration.ts を読み込ませるようにします。

実際、LINE Bot を送信するため必要なプラグインは、あと [@line/bot-sdk](https://www.npmjs.com/package/@line/bot-sdk) のみとなります。

https://www.npmjs.com/package/@line/bot-sdk

```bash
# npm
npm i -D @line/bot-sdk

# yarn
yarn add -D @line/bot-sdk

# pnpm
pnpm i -D @line/bot-sdk
```

こちらをもって、LINE Bot を利用したメッセージ送信の下ごしらえが完了しました。

メッセージ送信は、エンドポイント `/v2/bot/message/reply` に対し、応答トークンと複数のテキストを送信することで、その応答を取得できるようになります。

https://developers.line.biz/ja/docs/messaging-api/nodejs-sample/#send-reply

ソースコードだけ見たところ、そこまで複雑なことをやっていません。

```ts
const data = await c.req.json();
const events: WebhookEvent[] = data.events;
const accessToken: string = this.configService.get(
  'lineChannelAccessToken',
);

await Promise.all(
  events.map(async (event: WebhookEvent) => {
    try {
      await this.lineBotService.handler(event, accessToken);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
      }
      return c.json({
        status: 'error',
      });
    }
  }),
);
return c.json({ message: 'ok' });
```

`fetch` を利用して、エンドポイント `/v2/bot/message/reply` に送信するだけとなります。

基本的には、これだけの実装をもって LINE Bot が動く状態となります。
