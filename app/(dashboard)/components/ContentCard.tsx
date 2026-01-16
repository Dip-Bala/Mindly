import { Link, SquareArrowOutUpRight } from "lucide-react";
import { useMemo } from "react";
import Image from "next/image";
import Twitter from "./Twitter";

type ContentProps = {
  _id: string;
  url: string;
  categoryId?: {
    name: string;
  };
  domain: string;
  title: string;
  type: string;
  logoId?: {
    _id: string;
    title: string;
    category: string;
    route: {
      dark?: string;
      light?: string;
      url?: string;
    };
    url: string;
  };
  createdAt: string;
};
type ContentCardProps = {
  content: ContentProps;
  theme: "dark" | "light";
};

export default function ContentCard({ content, theme }: ContentCardProps) {
  // console.log("content", content)
  const tweetInfo =
    content.domain === "x.com" ? extractTweetDetails(content.url) : null;

  const previewImage = getLinkPreviewImage(content, theme);

  console.log(previewImage);
  return (
    <div
      className="
        rounded-lg border border-border
        bg-surface
        hover:bg-surface-elevated
        transition
        overflow-hidden
      "
    >
      {/* Preview */}
      <div className="p-2 bg-surface ">
        <div className="h-48 bg-bg flex items-center justify-center object-cover rounded-lg">
          {content.type === "image" && (
            <Image
              width={40}
              height={40}
              src={content.url}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          )}

          {content.type === "video" && content.domain !== "youtube.com" && (
            <video
              src={content.url}
              className="h-full w-full object-cover"
              controls
            />
          )}

          {content.type === "video" && content.domain === "youtube.com" && (
            <iframe
              width=""
              src={`${getYouTubeEmbedUrl(content.url)} `}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {content.type === "pdf" && (
            <div className="text-sm text-text-muted">
              <img
                src={content.url.replace(".pdf", ".jpg")}
                className="h-48 object-cover"
              />
            </div>
          )}

          {content.type === "link" && content.domain === "x.com" && (
            <Twitter ID={tweetInfo!.xId} username={tweetInfo!.username} />
          )}

          {content.type === "link" && content.domain !== "x.com" ? (
            previewImage ? (
              <img
                src={previewImage}
                alt={content.logoId?.title || content.domain}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <Link />
            )
          ) : null}

          {/* {content.type === "link"  &&  content.domain !== "x.com"  && <Link/>} */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 border-t border-border flex flex-col gap-1">
        <h3>{content.title}</h3>
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-normal truncate hover:underline text-text-secondary cursor-pointer"
        >
          {content.url}
        </a>

        {/* Meta */}
        <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
          <span>type:{content.type}</span>
          <span>domain: {content.domain}</span>

          {content.categoryId && (
            <span className="opacity-80">{content.categoryId.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    // youtu.be/<id>
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }

    // youtube.com/watch?v=<id>
    if (parsed.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    return url;
  } catch {
    return url;
  }
}

function extractTweetDetails(
  url: string
): { username: string; xId: string } | null {
  const regex = /x\.com\/([^\/]+)\/status\/(\d+)/;
  const match = url.match(regex);
  if (match && match.length === 3) {
    return {
      username: match[1],
      xId: match[2],
    };
  }
  return null;
}

function getLinkPreviewImage(
  content: {
    domain: string;
    logoId?: {
      route?: { light?: string | null; dark?: string | null } | null;
    };
  },
  theme: "light" | "dark"
) {
  // 1️⃣ SVGL themed logo
  const themedLogo =
    content.logoId?.route &&
    (theme === "dark" ? content.logoId.route.dark : content.logoId.route.light);

  if (themedLogo) return themedLogo;

  // 2️⃣ Google favicon fallback
  if (content.domain) {
    return `https://www.google.com/s2/favicons?sz=64&domain=${content.domain}`;
  }

  // 3️⃣ Nothing usable
  return null;
}
