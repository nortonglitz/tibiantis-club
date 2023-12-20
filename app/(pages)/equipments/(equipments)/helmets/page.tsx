import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Helmets - Tibiantis Club',
}

export default function HelmetsPage() {

    return (
        <Table />
    )
}