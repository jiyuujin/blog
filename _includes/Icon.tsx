import { match } from "npm:ts-pattern@5.8.0";
import { GitHub } from "./icons/GitHub.tsx";
import { Mixi2 } from "./icons/Mixi2.tsx";
import { Medium } from "./icons/Medium.tsx";
import { Zenn } from "./icons/Zenn.tsx";
import { Mastodon } from "./icons/Mastodon.tsx";
import { Bluesky } from "./icons/Bluesky.tsx";
import { Twitter } from "./icons/Twitter.tsx";
import { Note } from "./icons/Note.tsx";

export interface IconProps {
  name:
    | "github"
    | "mixi2"
    | "medium"
    | "zenn"
    | "note"
    | "mastodon"
    | "bluesky"
    | "x_twitter";
}

export const Icon = (props: IconProps) => {
  const { name } = props;

  return match(name)
    .with("github", () => <GitHub />)
    .with("mixi2", () => <Mixi2 />)
    .with("medium", () => <Medium />)
    .with("zenn", () => <Zenn />)
    .with("note", () => <Note />)
    .with("mastodon", () => <Mastodon />)
    .with("bluesky", () => <Bluesky />)
    .with("x_twitter", () => <Twitter />)
    .exhaustive();
};
