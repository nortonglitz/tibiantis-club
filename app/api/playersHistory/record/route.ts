import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

export async function GET() {

    const today = new Date()

    try {
        const playersOnlineRecordDoc = await prisma.playersOnlineRecord.findFirst({
            where: { world: "Tibiantis" }
        })

        if (playersOnlineRecordDoc) {
            return Response.json({ playersOnlineRecord: playersOnlineRecordDoc.quantity }, { status: 200 })
        }

        return Response.json({ message: "Players online record not available" }, { status: 204 })
    } catch (err: any) {
        return Response.json({
            code: err.code,
            message: err.message
        }, { status: 500 })
    }
}