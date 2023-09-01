import type { Data } from "lume/core";
import {
  description as blogDescription,
  title as blogTitle,
} from "../_config.ts";

export default ({ title, description, slug, children }: Data) => (
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
      <meta property="description" content={description || blogDescription} />
      <meta property="og:site_name" content={title || blogTitle} />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={description || blogDescription}
      />
      <meta property="og:title" content={title || blogTitle} />
      <meta
        property="og:url"
        content={slug
          ? `https://blog.nekohack.me/posts/${slug}`
          : "https://blog.nekohack.me/"}
      />
      <meta
        property="twitter:description"
        content={description || blogDescription}
      />
      <meta property="twitter:title" content={title || blogTitle} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@jiyuujin_dev" />
      <meta property="twitter:creator" content="@jiyuujin_dev" />
      <meta property="twitter:site" content="@jiyuujin_dev" />
    </head>
    <body>{children}</body>
  </html>
);
