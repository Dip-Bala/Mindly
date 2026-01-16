import {
  ChevronRight,
  FileText,
  Github,
  Globe,
  Instagram,
  Link,
  MoveRight,
  SquarePlay,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="p-8 sm:p-16 max-w-5xl mx-auto flex flex-col items-center gap-4">
      <h1 className="text-5xl sm:text-6xl font-bold text-center ">
        Your second brain for everything you find online.
      </h1>

      <p className="mt-4 text-xl text-text-secondary text-center">
        Save videos, tweets, links, articles & documents — all in one
        beautifully organized space.
      </p>
      <div className="flex text-text itmes-center justify-center gap-2 my-8 max-w-sm bg-surface rounded-full border border-border px-4 py-1">
        <Link size={30} strokeWidth={0.5} />
        <FileText size={30} strokeWidth={0.5} />
        <SquarePlay size={30} strokeWidth={0.5} />
        <Instagram size={30} strokeWidth={0.5} />
        <Github size={30} strokeWidth={0.5} />
        <Globe size={30} strokeWidth={0.5} />
      </div>
      <div className="flex justify-center">
      <div className="flex gap-8">
         <a href=""
          
          className="px-6 py-3 rounded-lg bg-primary text-black font-medium flex gap-1 border border-border cursor-pointer"
        >
          Get Extension 
        </a>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 rounded-lg text-text font-medium flex gap-1 border cursor-pointer border-text items-center"
        >
          Get Started <ChevronRight size={20} strokeWidth={2}/>
        </button>
      </div>
      </div>
          <p className="mt-4 text-sm text-text-secondary text-center">
  The extension saves pages instantly — nothing is shared publicly.
</p>
    </section>
  );
}
