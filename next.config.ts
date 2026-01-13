import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/a/***')],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
