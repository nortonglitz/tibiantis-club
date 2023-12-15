import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Foods - Tibiantis Club',
}

export default function FoodsPage() {

    return (
        <main
            className="
                flex
                justify-center
                py-2
                sm:p-10
            "
        >
            <Table />
        </main>
    )
}