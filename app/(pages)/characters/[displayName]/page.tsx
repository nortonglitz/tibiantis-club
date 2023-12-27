import { Metadata } from "next"
import Table from "./table"

type Props = { params: { displayName: string } }

export async function generateMetadata(
    { params: { displayName } }: Props
): Promise<Metadata> {
    const parsedDisplayName = displayName.replaceAll('-', ' ')
    return {
        title: `${parsedDisplayName} - Tibiantis Club`
    }
}

export default function CharacterPage({ params: { displayName } }: Props) {
    const parsedDisplayName = displayName.replaceAll('-', ' ')

    return (
        <main
            className="
                flex
                justify-center
                pt-10
                flex-wrap
            "
        >
            <Table
                displayName={parsedDisplayName}
            />
        </main>
    )
}