import type { Data } from "lume/core";
import {
  description as blogDescription,
  title as blogTitle,
} from "../_config.ts";

export default ({ title, description, slug, reaction, children }: Data) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/assets/reset.css" />
      <link rel="stylesheet" href="/assets/main.css" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/prismjs@1.29.0/themes/prism-tomorrow.min.css"
      />
      <link rel="stylesheet" href="https://esm.sh/zenn-content-css?css" />
      <script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      <script
        type="text/javascript"
        src="https://b.st-hatena.com/js/bookmark_button.js"
        charset="utf-8"
        async="async"
      />
      <title>{title || blogTitle}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />
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
        property="og:image"
        content={reaction
          ? `https://blog-og-image.jiyuujinunite.workers.dev/${reaction}`
          : ""}
      />
      <meta
        property="twitter:description"
        content={description || blogDescription}
      />
      <meta property="twitter:title" content={title || blogTitle} />
      <meta property="twitter:card" content="summary" />
      <meta
        property="twitter:image"
        content={reaction
          ? `https://blog-og-image.jiyuujinunite.workers.dev/${reaction}`
          : ""}
      />
      <meta property="twitter:site" content="@jiyuujinlab" />
      <meta property="twitter:creator" content="@jiyuujinlab" />
      <meta property="twitter:site" content="@jiyuujinlab" />
    </head>
    <body>
      <main>{children}</main>
    </body>
  </html>
);
