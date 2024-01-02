import { Metadata } from "next"
import CharTable from "./charTable"
import RelatedCharsTable from "./relatedCharsTable"
import DeathsTable from "./deathsTable"

type Props = { params: { displayName: string } }

export async function generateMetadata(
    { params: { displayName } }: Props
): Promise<Metadata> {
    const parsedDisplayName = displayName.replaceAll('_', ' ')
    return {
        title: `${parsedDisplayName} - Tibiantis Club`
    }
}

export default function CharacterPage({ params: { displayName } }: Props) {
    const parsedDisplayName = displayName.replaceAll('_', ' ')

    return (
        <main
            className="
                flex
                justify-center
                pt-10
                flex-wrap
                gap-10
            "
        >
            <CharTable displayName={parsedDisplayName} />
            <RelatedCharsTable displayName={parsedDisplayName} />
            <DeathsTable displayName={parsedDisplayName} />
        </main>
    )
}