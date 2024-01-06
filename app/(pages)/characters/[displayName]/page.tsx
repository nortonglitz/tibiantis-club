import { Metadata } from "next"
import CharTable from "./charTable"
import RelatedCharsTable from "./relatedCharsTable"
import DeathsTable from "./deathsTable"
import KillsTable from "./killsTable"
import SessionsDayTable from "./sessionsDayTable"

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
                py-10
                flex-wrap
                gap-10
            "
        >
            <CharTable displayName={parsedDisplayName} />
            <SessionsDayTable />
            <RelatedCharsTable />
            <DeathsTable />
            <KillsTable />
        </main>
    )
}