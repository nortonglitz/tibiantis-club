import type { Metadata } from 'next'
import Finder from './finder'

export const metadata: Metadata = {
    title: 'Find Character - Tibiantis Club',
}

export default function CommunityPage() {
    return (
        <main
            className="
                flex
                justify-center
                py-10
                pb-2
                flex-wrap
                gap-10
            "
        >
            <Finder />
        </main>
    )
}