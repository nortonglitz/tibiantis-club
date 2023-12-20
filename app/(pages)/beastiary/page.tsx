import type { Metadata } from 'next'
import Table from "./table"

export const metadata: Metadata = {
    title: 'Beastiary - Tibiantis Club',
}

export default function BeastiaryPage() {
    return (
        <main
            className="
                flex
                justify-center
                items-center
                py-4
                sm:p-8
            "
        >
            <Table />
        </main>
    )
}