import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx.ts";
import windi from "lume/plugins/windi_css.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pagefind from "lume/plugins/pagefind.ts";
import zennRenderer from "./plugins/zenn-renderer/mod.ts";

export const title = "個人ブログ";
export const description =
  "Nuxt製のウェブログとして2018年10月より個人ブログの運営を開始、2023年春先にかけLume製へリプレースを進め、アプリケーション構築を目的としたデータ設計に従事しています。";

const site = lume({
  location: new URL(
    `https://blog.nekohack.me${
      Deno.env.get("IS_PREVIEW")
        ? `/pr-preview-${Deno.env.get("PR_NUMBER")}`
        : "/"
    }`,
  ),
});

site
  .use(basePath())
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
  .use(windi())
  .use(zennRenderer())
  .use(resolveUrls())
  .use(pagefind());

site.copy("assets");

site.ignore("README.md");

export default site;
