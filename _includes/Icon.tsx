import { match } from "npm:ts-pattern";
import { GitHub } from "./icons/GitHub.tsx";
import { Mastodon } from "./icons/Mastodon.tsx";
import { Bluesky } from "./icons/Bluesky.tsx";
import { Twitter } from "./icons/Twitter.tsx";

export interface IconProps {
  name: "github" | "mastodon" | "bluesky" | "x_twitter";
}

export const Icon = (props: IconProps) => {
  const { name } = props;

  return match(name)
    .with("github", () => <GitHub />)
    .with("mastodon", () => <Mastodon />)
    .with("bluesky", () => <Bluesky />)
    .with("x_twitter", () => <Twitter />)
    .exhaustive();
};
