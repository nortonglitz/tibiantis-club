import puppeteer from "puppeteer"
import { PrismaClient, Prisma } from "@prisma/client"
import { prisma } from '@/app/libs/dbClient'

export async function GET() {
    const URL = "https://tibiantis.online/?page=whoisonline"

    try {
        const browser = await puppeteer.launch({ headless: "new" })
        const page = await browser.newPage()

        await page.goto(URL)

        const playersOnline = await page.evaluate(() => {
            const result: any[] = []
            const data = Array.from(document.getElementsByClassName("hover"))
            data.forEach(element => {
                const fields = element.getElementsByTagName("td")
                result.push({
                    name: fields.item(0)?.innerText,
                    vocation: fields.item(1)?.innerText,
                    level: Number(fields.item(2)?.innerText)
                })
            })

            return result
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

        return Response.json(null, { status: 200, statusText: "Players online loaded." })
    } catch (err: any) {
        console.error(err.message, err.code)
        return Response.json(null, { status: 500 })
    }
}