import type { NextConfig } from "next";
import "./src/env";

const config: NextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        hostname: "e5l1qq20b7.ufs.sh",
        protocol: "https",
        pathname: "/**",
      }
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    ppr: "incremental",
    reactCompiler: {
      compilationMode: "annotation",
    }
  }
};

export default config;
