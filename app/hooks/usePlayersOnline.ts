import useSWR from 'swr'
import { PlayersHistory } from "@prisma/client"

export function usePlayersOnline() {
    const { data, isLoading, error } = useSWR('/api/playersHistory/latest', async (...args) => {
        const res = await fetch(...args)
        return await res.json() as PlayersHistory
    })

    return { quantity: data?.quantity, isLoading, error }
}