"use client"

export const dynamic = 'force-dynamic'

import useSWR from 'swr'

export function usePlayersOnline() {
    const { data, isLoading, error } = useSWR('/api/playersHistory/latest', async (...args) => {
        return fetch(...args).then(res => res.json())
    })

    console.log(data)

    return { quantity: data?.quantity, isLoading, error }
}