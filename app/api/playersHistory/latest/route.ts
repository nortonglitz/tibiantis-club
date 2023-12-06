import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const latestRegister = await prisma.playersHistory.findFirst({ orderBy: { id: "desc" } })
        return Response.json({ ...latestRegister }, { status: 200 })
    } catch (err: any) {
        return Response.json({
            code: err.code,
            message: err.message
        })
    }
}