import type { Data } from "lume/core/file.ts";
import loader from "lume/core/loaders/text.ts";
import type { Engine, Helper } from "lume/core/renderer.ts";
import type Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";
import MarkdownIt from "npm:markdown-it";

import { fetchOGP } from "./deps.ts";

export interface Options {
  extensions: string[];
  keepDefaultPlugins: boolean;
}

export const defaults: Options = {
  extensions: [".md", ".mdx"],
  keepDefaultPlugins: false,
};

export class MarkdownEngine implements Engine {
  constructor() {}

  deleteCache() {}

  async render(
    _content: string,
    _data?: Data,
    _filename?: string,
  ): Promise<string> {
    const md = new MarkdownIt();
    let html = md.render(_content);

    const regex = /<p>\s*(https?:\/\/[^\s<>"']+)\s*<\/p>/g;
    const matches = [...html.matchAll(regex)];

    for (const match of matches) {
      const url = match[1];
      const ogp = await fetchOGP(url);

      const card = `
        <div class="embed-card">
          <a href="${ogp.url}" target="_blank" rel="noopener noreferrer">
            <div class="embed-card-image">
              ${ogp.image ? `<img src="${ogp.image}" alt="OG Image">` : ""}
            </div>
            <div class="embed-card-content">
              <h3>${ogp.title}</h3>
              <p>${ogp.description}</p>
            </div>
          </a>
        </div>`.trim();

      html = html.replace(match[0], card);
    }

    return html;
  }

  renderComponent(
    _content: string,
    _data?: Data,
    _filename?: string,
  ): string {
    const md = new MarkdownIt();
    return md.render(_content);
  }

  addHelper() {}
}

export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return function (site: Site) {
    const engine = new MarkdownEngine();

    site.loadPages(options.extensions, { loader, engine });

    function filter(string: string, _inline = false): string {
      return engine.renderComponent(string?.toString() || "").trim();
    }

    site.filter("md", filter as Helper);
  };
}
