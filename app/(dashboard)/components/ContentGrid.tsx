import ContentCard from "./ContentCard";

type ContentGridProps = {
  content: any[];
};

export default function ContentGrid({ content }: ContentGridProps) {
  if (!content.length) {
    return (
      <div className="text-sm text-text-muted">
        No content yet.
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {content.map((item) => (
        <ContentCard key={item._id} content={item} />
      ))}
    </div>
  );
}
