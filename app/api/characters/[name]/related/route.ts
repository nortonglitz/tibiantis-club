import { prisma } from '@/app/libs/dbClient'

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
            console.log('Pouca sessão.')
            return Response.json({ message: "Not enough sessions to find related characters." }, { status: 200 })
        }

        let relatedCharsArray: { characterId: string }[] = []

        sessions.forEach(async ({ endedAt }) => {
            const relatedSessionsFound = await prisma.playerSession.findMany({
                where: {
                    startedAt: endedAt
                },
                select: {
                    characterId: true
                }
            })
            relatedCharsArray = [...relatedCharsArray, ...relatedSessionsFound]
        })

        const relatedChars = relatedCharsArray.reduce((acc, { characterId }) => {
            console.log('Passei no related')
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