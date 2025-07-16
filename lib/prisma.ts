/**
 * Prisma Database Client Configuration
 * 
 * This file sets up the Prisma client for database operations throughout the application.
 * Uses the custom generated client from the /generated/prisma directory.
 * 
 * Key features:
 * - Singleton pattern to prevent multiple client instances
 * - Query logging enabled for development debugging
 * - Hot reload safe for Next.js development
 */

import { PrismaClient } from "../generated/prisma";

// Global type extension for development hot reloading
// This prevents "ReferenceError: Cannot access 'globalForPrisma' before initialization"
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma Client Instance
 * 
 * Uses singleton pattern to ensure only one Prisma client exists.
 * In development, stores the client on globalThis to survive hot reloads.
 * In production, creates a new instance each time.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Log all database queries in development for debugging
  });

// Store client globally in development to prevent multiple instances during hot reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
