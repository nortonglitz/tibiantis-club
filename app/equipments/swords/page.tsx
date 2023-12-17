import type { Metadata } from 'next'
import Table from './table'
import EquipmentsLinks from '../equipmentsLinks'

export const metadata: Metadata = {
    title: 'Swords - Tibiantis Club',
}

export default function SwordsPage() {

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
            <EquipmentsLinks />
            <Table />
        </main>
    )
}