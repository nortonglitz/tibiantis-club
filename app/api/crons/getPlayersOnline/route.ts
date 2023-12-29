import * as cheerio from "cheerio"
import { prisma } from '@/app/libs/dbClient'
import { isPremiumAccount, getCityNumber, getSexNumber, getVocationNumber } from "@/app/libs/enumAssist"

export const dynamic = 'force-dynamic'

type PlayerStats = {
    displayName: string
    vocation: number
    level: number
}

export async function GET() {

    /* Compare players online with official website */

    try {

        const playersOnlineURL = "https://tibiantis.online/?page=whoisonline"
        const response = await fetch(playersOnlineURL, { cache: 'no-store' })

        if (!response.ok) {
            throw new Error("Failed to fetch players online.")
        }

        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)

        const serverData = { online: 0, record: 0 }

        /* Get players online and record */

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

            newPlayers.forEach(async ({ displayName, level, vocation }) => {

                const characterExists = await prisma.character.findFirst({ where: { name: displayName.toLowerCase() } })

                /* Create new character if it does not exists */

                if (!characterExists) {
                    const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.replaceAll(' ', '+')}`
                    const response = await fetch(playerPageURL, { cache: 'no-store' })

                    if (!response.ok) {
                        throw new Error("Failed to fetch player data to create a new one.")
                    }

                    const htmlString = await response.text()
                    const $ = cheerio.load(htmlString)

                    const sex = $('td:contains("Sex:")').next().text()
                    const residence = $('td:contains("Residence:")').next().text()
                    const accountStatus = $('td:contains("Account Status:")').next().text()

                    if (sex.length < 1 || residence.length < 1 || accountStatus.length < 1) {
                        throw new Error("Failed to parse data on player creation.")
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

                    /* Create a session for new character */

                    await prisma.playerSession.create({
                        data: {
                            startLevel: Number(level),
                            startedAt: new Date(),
                            characterId: newCharacter.id
                        }
                    })

                } else {

                    /* Just update this character to online, if it exists */

                    await prisma.character.update({
                        where: { id: characterExists.id },
                        data: {
                            online: true,
                            onlineUpdatedAt: new Date()
                        }
                    })

                    /* Create a session for already exists character  */

                    await prisma.playerSession.create({
                        data: {
                            startLevel: Number(level),
                            startedAt: new Date(),
                            characterId: characterExists.id
                        }
                    })
                }
            })
        }

        /* What still on the old array are players that logged off */

        if (oldPlayersOnline && oldPlayersOnline.length > 0) {

            /* Update old players sessions and create array of IDs */

            const oldPlayersIDsPromises = oldPlayersOnline.map(async ({ id }) => {
                const oldPlayerSession = await prisma.playerSession.findFirst({
                    where: { characterId: id },
                    orderBy: {
                        id: "desc"
                    }
                })

                if (oldPlayerSession) {
                    await prisma.playerSession.update({
                        where: { id: oldPlayerSession.id },
                        data: {
                            endedAt: new Date()
                        }
                    })
                }

                return id
            })

            const oldPlayersIDs = await Promise.all(oldPlayersIDsPromises)

            /* const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.split(' ').join('+')}`
            const response = await fetch(playerPageURL, { cache: 'no-store' })

            if (!response.ok) {
                throw new Error("Failed to fetch player data to update.")
            }

            const htmlString = await response.text()
            const $ = cheerio.load(htmlString)

            const sex = $('td:contains("Sex:")').next().text()
            const residence = $('td:contains("Residence:")').next().text()
            const level = $('td:contains("Level:")').next().text()
            const vocation = $('td:contains("Vocation:")').next().text()
            const accountStatus = $('td:contains("Account Status:")').next().text()

            if (sex.length < 1 || residence.length < 1 || accountStatus.length < 1 || vocation.length < 1 || level.length < 1) {
                throw new Error("Failed to parse data on player update.")
            }

            const updatePlayer = {
                sex: getSexNumber(sex),
                vocation: getVocationNumber(vocation),
                level: Number(level),
                residence: getCityNumber(residence),
                premium: isPremiumAccount(accountStatus),
                online: false,
                onlineUpdatedAt: new Date()
            }

            await prisma.character.update({
                where: { id },
                data: {
                    ...updatePlayer,
                }
            }) */

            await prisma.character.updateMany({
                where: { id: { in: oldPlayersIDs } },
                data: {
                    online: false,
                    onlineUpdatedAt: new Date()
                }
            })
        }

        return Response.json({
            message: "Players online updated."
        }, { status: 200 })
    } catch (err: any) {
        console.error(err.message)
        return Response.json({
            message: "Could not update players online."
        }, { status: 500 })
    }
}