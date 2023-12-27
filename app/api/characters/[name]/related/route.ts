import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { name: string } }

export async function GET(req: Request, query: Query) {

    const { params: { name } } = query

    const parsedName = name.toLowerCase()

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
        return Response.json({ relatedChars: [] }, { status: 200 })
    }

    let relatedCharsArray: { characterId: string }[] = []

    sessions.forEach(async ({ endedAt }) => {
        const foundChars = await prisma.playerSession.findMany({
            where: {
                startedAt: endedAt
            },
            select: {
                characterId: true
            }
        })
        relatedCharsArray = [...relatedChars, ...foundChars]
    })

    const relatedChars = relatedCharsArray.reduce((acc, { characterId }) => {
        return {
            [characterId]: acc.characterId++
        }
    }, {} as any)

    return Response.json({
        relatedChars
    })
}