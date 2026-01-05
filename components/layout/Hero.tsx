export default function Hero() {
  return (
    <section className="p-8 sm:p-16 max-w-5xl mx-auto">
      <h1 className="text-5xl sm:text-6xl font-medium text-center sm:text-left">
        Your Second Brain for the Web
      </h1>

      <p className="mt-4 max-w-2xl text-md text-[color:var(--color-text-secondary)]">
        Save videos, tweets, links, articles & documents — all in one beautifully
        organized space.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 rounded-lg bg-[--color-primary] hover:bg-[--color-primary-hover] text-white font-medium">
          Get Started
        </button>

        <button className="px-6 py-3 rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-text)]">
          Learn More
        </button>
      </div>
    </section>
  );
}
