import type { Data as PageData } from "lume/core/file.ts";
import { BlogPost } from "./BlogPost.tsx";

export const BlogPosts = ({ posts }: { posts: PageData[] }) => (
  <div className="max-w-4xl mx-auto px-4 md:px-6">
    <div className="py-12 md:py-16">
      <ul id="blogMain" className="space-y-8 md:space-y-12">
        {posts.slice(1).map((post, key) => (
          <li key={key}>
            <BlogPost post={post} />
          </li>
        ))}
      </ul>

      {posts.length > 10 && (
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            全 {posts.length} 件の記事
          </p>
        </div>
      )}
    </div>
  </div>
);
