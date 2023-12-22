"use client"

import useSWR from 'swr'
import { PlayersOnline } from "@prisma/client"

export function usePlayersOnline() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, isLoading, error } = useSWR('/api/players', fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    const playersData = data.players as PlayersOnline[]
    playersData.sort((a, b) => a.name.localeCompare(b.name))

    return { players: playersData as PlayersOnline[], isLoading, error }
}