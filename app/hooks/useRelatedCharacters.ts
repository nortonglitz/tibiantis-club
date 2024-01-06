"use client"

import useSWRImmutable from 'swr/immutable'

type RelatedCharacter = {
    displayName: string
    level: number
    vocation: number
    relatedSessions: number
}

export function useRelatedCharacters(id: string) {

    const fetcher = async (url: string) => {

        if (id.length < 24) {
            throw new Error("Invalid character Id.")
        }

        const res = await fetch(url)

        if (!res.ok) {
            const error: any = new Error('Could not find any related character.')
            error.status = res.status
            throw error
        }

        return res.json()
    }
    const { data, isLoading, error } = useSWRImmutable(`/api/characters/id/${id}/related`, fetcher)


    return { relatedCharacters: data?.relatedCharacters as RelatedCharacter[], isLoading, error }
}