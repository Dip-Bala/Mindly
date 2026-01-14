import { Link, SquareArrowOutUpRight } from "lucide-react";
import { useMemo } from "react";
import Twitter from "./Twitter";

type ContentCardProps = {
  content: {
    _id: string;
    url: string;
    categoryId?: {
      name: string;
      color: string;
    };
    domain: string;
    title: string;
    type: string;
    createdAt: string;
  };
};

export default function ContentCard({ content }: ContentCardProps) {
  const tweetInfo =
    content.domain === "x.com" ? extractTweetDetails(content.url) : null;

  console.log("tweetInfo", tweetInfo);

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
          <img
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

        {content.type === "link" && content.domain !== "x.com" && <Link />}
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
