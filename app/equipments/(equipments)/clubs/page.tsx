import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Clubs - Tibiantis Club',
}

export default function ClubsPage() {

    return (
        <Table />
    )
}