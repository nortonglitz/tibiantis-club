import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Distance - Tibiantis Club',
}

export default function DistancePage() {

    return (
        <Table />
    )
}