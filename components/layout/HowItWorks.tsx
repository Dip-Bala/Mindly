"use client"

export default function HowItWorks() {
  return (
    <section className="px-8 sm:px-16 py-16">
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-3">
        <Step number="01" title="Save">
          Capture anything from the web.
        </Step>
        <Step number="02" title="Organize">
          Memoir structures it automatically.
        </Step>
        <Step number="03" title="Recall">
          Ask questions. Get answers.
        </Step>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[--color-accent] font-medium">{number}</div>
      <h3 className="mt-2 font-medium text-lg">{title}</h3>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
        {children}
      </p>
    </div>
  );
}
