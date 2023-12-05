import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma || new PrismaClient({
        datasources: {
            db: {
                url: process.env.NODE_ENV !== 'production' ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI
            }
        }
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
