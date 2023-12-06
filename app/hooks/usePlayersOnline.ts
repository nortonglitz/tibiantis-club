"use client"

import useSWR from 'swr'

export function usePlayersOnline() {

    const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then(res => res.json())

    const { data, isLoading, error } = useSWR('/api/playersHistory/latest', fetcher)

    console.log(data)

    return { quantity: data?.quantity, isLoading, error }
}