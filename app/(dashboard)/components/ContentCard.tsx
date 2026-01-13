type ContentCardProps = {
  content: {
    _id: string;
    url: string;
    type: string;
    categoryId?: {
      name: string;
      color: string;
    };
    createdAt: string;
  };
};

export default function ContentCard({ content }: ContentCardProps) {
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
        bg-surface p-4
        hover:bg-surface-elevated
        transition
      "
    >
      {/* URL */}
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
  );
}
