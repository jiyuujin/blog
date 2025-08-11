import type { Data } from "lume/core/file.ts";
import loader from "lume/core/loaders/text.ts";
import type { Engine, Helper } from "lume/core/renderer.ts";
import type Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";

import { markdownToHtml } from "./deps.ts";

export interface Options {
  extensions: string[];
  keepDefaultPlugins: boolean;
}

export const defaults: Options = {
  extensions: [".md"],
  keepDefaultPlugins: false,
};

export class MarkdownEngine implements Engine {
  constructor() {}

  deleteCache() {}

  render(_content: string, _data?: Data, _filename?: string): Promise<string> {
    const content = markdownToHtml(_content, {
      embedOrigin: "https://embed.zenn.studio",
    });

    return Promise.resolve(content);
  }

  renderComponent(_content: string, _data?: Data, _filename?: string): string {
    const content = markdownToHtml(_content, {
      embedOrigin: "https://embed.zenn.studio",
    });

    return content;
  }

  addHelper() {}
}

export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return function (site: Site) {
    const engine = new MarkdownEngine();

    // site.loadPages(options.extensions, loader, engine);
    site.loadPages(options.extensions, loader);

    function filter(string: string, _inline = false): string {
      return engine.renderComponent(string?.toString() || "").trim();
    }

    site.filter("md", filter as Helper);
  };
}
