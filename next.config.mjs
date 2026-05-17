// When deploying to GitHub Pages under <user>.github.io/<repo>, we need
// basePath/assetPrefix set to "/<repo>" so JS/CSS URLs resolve correctly.
// The GitHub Actions workflow sets NEXT_PUBLIC_BASE_PATH automatically.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',         // produces a fully static site in ./out
  trailingSlash: true,      // GitHub Pages serves /foo/ not /foo
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,      // next/image needs a server; turn off for static export
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
