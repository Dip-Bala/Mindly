"use client"

export default function Footer() {
  return (
    <footer className="px-8 sm:px-16 py-8 border-t border-[color:var(--color-border)] text-sm text-[color:var(--color-text-muted)]">
      © {new Date().getFullYear()} Memoir. All rights reserved.
    </footer>
  );
}
