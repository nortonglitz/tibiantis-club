import { getHours, subDays, addDays, set, getMinutes } from "date-fns"

const TODAY = new Date()

export function getServerDayPeriod() {

    let today: Date
    let tomorrow: Date

    if (getHours(TODAY) < 8 || (getHours(TODAY) === 8 && getMinutes(TODAY) < 5)) {
        today = subDays(TODAY, 1)
        tomorrow = TODAY
    } else {
        today = TODAY
        tomorrow = addDays(TODAY, 1)
    }

    const serverStart = set(today, { hours: 8, minutes: 15, milliseconds: 0 })
    const serverEnd = set(tomorrow, { hours: 8, minutes: 0, milliseconds: 0 })

    return {
        serverStart,
        serverEnd
    }
}