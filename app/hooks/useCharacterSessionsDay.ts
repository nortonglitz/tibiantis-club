"use client"

import useSWR from 'swr'
import { PlayerSessionDay } from "@prisma/client"

interface SessionDay extends Omit<PlayerSessionDay, "id" | "characterId" | "id" | "updatedAt"> { }

export function useCharacterSessionsDay(id: string) {

    const fetcher = async (url: string) => {

        if (id.length < 24) {
            throw new Error("Invalid character Id.")
        }

        const res = await fetch(url)

        if (!res.ok) {
            const error: any = new Error(`Could not find any sessionsDay for character id: ${id}.`)
            error.status = res.status
            throw error
        }

        return res.json()
    }

    const { data, isLoading, error } = useSWR(`/api/characters/id/${id}/sessionsDay`, fetcher, {
        dedupingInterval: 5 * 60 * 1000,
        focusThrottleInterval: 5 * 60 * 1000
    })

    return { sessionsDay: data?.sessionsDay as SessionDay[], isLoading, error }
}