import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },

  // Enable standalone output for Docker
  output: 'standalone',

  // Skip static optimization for problematic pages
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
      '@': path.resolve(__dirname),
      '@/app': path.resolve(__dirname, 'app'),
      '@/components': path.resolve(__dirname, 'app/components'),
      '@/ui': path.resolve(__dirname, 'app/components/ui'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/types': path.resolve(__dirname, 'types'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/utils': path.resolve(__dirname, 'utils'),
      '@/prisma': path.resolve(__dirname, 'prisma'),
      '@/batches': path.resolve(__dirname, 'app/batches'),
      '@/orders': path.resolve(__dirname, 'app/orders'),
      '@/api': path.resolve(__dirname, 'app/api'),
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
