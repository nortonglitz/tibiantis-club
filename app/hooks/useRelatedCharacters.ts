"use client"

import useSWR from 'swr'

type RelatedCharacter = {
    displayName: string
    level: number
    vocation: number
    relatedSessions: number
}

export function useRelatedCharacters(displayName: string) {

    const parsedDisplayName = displayName.replaceAll(' ', '_').toLowerCase()

    const fetcher = async (url: string) => {
        const res = await fetch(url)

        if (!res.ok) {
            const error: any = new Error('Could not find any related character.')
            error.status = res.status
            throw error
        }

        return res.json()
    }
    const { data, isLoading, error } = useSWR(`/api/characters/${parsedDisplayName}/related`, fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })


    return { relatedCharacters: data?.relatedCharacters as RelatedCharacter[], isLoading, error }
}