import * as cheerio from "cheerio"
import { prisma } from '@/app/libs/dbClient'
import { getAccountStatus, getCityNumber, getSexNumber, getVocationNumber } from "@/app/libs/enumAssist"

export const dynamic = 'force-dynamic'

type PlayerStats = {
    displayName: string
    vocation: number
    level: number
}

export async function GET() {
    const playersOnlineURL = "https://tibiantis.online/?page=whoisonline"

    /* Compare players online with website fetch data */

    try {
        const response = await fetch(playersOnlineURL, { cache: 'no-store' })
        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)

        const oldPlayersOnline = await prisma.character.findMany({ where: { online: true } })
        const oldPlayersOnlineNumber = oldPlayersOnline.length

        const newPlayers: PlayerStats[] = []

        $('.hover').each((i, tr) => {
            const playerStats = { displayName: '', vocation: 0, level: 0 }
            $(tr).find("td").each((i, td) => {
                switch (i) {
                    case 0:
                        /* Remove from old array if the player still online */
                        const displayName = $(td).text()
                        const playerIndex = oldPlayersOnline.findIndex(player => player.displayName === displayName)
                        if (playerIndex !== -1) {
                            oldPlayersOnline.splice(playerIndex, 1)
                            return false
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

        /* What still on the old array are players that logged off */

        if (oldPlayersOnline.length > 1) {

            const createPlayersSession = oldPlayersOnline.map(({ id, onlineUpdatedAt }) => {
                return {
                    characterId: id,
                    startedAt: onlineUpdatedAt,
                    endedAt: new Date()
                }
            })

            await prisma.playerSession.createMany({
                data: createPlayersSession
            })

            /* Update players info that logged off */

            oldPlayersOnline.forEach(async ({ id, displayName }) => {
                const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.split(' ').join('+')}`
                const response = await fetch(playerPageURL, { cache: 'no-store' })
                const htmlString = await response.text()
                const $ = cheerio.load(htmlString)

                const sex = $('td:contains("Sex:")').next().text()
                const residence = $('td:contains("Residence:")').next().text()
                const level = $('td:contains("Level:")').next().text()
                const vocation = $('td:contains("Vocation:")').next().text()
                const accountStatus = $('td:contains("Account Status:")').next().text()

                const updatePlayer = {
                    sex: getSexNumber(sex),
                    vocation: getVocationNumber(vocation),
                    level: Number(level),
                    residence: getCityNumber(residence),
                    premium: getAccountStatus(accountStatus),
                    online: false,
                    onlineUpdatedAt: new Date()
                }

                await prisma.character.update({
                    where: { id },
                    data: {
                        ...updatePlayer,
                    }
                })
            })
        }

        /* Players that logged in */

        if (newPlayers.length > 1) {

            newPlayers.forEach(async ({ displayName, level, vocation }) => {

                const characterExists = await prisma.character.findFirst({ where: { name: displayName.toLocaleLowerCase() } })

                /* Create new character if it does not exists */

                if (!characterExists) {
                    const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.split(' ').join('+')}`
                    const response = await fetch(playerPageURL, { cache: 'no-store' })
                    const htmlString = await response.text()
                    const $ = cheerio.load(htmlString)

                    const sex = $('td:contains("Sex:")').next().text()
                    const residence = $('td:contains("Residence:")').next().text()
                    const accountStatus = $('td:contains("Account Status:")').next().text()

                    const newPlayer = {
                        name: displayName.toLocaleLowerCase(),
                        displayName: displayName,
                        sex: getSexNumber(sex),
                        vocation,
                        level: Number(level),
                        residence: getCityNumber(residence),
                        premium: getAccountStatus(accountStatus),
                        online: true,
                        onlineUpdatedAt: new Date()
                    }

                    await prisma.character.create({
                        data: {
                            ...newPlayer
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
                }
            })
        }

        /* Add to history the only players removing whose logged off and adding whose logged in */

        await prisma.playersOnlineHistory.create({
            data: {
                quantity: oldPlayersOnlineNumber + newPlayers.length - oldPlayersOnline.length
            }
        })

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