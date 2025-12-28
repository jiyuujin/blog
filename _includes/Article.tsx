import { Icon } from "./Icon.tsx";
import { StripeCheckout } from "./StripeCheckout.tsx";
import { getIcons } from "./utils.tsx";

export const layout = "base.tsx";

export default ({
  title,
  description,
  slug,
  publish_date,
  children,
  tags,
  reaction,
}) => (
  <>
    <header className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 border-b border-gray-100">
      <div className="max-w-4xl mx-auto w-full py-12 md:py-16">
        <div className="px-4 md:px-6 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 rounded-full">
            </div>
            <svg
              className="relative w-24 h-24 md:w-28 md:h-28 border-4 border-white rounded-full bg-gradient-to-br from-gray-900 to-gray-700 shadow-2xl"
              viewBox="0 0 300 300"
            >
              <circle
                cx="150"
                cy="150"
                r="140"
                stroke="white"
                strokeWidth="8"
                fill="url(#grad1)"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#1f2937", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#374151", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <text
                x="150"
                y="160"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="80"
                fill="white"
              >
                {reaction}
              </text>
            </svg>
          </div>

          <h1 className="mt-8 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {title ?? "個人ブログ"}
          </h1>

          {description && (
            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}

          <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
            <span className="font-medium text-gray-700">By jiyuujin</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            {publish_date && (
              <time
                dateTime={publish_date.toISOString()}
                className="font-medium"
              >
                {publish_date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            )}
          </div>

          {tags?.length > 0 && (
            <div className="mt-5 flex gap-2 flex-wrap justify-center">
              {tags
                .filter((tag: string) => tag.trim() !== "")
                .map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-xs md:text-sm bg-white text-gray-700 rounded-full font-medium border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </header>

    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-opacity-95">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-3">
          <ul className="flex gap-3">
            {getIcons().map((icon, idx) => (
              <li key={idx}>
                <a
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label={icon.name}
                >
                  <Icon name={icon.name} />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`https://b.hatena.ne.jp/entry/https://blog.nekohack.me/posts/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            data-hatena-bookmark-layout="touch-counter"
            title={`${title}をはてなブックマークに追加`}
          >
            <img
              src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
              alt={`${title}をはてなブックマークに追加`}
              width="18"
              height="18"
              style={{ border: "none" }}
            />
            <span className="text-xs font-medium text-gray-700 hidden sm:inline">
              ブックマーク
            </span>
          </a>
        </div>
      </div>
    </div>

    <main className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <article className="znc post-detail prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:shadow-xl prose-img:rounded-xl prose-img:shadow-lg">
        {children}
      </article>
    </main>

    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-32 -mt-32">
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -ml-32 -mb-32">
        </div>
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl mb-6 backdrop-blur-sm">
            <span className="text-4xl">📝</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            あなたの声を聞かせてください
          </h2>

          <p className="text-blue-50 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            この記事はいかがでしたか？あなたのフィードバックが、より良いコンテンツ作りの原動力になります。
          </p>

          <a
            href="https://form-app-website.pages.dev/survey/EKCJti4fvJv5KHW8xqsf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-blue-600 font-bold text-base md:text-lg rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            <span>アンケートに回答する</span>
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          <div className="mt-6 flex items-center justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>所要時間: 約2分</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>匿名回答可</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 md:px-6 pb-12">
      <div className="flex justify-center items-center gap-4 py-6 border-t border-b border-gray-200">
        <span className="text-sm font-medium text-gray-600">
          この記事をシェア:
        </span>
        <a
          href={`https://b.hatena.ne.jp/entry/https://blog.nekohack.me/posts/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-500 hover:text-white transition-all duration-200"
          data-hatena-bookmark-layout="touch-counter"
          title={`${title}をはてなブックマークに追加`}
        >
          <img
            src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
            alt={`${title}をはてなブックマークに追加`}
            width="18"
            height="18"
            style={{ border: "none" }}
          />
          <span className="text-sm font-medium">はてブ</span>
        </a>
      </div>
    </div>

    <StripeCheckout />

    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            © 2018–2025 nekohack Company. some rights reserved.
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
