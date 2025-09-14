import { Icon } from "./Icon.tsx";
// import { StripeCheckout } from "./StripeCheckout.tsx";
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
    <header className="max-w-screen-xl mx-auto w-full py-8">
      <div className="px-6 flex flex-col items-center text-center">
        <svg
          className="w-24 h-24 border-4 border-white rounded-full bg-black bg-opacity-50"
          viewBox="0 0 300 300"
        >
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="white"
            strokeWidth="10"
            fill="black"
            opacity="0.5"
          />
          <text
            x="150"
            y="150"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="60"
            fill="white"
          >
            {reaction}
          </text>
        </svg>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          {title ?? "個人ブログ"}
        </h1>
        {description && (
          <p className="mt-2 text-lg text-gray-600">{description}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          <span>By jiyuujin at</span>
          {publish_date && (
            <time dateTime={publish_date.toISOString()}>
              {publish_date.toLocaleDateString("en-US")}
            </time>
          )}
        </p>
        {tags?.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap justify-center">
            {tags
              .filter((tag: string) => tag.trim() !== "")
              .map((tag: string) => (
                <span key={tag} className="text-sm text-gray-500 font-medium">
                  #{tag}
                </span>
              ))}
          </div>
        )}
      </div>
    </header>

    <div className="max-w-screen-xl mx-auto px-6">
      <ul className="flex justify-center py-4">
        {getIcons().map((icon, idx) => (
          <li key={idx} className="mx-3">
            <a href={icon.url} target="_blank" rel="noopener noreferrer">
              <Icon name={icon.name} />
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div className="max-w-screen-xl mx-auto px-6">
      <a
        href={`https://b.hatena.ne.jp/entry/https://blog.nekohack.me/posts/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hatena-bookmark-button"
        data-hatena-bookmark-layout="touch-counter"
        title={`${title}をはてなブックマークに追加`}
      >
        <img
          src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
          alt={`${title}をはてなブックマークに追加`}
          width="20"
          height="20"
          style={{ border: "none" }}
        />
      </a>
    </div>

    <div className="max-w-screen-xl mx-auto px-6 pt-6">
      <article className="znc post-detail leading-loose">{children}</article>
    </div>

    <div className="max-w-screen-xl mx-auto px-6 pt-4">
      <a
        href={`https://b.hatena.ne.jp/entry/https://blog.nekohack.me/posts/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hatena-bookmark-button"
        data-hatena-bookmark-layout="touch-counter"
        title={`${title}をはてなブックマークに追加`}
      >
        <img
          src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
          alt={`${title}をはてなブックマークに追加`}
          width="20"
          height="20"
          style={{ border: "none" }}
        />
      </a>
    </div>

    {/* <StripeCheckout /> */}

    <footer className="max-w-screen-xl mx-auto px-6 py-6 text-center">
      <p className="text-sm text-gray-600">
        © 2018–2025 nekohack Company. some rights reserved.
      </p>
    </footer>
  </>
);
