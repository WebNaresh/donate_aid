import { PrismaClient } from "@prisma/client";

// Use a global variable for Prisma to prevent multiple instances in development
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable detailed logging
  });

// Save Prisma instance to the global object in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
