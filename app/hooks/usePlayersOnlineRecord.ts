"use client"

import useSWRImmutable from 'swr/immutable'

export function usePlayersOnlineRecord() {

    /* Immutable data */

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, isLoading, error } = useSWRImmutable('/api/playersHistory/latest', fetcher)

    return { record: data?.quantity, isLoading, error }
}