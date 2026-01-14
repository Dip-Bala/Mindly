"use client";

import { useEffect } from "react";

interface TwitterProps {
  ID: string;
  username: string;
}

export default function Twitter({ ID, username }: TwitterProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).twttr) {
      (window as any).twttr.widgets.load();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => {
      (window as any).twttr?.widgets?.load();
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="overflow-y-auto h-48">
    <blockquote className="twitter-tweet overflow-y-auto">
      <a
        href={`https://twitter.com/${username}/status/${ID}`}
        target="_blank"
        rel="noopener noreferrer"
      />
    </blockquote>
    </div>
  );
}
