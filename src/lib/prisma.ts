// Import PrismaClient from the generated Prisma client
import { PrismaClient } from '@prisma/client';

// Extend the globalThis type to include our PrismaClient instance
// This prevents re-creating the PrismaClient on every hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize PrismaClient:
// - Use existing instance if one exists (globalForPrisma.prisma)
// - Otherwise create new instance with query logging enabled
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query']
  });

// In development, save the instance to avoid duplicates during hot reload
// In production, this is not needed as the instance persists naturally
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
