// lib/resolveLogo.ts
import { Logo } from "@/models/Logo";

function getAppNameFromDomain(domain: string) {
  // dev.to → dev
  // axiom.co → axiom
  // www.github.com → github

  return domain
    .replace("www.", "")        //www.github.com -> github.com
    .split(".")[0]              //"github.com" -> ["github", "com"][0] -> github
    .toLowerCase();
}

export async function resolveLogoFromSVGL(domain: string) {
  const key = getAppNameFromDomain(domain);

  const cached = await Logo.findOne({ key });
  if (cached) return cached;


  const res = await fetch(
    `https://api.svgl.app?search=${encodeURIComponent(key)}`
  );

  if (!res.ok) return null;

  const data = await res.json();
  if (!data || !data.length) return null;

  const logo = data[0];

  const saved = await Logo.create({
    key,
    title: logo.title,
    category: logo.category,
    url: logo.url,
    route: logo.route,
  });

  return saved;
}
