import type { Metadata } from 'next'
import LinkCategory from "./linkCategory"

export const metadata: Metadata = {
    title: 'Community - Tibiantis Club',
}

export default function CommunityPage() {
    return (
        <main
            className="
                flex
                justify-center
                py-2
                flex-wrap
                gap-2
                sm:gap-4
            "
        >
            <LinkCategory
                desc="You can see a list of all players that are playing Tibiantis right now."
                title="Players Online"
                href="/community/players-online"
                imgSrc="/assets/imgs/icons/players_online.gif"
            />
        </main>
    )
}