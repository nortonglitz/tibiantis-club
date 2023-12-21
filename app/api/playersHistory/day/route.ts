import { prisma } from '@/app/libs/dbClient'
import { subDays } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET() {

    const today = new Date()

    try {
        const dayPlayersOnlineDoc = await prisma.playersHistory.findMany({
            where: {
                createdAt: {
                    lte: today,
                    gte: subDays(today, 1)
                }
            }
        })
        return Response.json({ dayPlayers: [...dayPlayersOnlineDoc] }, { status: 200 })
    } catch (err: any) {
        return Response.json({
            code: err.code,
            message: err.message
        }, { status: 500 })
    }
}