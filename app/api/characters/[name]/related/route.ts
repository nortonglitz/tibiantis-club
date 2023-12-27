import { prisma } from '@/app/libs/dbClient'
import { getMinutes, set } from 'date-fns'

export const dynamic = 'force-dynamic'

type Query = { params: { name: string } }

export async function GET(req: Request, query: Query) {

    try {
        const { params: { name } } = query

        const parsedName = name.replaceAll('-', ' ').toLowerCase()

        if (parsedName.length < 3) {
            return Response.json({ message: "Name too small. Need at least 3 letters." }, { status: 406 })
        }

        const character = await prisma.character.findUnique({
            where: {
                name: parsedName
            }
        })

        if (!character) {
            return Response.json({ message: "Name not listed in database." }, { status: 406 })
        }

        const sessions = await prisma.playerSession.findMany({
            where: { characterId: character.id }
        })

        if (!sessions || sessions.length < 5) {
            return Response.json({ message: "Not enough sessions to find related characters." }, { status: 200 })
        }

        const sessionSearchesPromises = sessions.map(async ({ endedAt }) => {
            return await prisma.playerSession.findMany({
                where: {
                    startedAt: {
                        gte: set(endedAt, { milliseconds: 0 }),
                        lte: set(endedAt, { minutes: getMinutes(endedAt) + 4, milliseconds: 999 })
                    }
                },
                select: {
                    characterId: true
                }
            })
        })

        const sessionsFound = await Promise.all(sessionSearchesPromises)

        console.log(sessionsFound)

        const relatedSessions = sessionsFound.reduce(sessionFound => {
            return sessionFound
        }, [] as { characterId: string }[])

        const relatedChars = relatedSessions.reduce((acc, { characterId }) => {
            return {
                [characterId]: acc.characterId++
            }
        }, {} as any)

        return Response.json({
            relatedChars
        })
    } catch (err: any) {
        console.log(err.code, err.message)
        Response.json({
            message: "Something went wrong"
        })
    }
}