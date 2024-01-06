"use client"

import useSWR from 'swr'
import { Kill } from "@prisma/client"

interface KillsWithVictimDisplayName extends Omit<Kill, "id" | "victimId" | "killerId"> {
    victim: { displayName: string }
}

export function useCharacterKills(id: string) {

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

    return { kills: data?.kills as KillsWithVictimDisplayName[], isLoading, error }
}