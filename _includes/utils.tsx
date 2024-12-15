import { Page } from "../plugins/zenn-renderer/deps.ts";
import site from "../_config.ts";

export function joinUrl(to: string): string {
  const n = new URL(to.replace(/^\//, "./"), site.options.location);
  return n.href;
}

export function comparePage(a: Page, b: Page): number {
  return new Date(a.data.publish_date) > new Date(b.data.publish_date) ? -1 : 1;
}

export function getPosts(): Page[] {
  return site.pages.sort(comparePage);
}

export function getIcons(): { name: string; url: string }[] {
  return [
    {
      name: "github",
      url: "https://github.com/jiyuujin",
    },
    {
      name: "mastodon",
      url: "https://times.nekohack.me/",
    },
    {
      name: "bluesky",
      url: "https://bsky.app/profile/jiyuujin.bsky.social",
    },
    {
      name: "x_twitter",
      url: "https://x.com/jiyuujinlab",
    },
  ];
}
