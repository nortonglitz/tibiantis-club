"use client"

import useSWR from 'swr'

export type CharacterFound = {
    name: string,
    displayName: string,
    level: number,
    vocation: number
}

export function useFindCharacter(name: string) {

    const parsedName = name.toLowerCase()

    const fetcher = async (url: string) => {

        if (name.length < 3) {
            throw new Error('Invalid character name.')
        }

        const res = await fetch(url)

        if (!res.ok) {
            const error: any = new Error('An error occurred while fetching character data.')
            error.status = res.status
            throw error
        }

        if (res.status === 204) {
            const error: any = new Error('Could not find character.')
            error.status = res.status
            throw error
        }

        return res.json()
    }

    const { data, isLoading, error } = useSWR(`/api/characters/find/${parsedName}`, fetcher, {
        dedupingInterval: 0,
        focusThrottleInterval: 0,
        revalidateIfStale: false,
        revalidateOnMount: false,
        revalidateOnFocus: false
    })

    return { characters: data?.characters as CharacterFound[], isLoading, error }
}