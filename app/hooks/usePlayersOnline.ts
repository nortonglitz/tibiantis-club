import useSWR from 'swr'

export function usePlayersOnline() {
    const { data, isLoading, error } = useSWR('/api/playersHistory/latest', async (...args) => {
        return fetch(...args).then(res => res.json())
    })

    return { quantity: data?.quantity, isLoading, error }
}