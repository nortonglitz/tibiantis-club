"use client"

import useSWR from 'swr'
import { Death } from "@prisma/client"

interface DeathWithKillersDisplayName extends Death {
    killers: { displayName: string }[]
}

export function useCharacterDeaths(displayName: string) {

    const parsedDisplayName = displayName.replaceAll(' ', '_').toLowerCase()

    const fetcher = async (url: string) => {
        const res = await fetch(url)

        if (!res.ok) {
            const error: any = new Error(`Could not find any deaths for ${displayName}.`)
            error.status = res.status
            throw error
        }

        return res.json()
    }
    const { data, isLoading, error } = useSWR(`/api/characters/${parsedDisplayName}/deaths`, fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { deaths: data?.deaths as DeathWithKillersDisplayName[], isLoading, error }
}