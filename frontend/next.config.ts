import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  compiler: {
    styledComponents: true, // Libera o SWC para compilar os estilos
  },
};

export default nextConfig;
