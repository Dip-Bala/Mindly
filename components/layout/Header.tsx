"use client";
import { Github } from "lucide-react";
import ToggleTheme from "../ui/ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 sm:p-8 bg-surface/50 ">
      <div className="font-logo text-xl font-bold text-text">
        Memoir<span className="text-primary">•</span>
      </div>

      <nav className="hidden sm:block text-text-secondary">
        Extension
      </nav>
<div className="flex gap-4 items-center text-text-muted">

      <ToggleTheme />
      <a href={'https://github.com/Dip-Bala/Memoir'} target="_blank"
      className="bg-surface border border-border rounded-full p-2 pointer-cursor text-text-secondary">
          <Github strokeWidth={1.5} />
      </a>
</div>
    </header>
  );
}
