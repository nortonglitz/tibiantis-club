import type { Metadata } from 'next'
import Table from "./table"

export const metadata: Metadata = {
    title: 'Helmets - Tibiantis Club',
}

export default function HelmetsPage() {

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