import * as cheerio from "cheerio"
import { prisma } from '@/app/libs/dbClient'
import {
    isPremiumAccount, getCityNumber, getSexNumber, getVocationNumber, isField,
    getCreatureUsingArticle, getFieldNumber
} from "@/app/libs/enumAssist"
import { getServerDayPeriod } from "@/app/libs/serverAnalysisHelper"
import { getExpGained } from "@/app/libs/formulas"
import { differenceInMinutes } from "date-fns"
import { createCharacter } from "@/app/api/characters/createCharacter"

export const dynamic = 'force-dynamic'

export const maxDuration = 100

type PlayerStats = {
    displayName: string
    vocation: number
    level: number
}

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
        const now = new Date()
        const { serverStart, serverEnd } = getServerDayPeriod()

        const playersOnlineURL = "https://tibiantis.online/?page=whoisonline"
        const response = await fetch(playersOnlineURL, { cache: 'no-store' })

        if (!response.ok) {
            throw new Error('Tibiantis could not be reached.')
        }

        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)

        const blockMsg = $('body').text()

        if (blockMsg.includes("You are currently blocked." || "You are being rate limited.")) {
            throw new Error('Tibiantis is blocked, could not start update.')
        }

        const serverData = { online: 0, record: 0 }

        /* Get players online quantity and record */

        $('div:contains("Here") > b').each((i, el) => {
            i === 0 ?
                serverData.online = Number($(el).text())
                :
                serverData.record = Number($(el).text())
        })

        /* Save online players quantity */

        await prisma.playersOnlineHistory.create({
            data: {
                quantity: serverData.online
            }
        })

        /* Update players record if necessary */

        const record = await prisma.playersOnlineRecord.findFirst({
            where: { world: 'Tibiantis' }
        })

        /* If no records available, create one */

        if (!record) {
            await prisma.playersOnlineRecord.create({
                data: {
                    quantity: serverData.record
                }
            })

            /* Check if record still higher and update if not */

        } else if (record.quantity < serverData.record) {
            await prisma.playersOnlineRecord.update({
                where: { id: record.id },
                data: {
                    quantity: serverData.record
                }
            })
        }

        const oldPlayersOnline = await prisma.character.findMany({ where: { online: true } })

        const newPlayers: PlayerStats[] = []

        /* Compare players online with official website */

        $('.hover').each((i, tr) => {
            const playerStats = { displayName: '', vocation: 0, level: 0 }
            $(tr).find("td").each((i, td) => {
                switch (i) {
                    case 0:

                        /* Remove from old array if the player still online */

                        const displayName = $(td).text()

                        if (oldPlayersOnline) {
                            const playerIndex = oldPlayersOnline.findIndex(player => player.displayName === displayName)
                            if (playerIndex !== -1) {
                                oldPlayersOnline.splice(playerIndex, 1)
                                return false
                            }
                        }
                        playerStats.displayName = displayName
                        break
                    case 1:
                        const vocation = $(td).text()
                        playerStats.vocation = getVocationNumber(vocation)
                        break
                    case 2:
                        playerStats.level = Number($(td).text())
                        break
                }
            })
            if (playerStats.displayName !== "") {

                /* Add tho array the players that logged in */

                newPlayers.push(playerStats)
            }
        })

        /* Players that logged in */

        if (newPlayers.length > 0) {

            const newPlayersUpdatePromises = newPlayers.map(async ({ displayName, level }) => {

                const characterExists = await prisma.character.findUnique({ where: { name: displayName.toLowerCase() } })

                /* Create new character if it does not exists */

                if (!characterExists) {

                    const newCharacter = await createCharacter({ displayName: displayName })

                    await prisma.playerSessionDay.create({
                        data: {
                            characterId: newCharacter.id,
                            endLevel: Number(level),
                            startLevel: Number(level),
                            expGained: 0,
                            playtime: 0
                        }
                    })

                } else {

                    /* Get last session day during server online period */

                    const lastSessionDay = await prisma.playerSessionDay.findFirst({
                        where: {
                            AND: [
                                { characterId: characterExists.id },
                                {
                                    createdAt: {
                                        gte: serverStart,
                                        lte: serverEnd
                                    }
                                }
                            ]
                        }
                    })


                    if (!lastSessionDay) {
                        await prisma.playerSessionDay.create({
                            data: {
                                characterId: characterExists.id,
                                endLevel: Number(level),
                                startLevel: Number(level),
                                expGained: 0,
                                playtime: 0
                            }
                        })
                    }

                    /* Update this character to online, if it exists */

                    await prisma.character.update({
                        where: { id: characterExists.id },
                        data: {
                            online: true,
                            onlineUpdatedAt: now
                        }
                    })
                }
            })

            /* Wait to handle new players promises */

            await Promise.all(newPlayersUpdatePromises)
        }

        if (oldPlayersOnline && oldPlayersOnline.length > 0) {

            /* What still on the old array are players that logged off */

            const oldPlayersUpdatePromises = oldPlayersOnline.map(async ({ id, displayName, onlineUpdatedAt }) => {

                /* Create session for old player */

                const oldPlayerLastSession = await prisma.playerSession.create({
                    data: {
                        characterId: id,
                        startedAt: onlineUpdatedAt
                    }
                })

                /* Fetch old player data */

                const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.split(' ').join('+')}`
                const response = await fetch(playerPageURL, { cache: 'no-store' })

                /* Stops if fetch failed  */
                if (!response.ok) {
                    throw new Error(`Failed to reach Tibiantis during ${displayName} update.`)
                }

                const htmlString = await response.text()
                const $ = cheerio.load(htmlString)

                const blockMsg = $('body').text()

                /* Stops if site is blocked  */

                if (blockMsg.includes("You are currently blocked." || "You are being rate limited.")) {
                    throw new Error(`Tibiantis got blocked during ${displayName} update.`)
                }

                const sex = $('td:contains("Sex:")').next().text()
                const residence = $('td:contains("Residence:")').next().text()
                const level = $('td:contains("Level:")').next().text()
                const vocation = $('td:contains("Vocation:")').next().text()
                const accountStatus = $('td:contains("Account Status:")').next().text()

                if (sex.length < 1 || residence.length < 1 || accountStatus.length < 1 || vocation.length < 1 || level.length < 1) {
                    console.error(`Failed to parse ${displayName} data.`)
                    return false
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

                        if (i === 0) return //Remove title from search

                        /* Go over each death row */

                        let stopSearching = false

                        $(tr).find('td').each((j, td) => {
                            switch (j) {

                                /* Death date */

                                case 0:
                                    const deathDate = new Date(($(td).text().split('CET')[0]) + 'GMT+0100')

                                    /* Check if the date is the same, so it can be skipped */

                                    if (listedDeaths.find((listedDeath) => listedDeath.date === deathDate)) {

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
                                        where: { name: displayName.toLocaleLowerCase() }
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

                /* Get his last day session, if he was online he had one session already created on this day */

                const oldPlayerSessionDay = await prisma.playerSessionDay.findFirst({
                    where: { characterId: id },
                    orderBy: {
                        id: 'desc'
                    }
                })

                /* Time he played last session */

                const lastPlaytime = differenceInMinutes(oldPlayerLastSession.endedAt, oldPlayerLastSession.startedAt)

                /* Update his day session */

                if (oldPlayerSessionDay) {
                    await prisma.playerSessionDay.update({
                        where: { id: oldPlayerSessionDay.id },
                        data: {
                            endLevel: Number(level),
                            expGained: getExpGained(oldPlayerSessionDay.startLevel, Number(level)),
                            playtime: oldPlayerSessionDay.playtime + lastPlaytime
                        }
                    })
                } else {
                    console.error(`Failed to update ${displayName} day session.`)
                }

                /* Update character */

                await prisma.character.update({
                    where: { id },
                    data: {
                        sex: getSexNumber(sex),
                        vocation: getVocationNumber(vocation),
                        level: Number(level),
                        residence: getCityNumber(residence),
                        premium: isPremiumAccount(accountStatus),
                        online: false,
                        onlineUpdatedAt: now
                    }
                })
            })

            await Promise.all(oldPlayersUpdatePromises)
        }

        return Response.json({
            message: "Players online updated."
        }, { status: 200 })

    } catch (err: any) {
        console.error(err.message)
        return Response.json({
            message: "Something went wrong during players update."
        }, { status: 500 })
    }
}