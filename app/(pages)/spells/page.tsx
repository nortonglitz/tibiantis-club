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
                justify-center
                py-1
                sm:p-10
            "
        >
            <Table />
        </main>
    )
}