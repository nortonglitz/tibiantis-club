export const expByLvl = (lvl: number) => {
    return Math.floor((50 / 3) * ((lvl * lvl * lvl) - (6 * lvl * lvl) + (17 * lvl) - 12))
}

export function getExpGained(startLevel: number, endLevel: number) {

    if (startLevel === endLevel) {
        return 0
    }

    const startExp = expByLvl(startLevel)
    const endExp = expByLvl(endLevel)

    if (startLevel < endLevel) {
        return endExp - startExp
    }

    return startExp - endExp

}