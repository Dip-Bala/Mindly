import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/a/***'), 
      new URL('https://avatars.githubusercontent.com/u/**?v=4')
    ],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
