import beastiary from "@/prisma/seeds/beastiary"

export const getVocationAbbreviation = (vocationName: string) => {
    switch (vocationName.toLowerCase()) {
        case 'none':
            return 'none'
        case 'knight':
            return 'knight'
        case 'elite knight':
            return 'EK'
        case 'sorcerer':
            return 'sorcerer'
        case 'master sorcerer':
            return 'MS'
        case 'druid':
            return 'druid'
        case 'elder druid':
            return 'ED'
        case 'paladin':
            return 'paladin'
        case 'royal paladin':
            return 'RP'
    }
}

export const getVocationNumber = (vocationName: string) => {
    switch (vocationName.toLowerCase()) {
        case 'none':
            return 0
        case 'knight':
            return 1
        case 'elite knight':
            return 2
        case 'sorcerer':
            return 3
        case 'master sorcerer':
            return 4
        case 'druid':
            return 5
        case 'elder druid':
            return 6
        case 'paladin':
            return 7
        case 'royal paladin':
            return 8
    }

    throw new Error(`Invalid vocation name for: ${vocationName}`)
}

export const getVocationName = (vocNumber: number) => {

    switch (vocNumber) {
        case 0:
            return "none"
        case 1:
            return "knight"
        case 2:
            return "elite knight"
        case 3:
            return "sorcerer"
        case 4:
            return "master sorcerer"
        case 5:
            return "druid"
        case 6:
            return "elder druid"
        case 7:
            return "paladin"
        case 8:
            return "royal paladin"
    }

    throw new Error(`Invalid vocation number for: ${vocNumber}`)
}

export const getSexName = (sexNumber: number) => {
    switch (sexNumber) {
        case 0:
            return "male"
        case 1:
            return "female"
    }

    throw new Error(`Invalid sex number for: ${sexNumber}`)
}

export const getSexNumber = (sex: string) => {
    switch (sex.toLowerCase()) {
        case "male":
            return 0
        case "female":
            return 1
    }

    throw new Error(`Invalid sex name for: ${sex}.`)
}

export const getCityName = (cityNumber: number) => {

    switch (cityNumber) {
        case 0:
            return "rookgaard"
        case 1:
            return "thais"
        case 2:
            return "carlin"
        case 3:
            return "ab'dendriel"
        case 4:
            return "kazordoon"
        case 5:
            return "venore"
        case 6:
            return "edron"
        case 7:
            return "darashia"
    }

    throw new Error(`Invalid city number for: ${cityNumber}.`)
}

export const getCityNumber = (cityName: string) => {
    switch (cityName.toLowerCase()) {
        case "rookgaard":
            return 0
        case "thais":
            return 1
        case "carlin":
            return 2
        case "ab'dendriel":
            return 3
        case "kazordoon":
            return 4
        case "venore":
            return 5
        case "edron":
            return 6
        case "darashia":
            return 7
    }

    throw new Error(`Invalid city name for: ${cityName}`)
}

export const isPremiumAccount = (status: string) => {
    const lowerCaseStatus = status.toLowerCase()

    if (lowerCaseStatus !== 'free account' && lowerCaseStatus !== 'premium account') {
        throw new Error(`Invalid account status for: ${status}`)
    }

    return lowerCaseStatus !== "free account"
}

export const isField = (value: string) => {
    const fields = ["poison", "fire", "energy"]
    return fields.includes(value)
}

export const getDeathCauseNumber = (causeName: string) => {
    switch (causeName) {
        case "creature":
            return 0
        case "player":
            return 1
        case "field":
            return 2
    }

    throw new Error(`Invalid cause name for: ${causeName}`)
}

export const getDeathCauseName = (causeNumber: number) => {
    switch (causeNumber) {
        case 0:
            return "creature"
        case 1:
            return "player"
        case 2:
            return "field"
    }

    throw new Error(`Invalid cause number for: ${causeNumber}`)
}

export const getCreatureUsingArticle = (creatureWithArticle: string) => {
    const creature = beastiary.find(({ article, name }) => {
        return (creatureWithArticle === `${article} ${name}` || creatureWithArticle === name)
    })

    if (!creature) {
        throw new Error(`Can not find creature name for: ${creatureWithArticle}`)
    }

    return creature.ref
}

export const getCreatureName = (creatureRef: number) => {
    const creature = beastiary.find(({ ref }) => ref === creatureRef)

    if (!creature) {
        throw new Error(`Can not find field name creature ref: ${creatureRef}`)
    }

    return creature.name
}

export const getFieldNumber = (fieldName: string) => {
    switch (fieldName) {
        case "fire":
            return 0
        case "poison":
            return 1
        case "energy":
            return 2
    }

    throw new Error(`Can not find field number for: ${fieldName}`)
}

export const getFieldName = (fieldNumber: number) => {
    switch (fieldNumber) {
        case 0:
            return "fire"
        case 1:
            return "poison"
        case 2:
            return "energy"
    }

    throw new Error(`Can not find field name for: ${fieldNumber}`)
}

export const getSpellGroupName = (spellNumber: number) => {
    switch (spellNumber) {
        case 0:
            return "support"
        case 1:
            return "healing"
        case 2:
            return "attack"
    }

    throw new Error(`Can not find spell name for: ${spellNumber}`)
}