import * as cheerio from "cheerio"
import { prisma } from '@/app/libs/dbClient'
import { isPremiumAccount, getCityNumber, getSexNumber, getVocationNumber } from "@/app/libs/enumAssist"
import { getServerDayPeriod } from "@/app/libs/serverAnalysisHelper"
import { getExpGained } from "@/app/libs/formulas"
import { differenceInMinutes } from "date-fns"

export const dynamic = 'force-dynamic'

export const maxDuration = 40

type PlayerStats = {
    displayName: string
    vocation: number
    level: number
}

export async function GET() {

    /* Compare players online with official website */

    try {
        const { serverStart, serverEnd } = getServerDayPeriod()

        const playersOnlineURL = "https://tibiantis.online/?page=whoisonline"
        const response = await fetch(playersOnlineURL, { cache: 'no-store' })

        if (!response.ok) {
            throw new Error('Tibiantis could not be reached.')
        }

        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)

        const blockMsg = $('body').text()

        if (blockMsg.includes("You are currently blocked.")) {
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

            const newPlayersUpdatePromises = newPlayers.map(async ({ displayName, level, vocation }) => {

                const characterExists = await prisma.character.findUnique({ where: { name: displayName.toLowerCase() } })

                /* Create new character if it does not exists */

                if (!characterExists) {
                    const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.replaceAll(' ', '+')}`
                    const response = await fetch(playerPageURL, { cache: 'no-store' })

                    if (!response.ok) {
                        throw new Error(`Failed to reach Tibiantis during ${displayName} creation.`)
                    }

                    const htmlString = await response.text()
                    const $ = cheerio.load(htmlString)

                    const blockMsg = $('body').text()

                    if (blockMsg.includes("You are currently blocked.")) {
                        throw new Error(`Tibiantis got blocked during ${displayName} creation.`)
                    }

                    const sex = $('td:contains("Sex:")').next().text()
                    const residence = $('td:contains("Residence:")').next().text()
                    const accountStatus = $('td:contains("Account Status:")').next().text()

                    if (sex.length < 1 || residence.length < 1 || accountStatus.length < 1) {
                        console.error(`Failed to parse data on ${displayName} creation.`)
                        return false
                    }

                    const newCharacter = await prisma.character.create({
                        data: {
                            name: displayName.toLocaleLowerCase(),
                            displayName: displayName,
                            sex: getSexNumber(sex),
                            vocation,
                            level: Number(level),
                            residence: getCityNumber(residence),
                            premium: isPremiumAccount(accountStatus),
                            online: true,
                            onlineUpdatedAt: new Date()
                        }
                    })

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
                            onlineUpdatedAt: new Date()
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

                if (blockMsg.includes("You are currently blocked.")) {
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
                        onlineUpdatedAt: new Date()
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