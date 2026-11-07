/**
 * Static export so the site can be hosted for free on GitHub Pages.
 * NEXT_PUBLIC_BASE_PATH is set by the GitHub Actions workflow to "/<repo-name>".
 * Locally it's empty, so everything works at http://localhost:3000.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
