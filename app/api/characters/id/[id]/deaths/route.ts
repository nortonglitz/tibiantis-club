import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type Query = { params: { id: string } }

export async function GET(req: Request, query: Query) {
    try {

        const { params: { id } } = query

        if (id.length < 24) {
            return Response.json({ message: "Invalid character Id." }, { status: 406 })
        }

        const deaths = await prisma.death.findMany({
            where: {
                victimId: id
            },
            orderBy: {
                date: "desc"
            },
            take: 10
        })

        if (!deaths) {
            return Response.json({ deaths: [] }, { status: 200 })
        }

        /* Include killer/killers display name */

        const deathsPromises = deaths.map(async ({ killersIds, ...rest }) => {
            if (killersIds) {
                const killersPromises = killersIds.map(async killerId => {
                    const killer = await prisma.character.findUnique({
                        where: { id: killerId },
                        select: { displayName: true }
                    })

                    if (!killer) return "unknown player"

                    return killer
                })

                const killers = await Promise.all(killersPromises)

                return {
                    ...rest,
                    killers
                }
            }

            return {
                ...rest
            }
        })

        const parsedDeaths = await Promise.all(deathsPromises)

        return Response.json({ deaths: parsedDeaths }, { status: 200 })

    } catch (err: any) {
        console.error(err.message)
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }
}