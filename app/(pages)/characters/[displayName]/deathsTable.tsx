"use client"

import { useCharacterDeaths } from "@/app/hooks/useCharacterDeaths"
import { formatDistanceToNow } from "date-fns"

interface DeathsTableProps {
    displayName: string
}

const DeathsTable: React.FC<DeathsTableProps> = ({ displayName }) => {

    const { deaths, error, isLoading } = useCharacterDeaths(displayName)

    return (
        <div
            className="
                bg-stone-800 
                p-4 
                rounded-3xl 
                border 
                border-stone-600/30 
                w-full
                h-fit
                sm:w-[70vw] 
                md:w-[60vw] 
                lg:w-[50vw]
                xl:w-[40vw]
            "
        >
            <table className="w-full h-fit">
                <caption
                    className="
                        font-yatra-one 
                        text-2xl 
                        whitespace-nowrap 
                        text-yellow-200
                    "
                >
                    Deaths
                    <hr className="border-stone-700 mt-2 mb-4" />
                </caption>
                <thead>
                    <tr className="
                            text-center
                            shadow-md
                            [&>th]:py-1
                            uppercase
                            font-yatra-one
                            bg-stone-800
                            font-bold
                        "
                    >
                        <td colSpan={1}>Date</td>
                        <td colSpan={1}>Cause</td>
                    </tr>
                </thead>
                <tbody
                    className="
                        [&>tr>th]:text-left 
                        [&>tr>th]:p-2
                        text-center
                    "
                >
                    {deaths && deaths.map(({ date, cause }, i) => (
                        <tr
                            key={i}
                            className="
                                [&>td]:py-2
                                odd:bg-stone-300/10 
                                even:bg-stone-400/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <td>{formatDistanceToNow(date)} ago</td>
                            <td>{cause}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DeathsTable