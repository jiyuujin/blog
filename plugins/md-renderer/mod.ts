import type { Data } from "lume/core/file.ts";
import loader from "lume/core/loaders/text.ts";
import type { Engine, Helper } from "lume/core/renderer.ts";
import type Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";
import MarkdownIt from "npm:markdown-it@14.1.0";
import hljs from "npm:highlight.js@11.11.1";

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
    const md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre><code class="hljs">' +
              hljs.highlight(str, { language: lang, ignoreIllegals: true })
                .value +
              "</code></pre>";
          } catch (__) {
            // Ignore errors
          }
        }
        return "";
      },
    });
    let html = md.render(_content);

    const hasTable = html.includes("<table>");

    if (hasTable) {
      html = html.replaceAll("<table>", "<div class='table-wrapper'><table>");
      html = html.replaceAll("</table>", "</table></div>");
    }

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
