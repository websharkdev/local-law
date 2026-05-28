import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

/** pg v9 will treat require/prefer/verify-ca as libpq aliases; use verify-full explicitly. */
const resolveDatabaseUrl = (url: string) => {
    const parsed = new URL(url)
    const sslmode = parsed.searchParams.get('sslmode')
    const legacySslModes = new Set(['prefer', 'require', 'verify-ca'])

    if (sslmode && legacySslModes.has(sslmode)) {
        parsed.searchParams.set('sslmode', 'verify-full')
    }

    return parsed.toString()
}

const prismaClientSingleton = () => {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not set')
    }

    const connectionString = resolveDatabaseUrl(databaseUrl)
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
