"use client"

import useSWR from 'swr'

export function usePlayersOnlineQuantity() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, isLoading, error } = useSWR('/api/playersHistory/latest', fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { quantity: data?.quantity, isLoading, error }
}