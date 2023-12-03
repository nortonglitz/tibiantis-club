export const expByLvl = (lvl: number) => {
    return Math.floor((50 / 3) * ((lvl * lvl * lvl) - (6 * lvl * lvl) + (17 * lvl) - 12))
}