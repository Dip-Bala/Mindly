
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  return (
    <section className="px-8 sm:px-16 py-20 text-center bg-surface-elevated flex flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-medium ">
  Start remembering what you save
</h2>

<p className="mt-4 text-text-secondary ">
  Memoir is free to use. Add AI-powered recall when you need it.
</p>

      {/* <button className="mt-8 px-8 py-3 rounded-lg bg-[--color-accent] hover:bg-[--color-primary-hover] text-white font-medium">
        Try Memoir
      </button> */}
       <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 rounded-lg text-text font-medium flex gap-1 border border-border cursor-pointer items-center bg-surface"
        >
          Try Memoir <ChevronRight size={20} strokeWidth={2}/>
        </button>
    </section>
  );
}
