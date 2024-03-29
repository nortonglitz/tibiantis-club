"use client"

import useSWR from 'swr'
import { Character } from "@prisma/client"

export function useCharacter(displayName: string) {

    const parsedDisplayName = displayName.replaceAll(' ', '_').toLowerCase()

    const fetcher = async (url: string) => {
        const res = await fetch(url)

        if (!res.ok) {
            const error: any = new Error('Could not find any character.')
            error.status = res.status
            throw error
        }

        return res.json()
    }
    const { data, isLoading, error } = useSWR(`/api/characters/${parsedDisplayName}`, fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { character: data as Character, isLoading, error }
}