"use client"

import useSWR from 'swr'

export function usePlayersOnline() {

    const fetcher = (url: string) => fetch(url, { next: { revalidate: 300 } }).then(res => res.json())
    const { data, isLoading, error } = useSWR('/api/playersHistory/latest', fetcher)

    return { quantity: data?.quantity, isLoading, error }
}