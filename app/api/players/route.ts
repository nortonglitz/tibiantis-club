import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const playersOnlineDoc = await prisma.playersOnline.findMany({
            orderBy: {
                name: "asc"
            }
        })
        return Response.json({ players: [...playersOnlineDoc] }, { status: 200 })
    } catch (err: any) {
        return Response.json({
            code: err.code,
            message: err.message
        }, { status: 500 })
    }
}