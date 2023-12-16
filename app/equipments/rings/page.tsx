import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Rings - Tibiantis Club',
}

export default function RingsPage() {

    return (
        <main
            className="
                flex
                justify-center
                py-8
                sm:p-10
            "
        >
            <Table />
        </main>
    )
}