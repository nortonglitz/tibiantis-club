"use client"

import useSWR from 'swr'
import { Death } from "@prisma/client"

interface DeathWithKillersDisplayName extends Omit<Death, "killersIds"> {
    killers: { displayName: string }[]
}

export function useCharacterDeaths(id: string) {

    const fetcher = async (url: string) => {

        if (id.length < 24) {
            throw new Error("Invalid character Id.")
        }

        const res = await fetch(url)

        if (!res.ok) {
            const error: any = new Error(`Could not find any deaths for character id: ${id}.`)
            error.status = res.status
            throw error
        }

        return res.json()
    }

    const { data, isLoading, error } = useSWR(`/api/characters/id/${id}/deaths`, fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { deaths: data?.deaths as DeathWithKillersDisplayName[], isLoading, error }
}