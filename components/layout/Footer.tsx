"use client";

import { Copyright, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-8 sm:px-16 pt-8 bg-surface ">
      <div>
        <a href="https://github.com/Dip-Bala" target="_blank"
        className="p-2 border border-border rounded-full hover:bg-bg cursor-pointer"
        >
          <Github strokeWidth={1.25} size={18}/>
    
        </a>
        <a href="https://www.linkedin.com/in/dipanwita-bala-21999c/" target="_blank"
        className="p-2 border border-border rounded-full hover:bg-bg cursor-pointer"
        >
          <Linkedin strokeWidth={1.25} size={18}/>
        </a>
      </div>
      <div className=" text-text-secondary text-sm flex items-center gap-2 py-4">
        <span>Copyright </span>
        <Copyright size={18} strokeWidth={1.25} />
        <span>{new Date().getFullYear()}</span>
        <span>Memoir</span>
      </div>
      <div className="bg-dot-grid w-full h-18">
      </div>
    </footer>
  );
}
