"use client";

export function WhyMemoir() {
  const points = [
    {
      title: "Built for recall, not just storage",
      desc: "Memoir is designed around finding things later — not just saving them and forgetting.",
    },
    {
      title: "Answers come from what you saved",
      desc: "When you ask a question, Memoir only uses your saved links and notes. No guessing.",
    },
    {
      title: "Light structure, no busywork",
      desc: "Use categories if you want. Memoir stays useful even if you don’t organize perfectly.",
    },
  ];

  return (
    <section className="px-8 sm:px-16 py-20">
      <div className="max-w-5xl mx-auto grid gap-12 sm:grid-cols-3">
        {points.map((p) => (
          <div key={p.title}>
            <h3 className="font-medium text-lg">{p.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
