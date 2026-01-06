import type { NextConfig } from "next";
import "./src/env";

const config: NextConfig = {
  images: {
    minimumCacheTTL: 31_536_000,
    remotePatterns: [
      {
        hostname: "e5l1qq20b7.ufs.sh",
        protocol: "https",
        pathname: "/**",
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  cacheComponents: true,
};

export default config;
