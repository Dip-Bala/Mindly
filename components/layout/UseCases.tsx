"use client";

export function UseCases() {
  const cases = [
    {
      title: "Learning & revision",
      desc: "Save tutorials and articles. Ask Memoir to explain concepts using what you already studied.",
    },
    {
      title: "Research & writing",
      desc: "Pull relevant points from saved sources without re-reading everything.",
    },
    {
      title: "Ideas worth keeping",
      desc: "Save posts, threads, and links you know you’ll want again — and actually find them later.",
    },
  ];

  return (
    <section className="px-8 sm:px-16 py-16">
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-3">
        {cases.map((c) => (
          <div key={c.title} className="p-6 rounded-xl border border-border">
            <h3 className="font-medium">{c.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
