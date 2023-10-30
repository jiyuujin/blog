export const layout = "base.tsx";

export default ({
  title,
  description,
  publish_date,
  children,
  tags,
  reaction,
}) => (
  <>
    <header className="max-w-screen mx-auto w-full h-120">
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

    <div className="max-w-screen px-6 pt-2 mx-auto">
      <article className="znc post-detail leading-loose">{children}</article>
    </div>
  </>
);
