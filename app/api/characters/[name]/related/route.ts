import { prisma } from '@/app/libs/dbClient'
import { getMinutes, set } from 'date-fns'

// How many sessions char need to have to be analyzed
const MIN_SESSIONS = 200

// How many sessions another char has related to be considered a possible second char
const MIN_RELATED_SESSIONS = 250000

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

        /*  Check all related sessions that starts when his sessions ends, and vice versa. 
            Also counts by each session that the search character has.
        */

        const relatedSessionSearchesPromises = sessions.map(async ({ endedAt, startedAt }) => {

            return await prisma.playerSession.groupBy({
                by: 'characterId',
                _count: { characterId: true },
                where: {
                    OR:
                        [
                            {
                                startedAt: {
                                    gte: set(endedAt, { milliseconds: 0 }),
                                    lte: set(endedAt, { minutes: getMinutes(endedAt) + 4, seconds: 0, milliseconds: 999 })
                                }
                            },
                            {
                                endedAt: {
                                    gte: set(startedAt, { milliseconds: 0 }),
                                    lte: set(startedAt, { minutes: getMinutes(startedAt) + 4, seconds: 0, milliseconds: 999 })
                                }
                            }
                        ]
                }
            })
        })

        /* Make an array of all sessions found (flat just breaks all into one array) */

        const possibleSessionsFound = (await Promise.all(relatedSessionSearchesPromises)).flat()

        /* Count the number of sessions each character has in common */

        const possibleSessionsCounter = possibleSessionsFound
            .reduce((acc, { characterId, _count }) => {

                if (characterId === character.id) return acc

                return {
                    ...acc,
                    [characterId]: (acc[characterId] || 0) + _count.characterId
                }
            }, {} as { [id: string]: number })


        /* Remove characters that has less than the minimum required */

        Object.keys(possibleSessionsCounter).forEach(characterId => {
            if (possibleSessionsCounter[characterId] < MIN_RELATED_SESSIONS) {
                delete possibleSessionsCounter[characterId]
            }
        })

        const relatedCharactersIDs = Object.keys(possibleSessionsCounter)

        /* Return if don't find any character with the minimum required sessions */

        if (relatedCharactersIDs.length < 1) {
            Response.json({ relatedCharacters: [] })
        }

        /* Return all characters that are related */

        const relatedCharacters = await prisma.character.findMany({
            where: { id: { in: relatedCharactersIDs } },
            select: { displayName: true, level: true, vocation: true }
        })

        return Response.json({ relatedCharacters })

    } catch (err: any) {
        console.log(err.code, err.message)
        Response.json({
            message: "Something went wrong"
        }, { status: 500 })
    }
}