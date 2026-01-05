"use client"

export default function CTA() {
  return (
    <section className="px-8 sm:px-16 py-20 text-center bg-[--color-surface-elevated]">
      <h2 className="text-3xl font-medium">
        Start building your second brain
      </h2>

      <p className="mt-4 text-[color:var(--color-text-secondary)]">
        Free to use. Upgrade when you need more power.
      </p>

      <button className="mt-8 px-8 py-3 rounded-lg bg-[--color-primary] hover:bg-[--color-primary-hover] text-white font-medium">
        Try Memoir
      </button>
    </section>
  );
}
