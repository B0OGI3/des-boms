import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Health Check API Endpoint
 * 
 * Provides comprehensive system health monitoring for the DES-BOMS application.
 * This endpoint is used by:
 * - Load balancers for health checking
 * - Monitoring systems for uptime tracking
 * - The /health dashboard page for visual status display
 * - DevOps teams for system diagnostics
 * 
 * @returns JSON response with system health status
 */
export async function GET() {
  try {
    // Test database connectivity with a simple query
    // This ensures the database is accessible and responsive
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbTime = Date.now() - dbStart;

    // Return comprehensive health status
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(), // How long the Node.js process has been running
        environment: process.env.NODE_ENV || 'development',
        database: {
          status: 'connected',
          responseTime: `${dbTime}ms` // Database response time for performance monitoring
        },
        version: process.env.npm_package_version || '0.1.0',
        platform: {
          os: process.platform,    // Operating system (linux, win32, darwin)
          arch: process.arch,      // CPU architecture (x64, arm64)
          node: process.version    // Node.js version
        }
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Health check failed:', error);
    
    // Return error status with diagnostic information
    // This helps identify what specifically is failing
    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        timestamp: new Date().toISOString(),
        database: {
          status: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        platform: {
          os: process.platform,
          arch: process.arch,
          node: process.version
        }
      },
      { status: 500 } // Internal Server Error status code
    );
  }
}
