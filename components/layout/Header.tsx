"use client";
import ToggleTheme from "../ui/ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 sm:p-8 border-b border-[color:var(--color-border)]">
      <div className="font-logo text-xl font-bold text-[color:var(--color-text)]">
        Memoir<span className="text-[--color-accent]">•</span>
      </div>

      <nav className="hidden sm:block text-[color:var(--color-text-secondary)]">
        Extension
      </nav>

      <ToggleTheme />
    </header>
  );
}
