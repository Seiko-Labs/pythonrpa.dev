import { PrismaClient } from "@prisma/client";
import { config } from "./config";
import { logger } from "./log";

const prismaClientSingleton = (): PrismaClient => new PrismaClient();

declare global {
  // eslint-disable-next-line no-var -- var is used to merge with the global namespace
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

export async function healthCheck(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error("DB healthcheck failed: %O", error);
    return false;
  }
}

if (config.NODE_ENV !== "production") globalThis.prisma = prisma;
