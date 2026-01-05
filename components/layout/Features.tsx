"use client"
export default function Features() {
  const features = [
    {
      title: "Save Anything",
      desc: "Capture videos, tweets, articles, PDFs and links with one click.",
    },
    {
      title: "AI-Powered Recall",
      desc: "Ask questions and instantly retrieve exactly what you saved.",
    },
    {
      title: "Organized Automatically",
      desc: "Smart tagging and collections without manual effort.",
    },
  ];

  return (
    <section className="px-8 sm:px-16 py-16 bg-[--color-surface]">
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-xl border border-[color:var(--color-border)]"
          >
            <h3 className="font-medium text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
