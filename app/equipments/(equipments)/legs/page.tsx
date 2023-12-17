import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Legs - Tibiantis Club',
}

export default function LegsPage() {

    return (
        <Table />
    )
}