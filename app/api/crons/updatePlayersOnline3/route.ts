import * as cheerio from "cheerio"
import { prisma } from '@/app/libs/dbClient'
import { compareAsc } from "date-fns"
import { getCreatureUsingArticle, isField, getFieldNumber } from "@/app/libs/enumAssist"
import { createCharacter } from "@/app/api/characters/createCharacter"

export const dynamic = 'force-dynamic'

export const maxDuration = 100

type Death = {
    date: Date
    cause: number
    victimId: string
    level: number
    killersDisplayName?: string[]
    creature?: number
    field?: number
}

export async function GET() {

    try {
        const playersOnline3 = await prisma.character.findMany({
            where: { online: true },
            orderBy: { level: 'desc' },
            skip: 400,
            take: 200
        })

        const playersOnline3UpdatePromises = playersOnline3.map(async ({ displayName, id }) => {

            /* Fetch player data */
            const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.replaceAll(' ', '+')}`
            const response = await fetch(playerPageURL, { cache: 'no-store' })

            /* Stops if fetch failed  */
            if (!response.ok) {
                throw new Error(`Failed to reach Tibiantis during ${displayName} update.`)
            }

            const htmlString = await response.text()
            const $ = cheerio.load(htmlString)

            const blockMsg = $('body').text()

            /* Stops if site is blocked  */

            if (blockMsg.includes("You are currently blocked.") || blockMsg.includes("You are being rate limited.")) {
                throw new Error(`Tibiantis got blocked during ${displayName} update.`)
            }

            /* Update deaths */

            const deathsTable = $('b:contains("Latest")').parentsUntil('table').find('tr')

            /* Check if death table is available */
            if (deathsTable.text() !== '') {

                const newDeaths: Death[] = []

                /* Look for deaths already saved to db */

                const listedDeaths = await prisma.death.findMany({
                    where: { victimId: id }
                })

                deathsTable.each((i, tr) => {
                    const newDeath: Death = {
                        date: new Date(),
                        cause: 0,
                        victimId: id,
                        level: 0
                    }

                    if (i === 0) return // Remove title from search

                    /* Go over each death row */

                    let stopSearching = false

                    $(tr).find('td').each((j, td) => {
                        switch (j) {

                            /* Death date */

                            case 0:
                                let deathDate: Date
                                const deathDateString = $(td).text()

                                if (deathDateString.includes('CET')) {
                                    deathDate = new Date(deathDateString.replace('CET', 'GMT+0100'))
                                } else {
                                    deathDate = new Date(deathDateString.replace('CEST', 'GMT+0200'))
                                }

                                /* Check if the date is the same, so it can be skipped */

                                if (listedDeaths.find((listedDeath) => compareAsc(listedDeath.date, deathDate) === 0)) {
                                    /* Quit all deaths searching */

                                    stopSearching = true
                                    return false
                                }
                                newDeath.date = deathDate
                                break

                            /* Death cause */

                            case 1:

                                /* Get level */

                                const deathArray = $(td).text().split('Killed at Level ')[1].split(' by ')
                                newDeath.level = Number(deathArray[0])

                                const $deathCause = $(td).children()
                                const playersQt = $deathCause.length

                                /* If there's only 1 link, there's only 1 player */

                                if (playersQt === 1) {
                                    newDeath.killersDisplayName = [$deathCause.text()]
                                    newDeath.cause = 1 // Human is 1

                                    /* More than 1 link is more than 1 player */

                                } else if (playersQt > 1) {
                                    $deathCause.each((k, a) => {
                                        if (!newDeath.killersDisplayName) {
                                            newDeath.killersDisplayName = [$(a).text()]
                                        } else {
                                            newDeath.killersDisplayName.push($(a).text())
                                        }

                                        newDeath.cause = 1
                                    })
                                } else {

                                    /* If it's not a player, will be field or creature */

                                    const creatureOrField = deathArray[1].split('.')[0]

                                    /* Check if it's a field */

                                    if (isField(creatureOrField)) {
                                        newDeath.field = getFieldNumber(creatureOrField)
                                        newDeath.cause = 2 // Field is 2

                                        /* If not, it's a creature */

                                    } else {
                                        newDeath.creature = getCreatureUsingArticle(creatureOrField)
                                        newDeath.cause = 0 // Creature is 0
                                    }
                                }
                                break
                        }
                    })

                    /* Stop searching for more deaths */

                    if (stopSearching) return false

                    /* Add new death to array */

                    newDeaths.push(newDeath)
                })

                /* Check if any new death was found */

                if (newDeaths.length > 0) {

                    /* Convert killers into IDs and create if the character does not exists */

                    const parsedDeathsPromises = newDeaths.map(async ({ killersDisplayName, date, level, victimId, ...rest }) => {
                        if (killersDisplayName) {

                            /* Find if killer exists  */

                            const killersPromises = killersDisplayName.map(async displayName => {
                                const killer = await prisma.character.findFirst({
                                    where: { name: displayName.toLowerCase() }
                                })

                                /* If killer does not exists, create one */

                                if (!killer) {
                                    const newCharacter = await createCharacter({ displayName })
                                    return newCharacter.id
                                }

                                /* Create a kill for the killer */

                                await prisma.kill.create({
                                    data: {
                                        date: date,
                                        victimLevel: level,
                                        victimId: victimId,
                                        killerId: killer.id
                                    }
                                })

                                return killer.id
                            })

                            /* Wait for creating/finding killers IDs and creating kills */

                            const killersIds = await Promise.all(killersPromises)

                            return { ...rest, date, level, victimId, killersIds }
                        }
                        return { ...rest, date, level, victimId }
                    })

                    const parsedDeaths = await Promise.all(parsedDeathsPromises)

                    /* Save all deaths of the character */

                    await prisma.death.createMany({
                        data: parsedDeaths
                    })
                }
            }
        })

        await Promise.all(playersOnline3UpdatePromises)

        return Response.json({
            message: "600/800 players online updated."
        }, { status: 200 })

    } catch (err: any) {
        console.error(err.message)
        return Response.json({
            message: "Something went wrong during players update."
        }, { status: 500 })
    }
}