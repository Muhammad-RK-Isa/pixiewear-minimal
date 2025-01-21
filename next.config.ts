import type { NextConfig } from "next";
import "./src/env";

const config: NextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        hostname: "tshn3x6zzn.ufs.sh",
      }
    ]
  },
};

export default config;
