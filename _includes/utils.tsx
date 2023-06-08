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
