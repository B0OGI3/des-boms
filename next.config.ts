import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Performance optimizations
  compress: true,
  trailingSlash: false,
  
  // Webpack configuration to resolve case sensitivity issues
  webpack: (config, { dev, isServer }) => {
    // Ensure case-sensitive module resolution
    config.resolve.symlinks = false;
    
    // Add case-sensitive handling for Windows filesystem
    config.resolve.cache = false;
    
    // Handle PDFKit font files properly
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false, // Disable canvas for server-side
      };
      
      // Copy PDFKit font files to the build
      config.module.rules.push({
        test: /\.(afm)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]',
        },
      });
    }
    
    // Suppress case sensitivity warnings in development
    if (dev && !isServer) {
      config.infrastructureLogging = {
        level: 'error',
      };
      
      // Ignore case sensitivity warnings
      config.ignoreWarnings = [
        {
          module: /node_modules/,
          message: /names that only differ in casing/,
        },
      ];
    }
    
    return config;
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
