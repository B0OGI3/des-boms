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
    
    // Add path aliases for proper module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
      '@/app': require('path').resolve(__dirname, 'app'),
      '@/components': require('path').resolve(__dirname, 'app/components'),
      '@/ui': require('path').resolve(__dirname, 'app/components/ui'),
      '@/lib': require('path').resolve(__dirname, 'lib'),
      '@/types': require('path').resolve(__dirname, 'types'),
      '@/hooks': require('path').resolve(__dirname, 'hooks'),
      '@/utils': require('path').resolve(__dirname, 'utils'),
      '@/prisma': require('path').resolve(__dirname, 'prisma'),
      '@/batches': require('path').resolve(__dirname, 'app/batches'),
      '@/orders': require('path').resolve(__dirname, 'app/orders'),
      '@/api': require('path').resolve(__dirname, 'app/api'),
    };
    
    // Handle PDFKit font files properly
    if (isServer) {
      // Add server-specific aliases without overriding path aliases
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
