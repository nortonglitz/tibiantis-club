import * as cheerio from "cheerio"
import { prisma } from '@/app/libs/dbClient'

export const dynamic = 'force-dynamic'

type PlayerStats = {
    name: string
    vocation: string
    level: number
}

export async function GET() {
    const URL = "https://tibiantis.online/?page=whoisonline"

    try {
        const response = await fetch(URL, { cache: 'no-store' })
        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)

        const oldPlayersOnline = await prisma.playersOnline.findMany({})
        const oldPlayersOnlineNumber = oldPlayersOnline.length

        const newPlayers: PlayerStats[] = []

        $('.hover').each((i, tr) => {
            const playerStats: PlayerStats = { name: '', vocation: '', level: 0 }
            $(tr).find("td").each((i, td) => {
                switch (i) {
                    case 0:
                        const name = $(td).text()
                        const playerIndex = oldPlayersOnline.findIndex(player => player.name === name)
                        if (playerIndex !== -1) {
                            oldPlayersOnline.splice(playerIndex, 1)
                            return false
                        }
                        playerStats.name = name
                        break
                    case 1:
                        playerStats.vocation = $(td).text()
                        break
                    case 2:
                        playerStats.level = Number($(td).text())
                        break
                }
            })
            if (playerStats.name !== "") {
                newPlayers.push(playerStats)
            }
        })

        if (oldPlayersOnline.length > 1) {
            const IdsToDelete: string[] = []

            const endedSessions = oldPlayersOnline.map(({ id, name, createdAt }) => {
                IdsToDelete.push(id)
                return {
                    name,
                    startedAt: createdAt
                }
            })

            await prisma.playersSessions.createMany({
                data: endedSessions
            })

            await prisma.playersOnline.deleteMany({
                where: {
                    id: {
                        in: IdsToDelete
                    }
                }
            })
        }

        if (newPlayers.length > 1) {
            await prisma.playersOnline.createMany({
                data: newPlayers
            })
        }

        await prisma.playersHistory.create({
            data: {
                quantity: oldPlayersOnlineNumber + newPlayers.length - oldPlayersOnline.length
            }
        })

        return Response.json({
            message: "Players online loaded."
        }, { status: 200 })
    } catch (err: any) {
        console.error(err.message, err.code)
        return Response.json({
            message: "Could not load players online."
        }, { status: 500 })
    }
}