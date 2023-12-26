import { Character } from "@prisma/client"
import type { Metadata } from 'next'

type Props = { params: { displayName: string } }

export async function generateMetadata(
    { params: { displayName } }: Props
): Promise<Metadata> {
    return {
        title: `${displayName} - Tibiantis Club`
    }
}

async function getCharacter(displayName: string) {
    const res = await fetch(`${process.env.NODE_ENV !== "production" ?
        process.env.API_URL_DEV
        :
        process.env.API_URL
        }/api/characters/${displayName}`, { next: { revalidate: 5 * 60 } })

    if (!res.ok) {
        return null
    }

    return res.json()
}

export default async function CharacterPage({ params: { displayName } }: Props) {

    const character = await getCharacter(displayName)

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
            {character && character.level}
        </main>
    )
}