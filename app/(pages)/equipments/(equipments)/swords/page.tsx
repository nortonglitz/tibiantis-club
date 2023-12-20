import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Swords - Tibiantis Club',
}

export default function SwordsPage() {

    return (
        <Table />
    )
}