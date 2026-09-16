import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "",
  images: { unoptimized: true },
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  env: { NEXT_PUBLIC_BASE_PATH: "" },
};

export default nextConfig;
