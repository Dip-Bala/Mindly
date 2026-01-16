"use client";

import { Copyright, Github, Linkedin, Mail,  MoveUpRight} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-8 sm:px-16 pt-10 bg-surface border-t border-border">
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-3">

        {/* Brand */}
        <div className="space-y-3">
          <div className="font-logo text-lg font-bold text-text">
            Memoir<span className="text-primary">•</span>
          </div>
          <p className="text-sm text-text-secondary max-w-xs">
            A personal knowledge system for saving, organizing, and recalling
            what you find online.
          </p>
        </div>

        {/* Legal */}
        <div className="space-y-2 text-sm">
          <h4 className="font-medium text-text">Legal</h4>
          <Link
            href="/privacy"
            className="text-text-secondary hover:text-text flex "
          >
            Privacy Policy <MoveUpRight size={18} strokeWidth={1.25} />
          </Link>
          <Link
            href="/terms"
            className=" text-text-secondary hover:text-text flex"
          >
            Terms of Service <MoveUpRight size={18} strokeWidth={1.25} />
          </Link>
        </div>

        {/* Creator */}
        <div className="space-y-3 text-sm">
          <h4 className="font-medium text-text">Creator</h4>

          <span className="block text-text-secondary">
            Built and maintained by  
            <a
              href="https://dbala.live"
              target="_blank"
              className="italic underline flex"
              aria-label="Portfolio"
            >
              Dipanwita Bala <MoveUpRight size={18} strokeWidth={1.25} />
            </a>
            
          </span>

          <div className="flex gap-2">
            <a
              href="https://github.com/Dip-Bala"
              target="_blank"
              className="p-2 border border-border rounded-full hover:bg-bg"
              aria-label="GitHub"
            >
              <Github size={18} strokeWidth={1.25} />
            </a>

            <a
              href="https://www.linkedin.com/in/dipanwita-bala-21999c/"
              target="_blank"
              className="p-2 border border-border rounded-full hover:bg-bg"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.25} />
            </a>

            <a
              href="mailto:dipanwita.bala@gmail.com"
              className="p-2 border border-border rounded-full hover:bg-bg"
              aria-label="Email"
            >
              <Mail size={18} strokeWidth={1.25} />
            </a>

            <a
              href="https://dbala.live"
              target="_blank"
              className="p-2 hover:bg-bg italic"
              aria-label="Portfolio"
            >
              portfolio 
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <Copyright size={16} strokeWidth={1.25} />
          <span>{new Date().getFullYear()} Memoir</span>
        </div>

        <span>
          Logos and trademarks belong to their respective owners.
        </span>
      </div>

      {/* Decorative grid */}
      <div className="mt-6 bg-dot-grid w-full h-16" />
    </footer>
  );
}
