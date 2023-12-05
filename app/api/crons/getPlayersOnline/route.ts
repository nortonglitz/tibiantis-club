import * as cheerio from "cheerio"
import { prisma } from '@/app/libs/dbClient'

type PlayerStats = {
    name: string
    vocation: string
    level: number
}

export async function GET() {
    const URL = "https://tibiantis.online/?page=whoisonline"

    try {
        const response = await fetch(URL, { cache: 'no-store', next: { revalidate: 0 } })
        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)

        const playersOnline: PlayerStats[] = []

        $('.hover').each((i, tr) => {
            const playerStats: PlayerStats = { name: '', vocation: '', level: 0 }
            $(tr).find("td").each((i, td) => {
                switch (i) {
                    case 0:
                        playerStats.name = $(td).text()
                        break
                    case 1:
                        playerStats.vocation = $(td).text()
                        break
                    case 2:
                        playerStats.level = Number($(td).text())
                        break
                }
            })
            playersOnline.push(playerStats)
        })

        await prisma.playersOnline.deleteMany({})
        await prisma.playersOnline.createMany({
            data: playersOnline
        })

        await prisma.playersHistory.create({
            data: {
                quantity: playersOnline.length
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