import type { Data as PageData } from "lume/core/file.ts";
import { BlogPost } from "./BlogPost.tsx";

export const BlogPosts = ({ posts }: { posts: PageData[] }) => (
  <div className="max-w-screen px-6">
    <ul
      id="blogMain"
      className="pt-16 lt-sm:pt-12 border-t-1 border-gray-300/80"
    >
      {posts.map((post, key) => (
        <li key={key} className="my-3">
          <BlogPost post={post} />
        </li>
      ))}
    </ul>
  </div>
);
