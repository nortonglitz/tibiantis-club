import type { Metadata } from 'next'
import Table from './table'

export const metadata: Metadata = {
    title: 'Swords - Tibiantis Club',
}

export default function FoodsPage() {

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