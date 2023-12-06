"use client"

import { usePlayersOnline } from "./hooks/usePlayersOnline"

export default function Home() {

  const { quantity } = usePlayersOnline()

  return (
    <main
      className="
        flex
        justify-center
        pt-10
      "
    >
      {quantity}
    </main>
  )
}
