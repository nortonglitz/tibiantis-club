"use client"

import useSWRImmutable from 'swr/immutable'

export function usePlayersOnlineRecord() {

    const fetcher = async (url: string) => {
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

    /* Immutable data */
    const { data, isLoading, error } = useSWRImmutable('/api/playersHistory/record', fetcher)

    return { record: { ...data }, isLoading, error }
}