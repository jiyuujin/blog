import type { Data } from "lume/core.ts";
import { title } from "./_config.ts";
import { BlogPosts } from "./_includes/BlogPosts.tsx";
import { getPosts } from "./_includes/utils.tsx";

export const layout = "base.tsx";

export default (_: Data) => {
  const posts = getPosts();

  return (
    <div className="flex justify-center flex-col gap-y-4">
      <header className="w-full h-30 lt-sm:h-96 bg-cover bg-center bg-no-repeat">
        <div className="h-full px-6 mx-auto flex flex-col items-center justify-center">
          <h1 className="mt-3 text-4xl text-gray-900 font-bold">{title}</h1>
        </div>
      </header>
      <BlogPosts posts={posts} />
    </div>
  );
};
