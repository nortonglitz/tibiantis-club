import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Spells - Tibiantis Club',
}

export default function SpellsPage() {

    return (
        <main
            className="
                flex
                flex-col
                items-center
                gap-4
                py-4
            "
        >
            <Table />
        </main>
    )
}