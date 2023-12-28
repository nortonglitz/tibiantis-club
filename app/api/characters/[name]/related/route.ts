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

        if (!sessions || sessions.length <= 15) {
            return Response.json({ message: "Not enough sessions to find related characters.", charactersRelated: [] }, { status: 200 })
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

        const sessionsFound = (await Promise.all(sessionSearchesPromises)).flat()

        const possibleCharacters = sessionsFound.reduce((acc, { characterId }) => {
            return {
                ...acc,
                [characterId]: (acc[characterId] || 0) + 1
            }
        }, {} as any)

        const possibleCharactersKeys = Object.keys(possibleCharacters)

        possibleCharactersKeys.forEach(characterId => {
            if (possibleCharacters[characterId] < 10) {
                delete possibleCharacters[characterId]
            }
        })

        const relatedCharactersId = Object.keys(possibleCharacters)

        const relatedCharactersPromises = relatedCharactersId.map(async characterId => {
            const characterDoc = await prisma.character.findUnique({
                where: { id: characterId },
                select: { displayName: true, level: true, vocation: true }
            })

            if (!characterDoc) {
                throw new Error('Error parsing characters IDs.')
            }

            return ({
                ...characterDoc,
                relatedSessions: possibleCharacters[characterId]
            })

        })

        const relatedCharacters = await Promise.all(relatedCharactersPromises)

        return Response.json({
            relatedCharacters
        })
    } catch (err: any) {
        console.log(err.code, err.message)
        Response.json({
            message: "Something went wrong"
        }, { status: 500 })
    }
}