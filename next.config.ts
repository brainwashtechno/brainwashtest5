import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The old News page was folded into Events.
    return [{ source: "/news", destination: "/events", permanent: true }];
  },
};

export default nextConfig;
