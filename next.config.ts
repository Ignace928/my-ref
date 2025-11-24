import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,//autorisé pour les adresse ip privé (127.0.0.0 sans nom de dommaine)
    remotePatterns:[
      {
        protocol: "http",//important
        hostname: "127.0.0.1",//important
        port:"9000",
        pathname: "/mock-pokemon/**"
      }
    ],
    unoptimized: true //autorisé pour les adresse ip privé (127.0.0.0 sans nom de dommaine)
  }
};

export default nextConfig;
