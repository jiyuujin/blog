import type { Data } from "lume/core";
import { title as blogTitle } from "../_config.ts";

export default ({ title, children }: Data) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/assets/main.css" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/prismjs@1.29.0/themes/prism-tomorrow.min.css"
      />
      <script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      <title>{title || blogTitle}</title>
    </head>
    <body>
      {children}
    </body>
  </html>
);
