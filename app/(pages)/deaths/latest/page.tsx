import type { Metadata } from 'next'
import DeathsTable from "./deathsTable"

export const metadata: Metadata = {
    title: 'Latest Deaths - Tibiantis Club',
}

export default function LatestDeathsPage() {

    return (
        <main
            className="
                flex
                justify-center
                py-5
                md:py-10
                sm:py-5
            "
        >
            <DeathsTable />
        </main>
    )
}