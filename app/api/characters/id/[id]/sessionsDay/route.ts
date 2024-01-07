import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { id: string } }

export async function GET(req: Request, query: Query) {
    try {

        const { params: { id } } = query

        if (id.length < 24) {
            return Response.json({ message: "Invalid character Id." }, { status: 406 })
        }

        const sessionsDay = await prisma.playerSessionDay.findMany({
            where: {
                characterId: id
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                createdAt: true,
                startLevel: true,
                endLevel: true,
                expGained: true,
                duration: true

            },
            take: 7
        })

        if (!sessionsDay || sessionsDay.length < 1) {
            return Response.json({ sessionsDay: [] }, { status: 200 })
        }

        return Response.json({ sessionsDay }, { status: 200 })

    } catch (err: any) {
        console.error(err.message)
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }
}