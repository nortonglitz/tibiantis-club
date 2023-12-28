"use client"

import useSWRImmutable from 'swr/immutable'

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
    const { data, isLoading, error } = useSWRImmutable(`/api/characters/${parsedDisplayName}/related`, fetcher)


    return { relatedCharacters: data?.relatedCharacters as RelatedCharacter[], isLoading, error }
}