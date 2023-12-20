import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Shields - Tibiantis Club',
}

export default function ShieldsPage() {

    return (
        <Table />
    )
}