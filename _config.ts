import lume from "lume/mod.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx.ts";
// import windi from "lume/plugins/windi_css.ts"; // replace to "unocss" if you prefer UnoCSS
// import windicss from "./plugins/windicss/mod.ts";
import unocss from "lume/plugins/unocss.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pagefind from "lume/plugins/pagefind.ts";
// import zennRenderer from "./plugins/zenn-renderer/mod.ts";
import mdRenderer from "./plugins/md-renderer/mod.ts";

export const title = "個人ブログ";
export const description =
  "Nuxt製のウェブログとして2018年10月より個人ブログの運営を開始、2023年春先にかけLume製へリプレースを進め、アプリケーション構築を目的としたデータ設計に従事しています。";

const site = lume({
  location: new URL("https://blog.nekohack.me/"),
});

site
  .use(favicon({
    input: "/assets/bakeneko2.svg",
  }))
  .use(feed({
    output: ["/feed.rss", "/feed.json"],
    sort: "publish_date=desc",
    limit: 10,
    info: {
      title: "個人ブログ",
      description:
        "Nuxt製のウェブログとして2018年10月より個人ブログの運営を開始、2023年春先にかけLume製へリプレースを進め、アプリケーション構築を目的としたデータ設計に従事しています。",
    },
    items: {
      title: "=title",
      description: "=description",
    },
  }))
  .use(jsx())
  // .use(windicss())
  .use(unocss({
    cssFile: "/assets/main.css",
    transformers: [],
    reset: "tailwind",
  }))
  // .use(zennRenderer())
  .use(mdRenderer())
  .use(resolveUrls())
  .use(pagefind());

site.copy("assets");

site.ignore("README.md");

export default site;
