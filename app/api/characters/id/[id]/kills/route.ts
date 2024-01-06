import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { id: string } }

export async function GET(req: Request, query: Query) {
    try {

        const { params: { id } } = query

        console.log("id", id)

        if (id.length < 24) {
            console.log("idLength", id.length)
            return Response.json({ message: "Invalid character Id.", kills: [] }, { status: 406 })
        }

        const kills = await prisma.kill.findMany({
            where: { killerId: id },
            select: {
                date: true,
                victimId: true,
                victimLevel: true
            },
            orderBy: {
                date: "desc"
            }
        })

        console.log("kills", kills)

        if (!kills || kills.length < 1) {
            return Response.json({ kills: [] }, { status: 200 })
        }

        const killsPromises = kills.map(async ({ victimId, ...rest }) => {
            const victimName = await prisma.character.findUnique({
                where: { id: victimId },
                select: {
                    displayName: true
                }
            })

            return {
                ...rest,
                victim: victimName ? victimName : { displayName: 'unknown' }
            }
        })

        const killsParsed = await Promise.all(killsPromises)

        console.log('killsParsed', killsParsed)


        return Response.json({ kills: killsParsed }, { status: 200 })

    } catch (err: any) {
        console.error(err.message)
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }
}