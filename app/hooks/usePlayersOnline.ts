"use client"

import useSWR from 'swr'
import { Character } from "@prisma/client"

export function usePlayersOnline() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, isLoading, error } = useSWR('/api/players', fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { players: data?.players as Character[], isLoading, error }
}