import { prisma } from '@/app/libs/dbClient'

export async function GET() {
    try {
        return Response.json({ ...await prisma.playersHistory.findFirst() }, { status: 200 })
    } catch (err: any) {
        return Response.json({
            code: err.code,
            message: err.message
        })
    }
}