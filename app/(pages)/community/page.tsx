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
                desc="List of all players that are playing Tibiantis right now."
                title="Players Online"
                href="/players/online"
                imgSrc="/assets/imgs/icons/players_online.gif"
            />
            <LinkCategory
                desc="Find a character that you are looking for."
                title="Find Character"
                href="/characters/find"
                imgSrc="/assets/imgs/icons/find_character.gif"
            />
            <LinkCategory
                desc="Check players that can possible kill you."
                title="PK List"
                href="#"
                imgSrc="/assets/imgs/icons/pk_list.gif"
            />
            <LinkCategory
                desc="List of all banned players."
                title="Exilium"
                href="#"
                imgSrc="/assets/imgs/icons/exilium.gif"
            />
        </main>
    )
}