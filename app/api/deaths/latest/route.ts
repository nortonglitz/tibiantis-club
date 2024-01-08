import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const deaths = await prisma.death.findMany({
            orderBy: {
                date: "desc"
            },
            select: {
                date: true,
                cause: true,
                creature: true,
                field: true,
                killersIds: true,
                level: true,
                victim: {
                    select: {
                        displayName: true,
                        online: true,
                        vocation: true
                    }
                }
            },
            take: 50
        })

        if (!deaths) {
            return Response.json({ deaths: [] }, { status: 200 })
        }

        const deathsParsedPromises = deaths.map(async ({ killersIds, ...rest }) => {
            if (killersIds) {
                const killersPromises = killersIds.map(async killerId => {
                    const killer = await prisma.character.findUnique({
                        where: { id: killerId },
                        select: {
                            level: true,
                            displayName: true,
                            vocation: true,
                            online: true
                        }
                    })

                    if (!killer) {
                        return {
                            displayName: "Unknown",
                            level: 0,
                            vocation: 0,
                            online: false
                        }
                    }

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

        const deathsParsed = await Promise.all(deathsParsedPromises)

        return Response.json({ deaths: deathsParsed }, { status: 200 })

    } catch (err: any) {
        console.error(err.message)
        return Response.json({
            code: err.code,
            message: err.message
        }, { status: 500 })
    }
}