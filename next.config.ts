import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**", // Adjust the route as needed (See Strapi values)
      },
    ],
  },
};

export default nextConfig;
