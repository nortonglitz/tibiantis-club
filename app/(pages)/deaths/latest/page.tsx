import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Latest Deaths - Tibiantis Club',
}

export default function LatestDeathsPage() {
    return (
        <main
            className="
                flex
                flex-col
                align-center
                py-2
                flex-wrap
                gap-2
                sm:gap-4
            "
        >
            deaths
        </main>
    )
}