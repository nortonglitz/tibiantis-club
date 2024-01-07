import { prisma } from "@/app/libs/dbClient"
import { getCityNumber, getSexNumber, getVocationNumber, isPremiumAccount } from "@/app/libs/enumAssist"
import * as cheerio from "cheerio"

type CreateCharacterProps = {
    displayName: string
    sex?: string
    vocation?: string
    level?: number
    residence?: string
    accountStatus?: string
    online?: boolean
    onlineUpdatedAt?: Date
}

export async function createCharacter({
    displayName,
    level,
    online,
    onlineUpdatedAt,
    accountStatus,
    residence,
    sex,
    vocation
}: CreateCharacterProps) {
    const playerPageURL = `https://tibiantis.online/?page=character&name=${displayName.replaceAll(' ', '+')}`
    const response = await fetch(playerPageURL, { cache: 'no-store' })

    if (!response.ok) {
        throw new Error(`Failed to reach Tibiantis during ${displayName} creation.`)
    }

    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    const blockMsg = $('body').text()

    if (blockMsg.includes("You are currently blocked." || "You are being rate limited.")) {
        throw new Error(`Tibiantis got blocked during ${displayName} creation.`)
    }

    const fetchedSex = $('td:contains("Sex:")').next().text()
    const fetchedLevel = $('td:contains("Level:")').next().text()
    const fetchedVocation = $('td:contains("Vocation:")').next().text()
    const fetchedResidence = $('td:contains("Residence:")').next().text()
    const fetchedAccountStatus = $('td:contains("Account Status:")').next().text()

    if (
        fetchedSex.length < 1 || fetchedResidence.length < 1 || fetchedAccountStatus.length < 1 ||
        fetchedVocation.length < 1 || fetchedLevel.length < 1
    ) {
        throw new Error(`Failed to parse data on ${displayName} creation.`)
    }

    return await prisma.character.create({
        data: {
            name: displayName.toLowerCase(),
            displayName: displayName,
            sex: sex ? getSexNumber(sex) : getSexNumber(fetchedSex),
            vocation: vocation ? getVocationNumber(vocation) : getVocationNumber(fetchedVocation),
            level: level ? Number(level) : Number(fetchedLevel),
            residence: residence ? getCityNumber(residence) : getCityNumber(fetchedResidence),
            premium: accountStatus ? isPremiumAccount(accountStatus) : isPremiumAccount(fetchedAccountStatus),
            online: online ? online : false,
            onlineUpdatedAt: onlineUpdatedAt || new Date()
        }
    })
}