"use client"

import useSWR from 'swr'
import { Character } from "@prisma/client"

export function useCharacter(displayName: string) {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, isLoading, error } = useSWR(`/api/characters/${displayName.toLocaleLowerCase()}`, fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { character: data as Character, isLoading, error }
}