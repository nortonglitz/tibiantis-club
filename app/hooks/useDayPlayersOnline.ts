"use client"

import useSWR from 'swr'
import { PlayersOnlineHistory } from "@prisma/client"
import { format } from 'date-fns'

export function useDayPlayersOnline() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, isLoading, error } = useSWR('/api/playersHistory/day', fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    if (data) {
        const dayPlayers = data.dayPlayers as PlayersOnlineHistory[]

        const dayPlayersFormatted = dayPlayers.map(({ quantity, createdAt }) => {
            return {
                quantity,
                createdAt: format(createdAt, "HH:mm")
            }
        })

        return { dayPlayers: dayPlayersFormatted, isLoading, error }
    }

    return { dayPlayers: [], isLoading, error }
}