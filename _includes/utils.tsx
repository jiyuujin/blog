import { Page } from "lume/core/file.ts";
import Parser from "npm:rss-parser";
import site from "../_config.ts";

const parser = new Parser();

export function joinUrl(to: string): string {
  const n = new URL(to.replace(/^\//, "./"), site.options.location);
  return n.href;
}

export function comparePage(a: Page, b: Page): number {
  return new Date(a.data.publish_date) > new Date(b.data.publish_date) ? -1 : 1;
}

async function getMediumPosts(): Promise<Page[]> {
  const feed = await parser.parseURL("https://medium.com/feed/@jiyuujin");
  return feed.items.map((item) => ({
    data: {
      title: item.title || "Untitled",
      description: item.contentSnippet || "",
      slug: item.guid || "",
      publish_date: new Date(item.pubDate) || "",
      tags: item.categories ? [...item.categories, "Medium"] : ["Medium"],
      reactions: [],
      url: item.link || "",
      source: "medium",
    },
    content: item.content || "",
  }));
}

async function getZennPosts(): Promise<Page[]> {
  const feed = await parser.parseURL("https://zenn.dev/jiyuujin/feed");
  return feed.items.map((item) => ({
    data: {
      title: item.title || "Untitled",
      description: item.contentSnippet || "",
      slug: item.guid || "",
      publish_date: new Date(item.pubDate) || "",
      tags: item.categories ? [...item.categories, "Zenn"] : ["Zenn"],
      reactions: [],
      url: item.link || "",
      source: "zenn",
    },
    content: item.content || "",
  }));
}

export async function getPosts(): Promise<Page[]> {
  const mediumPosts = await getMediumPosts();
  const zennPosts = await getZennPosts();

  const localPosts: Page[] = site.pages.map((p) => ({
    ...p,
    data: {
      ...p.data,
      source: "local",
    },
  }));

  return [...localPosts, ...mediumPosts, ...zennPosts].sort(comparePage);
}

export function getIcons(): { name: string; url: string }[] {
  return [
    {
      name: "github",
      url: "https://github.com/jiyuujin",
    },
    {
      name: "medium",
      url: "https://medium.com/@jiyuujin",
    },
    {
      name: "zenn",
      url: "https://zenn.dev/jiyuujin",
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
