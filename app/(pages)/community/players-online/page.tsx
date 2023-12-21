import type { Metadata } from 'next'
import Table from "./table"
import ServerInfo from './serverInfo'

export const metadata: Metadata = {
    title: 'Players Online - Tibiantis Club',
}

export default function PlayersOnlinePage() {
    return (
        <main
            className="
                flex
                flex-col
                items-center
                py-4
                sm:py-10
                flex-wrap
                gap-4
                sm:gap-8
            "
        >
            <ServerInfo />
            <Table />
        </main>
    )
}