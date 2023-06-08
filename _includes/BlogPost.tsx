import type { PageData } from "lume/core.ts";
import { joinUrl } from "./utils.tsx";

export const BlogPost = ({ post }: { post: PageData }) => (
  <div className="pt-12 first:pt-0">
    <h3 className="text-2xl font-bold">
      <a
        href={joinUrl(post.data.url)}
        className="text-blue-500 cursor-pointer"
        title={post.data.title}
      >
        {post.data.title}
      </a>
    </h3>

    <div className="flex gap-x-2 flex-wrap">
      {(post.data.tags ?? []).filter((e) => !(/^\s*$/.test(e)))
        .map((tag: string) => (
          <div class="text-bluegray-500 font-bold">{`#${tag}`}</div>
        ))}
    </div>

    <p className="text-gray-500/80">
      <span>By {"jiyuujin"}</span>
      {post.data.publish_date && (
        <time dateTime={post.data.publish_date.toISOString()}>
          {` at ${post.data.publish_date.toLocaleDateString("en-US")}`}
        </time>
      )}
    </p>

    {!post.data.url && post.data.url !== "/README/" && (
      <p className="mt-3">
        <a
          className="leading-tight text-gray-900 inline-block border-b-1 border-gray-600 hover:text-gray-500 hover:border-gray-500 transition-colors"
          href={joinUrl(post.data.url)}
          title={`Read "${post.data.title}"`}
        >
          Read More
        </a>
      </p>
    )}
  </div>
);
