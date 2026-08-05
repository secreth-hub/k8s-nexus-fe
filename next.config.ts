import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the slim multi-stage Dockerfile pattern — bundles a
  // minimal server + only the deps actually used, into .next/standalone.
  output: "standalone",
};

export default nextConfig;
