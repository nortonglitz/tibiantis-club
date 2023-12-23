export const getVocationNumber = (vocation: string) => {
    switch (vocation.toLocaleLowerCase()) {
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

    throw new Error('Invalid vocation name')
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

    throw new Error('Invalid vocation number')
}

export const getSexName = (sexNumber: number) => {
    switch (sexNumber) {
        case 0:
            return "male"
        case 1:
            return "female"
    }

    throw new Error('Invalid sex number')
}

export const getSexNumber = (sex: string) => {
    switch (sex.toLocaleLowerCase()) {
        case "male":
            return 0
        case "female":
            return 1
    }

    throw new Error('Invalid sex name')
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

    throw new Error('Invalid city number')
}

export const getCityNumber = (cityName: string) => {
    switch (cityName.toLocaleLowerCase()) {
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

    throw new Error('Invalid city name')
}

export const getAccountStatus = (status: string) => {
    return status.toLocaleLowerCase() !== "free account"
}