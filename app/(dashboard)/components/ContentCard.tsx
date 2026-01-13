

type ContentCardProps = {
  content: {
    _id: string;
    url: string;
    categoryId?: {
      name: string;
      color: string;
    };
    createdAt: string;
  };
};
function getContentType(url: string) {
  const lower = url.toLowerCase();

  if (/\.(png|jpg|jpeg|gif|webp)$/.test(lower)) return "image";
  if (lower.endsWith(".pdf")) return "pdf";
  if (/\.(mp4|webm|ogg)$/.test(lower)) return "video";

  // Cloudinary videos without extension
  if (url.includes("res.cloudinary.com") && url.includes("/video/")) {
    return "video";
  }

  return "link";
}

export default function ContentCard({ content }: ContentCardProps) {
  const type = getContentType(content.url);

  const hostname = (() => {
    try {
      return new URL(content.url).hostname.replace("www.", "");
    } catch {
      return content.url;
    }
  })();

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
      <div className="h-40 bg-background flex items-center justify-center">
        {type === "image" && (
          <img
            src={content.url}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        )}

        {type === "video" && (
          <video
            src={content.url}
            className="h-full w-full object-cover"
            controls
          />
        )}

        {type === "pdf" && (
          <div className="text-sm text-text-muted">
            📄 PDF Document
          </div>
        )}

        {type === "link" && (
          <div className="text-sm text-text-muted">
            🔗 Link
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-medium truncate hover:underline"
        >
          {content.url}
        </a>

        {/* Meta */}
        <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
          <span>{hostname}</span>

          {content.categoryId && (
            <span className="opacity-80">
              {content.categoryId.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
