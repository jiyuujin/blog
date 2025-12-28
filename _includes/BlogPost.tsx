import type { Data as PageData } from "lume/core/file.ts";
import { joinUrl } from "./utils.tsx";

export const BlogPost = ({ post }: { post: PageData }) => {
  const url = joinUrl(post.data.url);
  const shouldShowReadMore = post.data.url && post.data.url !== "/README/";

  return (
    <article className="group relative bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
        <a
          href={url}
          className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
          title={post.data.title}
        >
          {post.data.title}
        </a>
      </h3>

      <div className="flex items-center gap-3 text-sm mb-4">
        {post.data.publish_date && (
          <>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <time
              dateTime={post.data.publish_date.toISOString()}
              className="font-medium text-gray-500"
            >
              {post.data.publish_date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </>
        )}
      </div>

      {post.data.tags && post.data.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-5">
          {post.data.tags
            .filter((tag: string) => tag.trim() !== "")
            .map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs md:text-sm bg-gray-100 text-gray-700 rounded-full font-medium border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
              >
                #{tag}
              </span>
            ))}
        </div>
      )}

      {post.data.description && (
        <p className="text-gray-600 leading-relaxed mb-5 line-clamp-2">
          {post.data.description}
        </p>
      )}

      {shouldShowReadMore && (
        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-200 pt-2">
          <span>続きを読む</span>
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      )}
    </article>
  );
};
