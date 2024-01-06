import type { Metadata } from 'next'
import Table from "./table"
import ServerInfo from './serverInfo'
import DayPlayersChart from './dayPlayersChart'

export const metadata: Metadata = {
    title: 'Players Online - Tibiantis Club',
}

export default function PlayersOnlinePage() {
    return (
        <main
            className="
                flex
                justify-center
                py-4
                sm:py-10
                flex-wrap
                gap-4
                sm:gap-8
            "
        >
            <div className="flex flex-col items-center gap-4 sm:gap-8">
                <div className="flex flex-wrap gap-5 justify-around w-full">
                    <ServerInfo />
                    <DayPlayersChart />
                </div>
                <Table />
            </div>
        </main>
    )
}