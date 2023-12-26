import { Metadata } from "next"
import Table from "./table"

type Props = { params: { displayName: string } }

export async function generateMetadata(
    { params: { displayName } }: Props
): Promise<Metadata> {
    const parsedDisplayName = displayName.replace('-', ' ')
    return {
        title: `${parsedDisplayName} - Tibiantis Club`
    }
}

export default function CharacterPage({ params: { displayName } }: Props) {
    const parsedDisplayName = displayName.replace('-', ' ')

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
            <Table displayName={parsedDisplayName} />
        </main>
    )
}