import { prisma } from '@/app/libs/dbClient'
import { getMinutes, set } from 'date-fns'

export const dynamic = 'force-dynamic'

// How many sessions char need to have to be analyzed
const MIN_SESSIONS = 10

// How many sessions another char has related to be considered a possible second char
const MIN_RELATED_SESSIONS = 5

type Query = { params: { name: string } }

export async function GET(req: Request, query: Query) {

    try {
        const { params: { name } } = query

        const parsedName = name.replaceAll('_', ' ').toLowerCase()

        /* Name must be at least 3 letters */

        if (parsedName.length < 3) {
            return Response.json({ message: "Name too small. Need at least 3 letters." }, { status: 406 })
        }

        const character = await prisma.character.findUnique({
            where: {
                name: parsedName
            }
        })

        /* If can not find, possibly not got by the crawler yet */

        if (!character) {
            return Response.json({ message: "Name not listed in database." }, { status: 406 })
        }

        /* Get all sessions */

        const sessions = await prisma.playerSession.findMany({
            where: { characterId: character.id }
        })

        /* Check how many sessions this character has and if it's enough */

        if (!sessions || sessions.length < MIN_SESSIONS) {
            return Response.json({ message: "Not enough sessions to find related characters.", relatedCharacters: [] }, { status: 200 })
        }

        /* Check all related sessions that starts when his sessions ends, and vice versa */

        const relatedSessionSearchesPromises = sessions.map(async ({ endedAt, startedAt }) => {
            return await prisma.playerSession.findMany({
                where: {
                    OR: [
                        {
                            startedAt: {
                                gte: set(endedAt, { milliseconds: 0 }),
                                lte: set(endedAt, { minutes: getMinutes(endedAt) + 4, milliseconds: 999 })
                            }
                        },
                        {
                            endedAt: {
                                gte: set(startedAt, { milliseconds: 0 }),
                                lte: set(startedAt, { minutes: getMinutes(endedAt) + 4, milliseconds: 999 })
                            }
                        }
                    ]

                },
                select: {
                    characterId: true
                }
            })
        })

        /* Make an array of all sessions found (flat just breaks all into one array) */

        const relatedSessionsFound = (await Promise.all(relatedSessionSearchesPromises)).flat()


        /* Count the number of sessions each character has related, and filter if it's not the same char */

        const possibleCharacters = relatedSessionsFound.reduce((acc, { characterId }) => {

            if (characterId === character.id) return acc

            return {
                ...acc,
                [characterId]: (acc[characterId] || 0) + 1
            }
        }, {} as any)

        const possibleCharactersKeys = Object.keys(possibleCharacters)

        /* Check how many sessions has related, if less than MIN delete it */

        possibleCharactersKeys.forEach(characterId => {
            if (possibleCharacters[characterId] < MIN_RELATED_SESSIONS) {
                delete possibleCharacters[characterId]
            }
        })

        const relatedCharactersId = Object.keys(possibleCharacters)

        /* Get related chars specs */

        const relatedCharactersPromises = relatedCharactersId.map(async characterId => {
            const characterDoc = await prisma.character.findUnique({
                where: { id: characterId },
                select: { displayName: true, level: true, vocation: true }
            })

            if (!characterDoc) return false

            return ({
                ...characterDoc,
                relatedSessions: possibleCharacters[characterId]
            })

        })

        const relatedCharacters = await Promise.all(relatedCharactersPromises)

        return Response.json({ relatedCharacters })
    } catch (err: any) {
        console.log(err.code, err.message)
        Response.json({
            message: "Something went wrong"
        }, { status: 500 })
    }
}