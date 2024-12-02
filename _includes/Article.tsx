import { Icon } from "./Icon.tsx";
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
    <header className="max-w-screen mx-auto w-full py-4">
      <div className="h-full px-6 flex flex-col items-center justify-center">
        <svg
          className="w-25 h-25 border-4 border-white rounded-full"
          background-color="black"
        >
          <circle
            cx="50%"
            r="150"
            stroke="white"
            strokeWidth="10"
            fill="black"
            opacity="50%"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="60"
          >
            {reaction}
          </text>
        </svg>
        <h1 className="mt-3 text-4xl text-gray-900 font-bold">
          {title ?? "個人ブログ"}
        </h1>
        {description && <p className="text-xl text-gray-600">{description}</p>}
        <p className="text-gray-500/80">
          <span>By {"jiyuujin"} at</span>
          {publish_date && (
            <time dateTime={publish_date.toISOString()}>
              {publish_date.toLocaleDateString("en-US")}
            </time>
          )}
        </p>
        <div className="flex gap-x-2 flex-wrap">
          {(tags ?? [])
            .filter((e) => !/^\s*$/.test(e))
            .map((tag: string) => (
              <div key={tag} className="text-bluegray-500 font-bold">
                {`#${tag}`}
              </div>
            ))}
        </div>
      </div>
    </header>

    <div className="max-w-screen px-6">
      <ul className="flex justify-center pt-4 lt-sm:pt-2">
        {getIcons().map((icon, key) => (
          <li key={key} className="mx-3 my-3">
            <a href={icon.url} target="_blank">
              <Icon name={icon.name} />
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div className="max-w-screen px-6 pt-2 mx-auto">
      <a
        href={`https://b.hatena.ne.jp/entry/https://blog.nekohack.me/posts/${slug}`}
        target="_blank"
        rel="noopenner noreferrer"
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

    <div className="max-w-screen px-6 pt-2 mx-auto">
      <article className="znc post-detail leading-loose">{children}</article>
    </div>

    <div className="max-w-screen px-6 pt-2 mx-auto">
      <a
        href={`https://b.hatena.ne.jp/entry/https://blog.nekohack.me/posts/${slug}`}
        target="_blank"
        rel="noopenner noreferrer"
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
  </>
);
