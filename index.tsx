import type { Data } from "lume/core/file.ts";
import { title } from "./_config.ts";
import { BlogPosts } from "./_includes/BlogPosts.tsx";
import { getIcons, getPosts } from "./_includes/utils.tsx";
import { Icon } from "./_includes/Icon.tsx";

export const layout = "base.tsx";

export default async (_: Data) => {
  const posts = await getPosts();

  return (
    <>
      <header className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto w-full py-16 md:py-24">
          <div className="px-4 md:px-6 flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 rounded-full">
              </div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                <span className="text-4xl md:text-5xl">✍️</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>

            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl">
              技術、開発、日々の学びを綴るブログ
            </p>

            <ul className="flex gap-3 mt-8">
              {getIcons().map((icon, key) => (
                <li key={key}>
                  <a
                    href={icon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-white border-2 border-gray-200 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={icon.name}
                  >
                    <Icon name={icon.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <BlogPosts posts={posts} />

      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">
              © 2018–2025 nekohack inc. some rights reserved.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              {getIcons().map((icon, idx) => (
                <a
                  key={idx}
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label={icon.name}
                >
                  <Icon name={icon.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
