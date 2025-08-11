import type { Data, Engine, Helper, Site } from "lume/core.ts";
import loader from "lume/core/loaders/text.ts";
import { merge } from "lume/core/utils.ts";
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

  renderSync(_content: string, _data?: Data, _filename?: string): string {
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

    site.loadPages(options.extensions, loader, engine);

    function filter(string: string, _inline = false): string {
      return engine.renderSync(string?.toString() || "").trim();
    }

    site.filter("md", filter as Helper);
  };
}
