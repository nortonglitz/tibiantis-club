import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Runes - Tibiantis Club',
}

export default function RunesPage() {

    return (
        <main
            className="
                flex
                flex-col
                items-center
                gap-4
                py-10
            "
        >
            <Table />
        </main>
    )
}