"use client"

import useSWR from 'swr'
import { Death } from "@prisma/client"

type Killer = {
    level: number
    displayName: string
    vocation: number
    online: boolean
}

interface ParsedDeaths extends Omit<Death, "id" | "victimId" | "killersIds"> {
    victim: {
        displayName: string
        online: boolean
    }
    killers: Killer[]
}

export function useDeathsLatest() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, isLoading, error } = useSWR('/api/deaths/latest', fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { deaths: data?.deaths as ParsedDeaths[], isLoading, error }
}