"use client"

import { useRelatedCharacters } from "@/app/hooks/useRelatedCharacters"
import { getVocationName } from "@/app/libs/enumAssist"

interface RelatedCharsTableProps {
    displayName: string
}

const RelatedCharsTable: React.FC<RelatedCharsTableProps> = ({ displayName }) => {

    const { relatedCharacters, isLoading, error } = useRelatedCharacters(displayName)

    return (
        <div
            className="
                bg-stone-800
                p-4
                h-fit
                rounded-3xl 
                border 
                border-stone-600/30
                w-full 
                sm:w-[70vw] 
                md:w-[60vw] 
                lg:w-[50vw]
                xl:w-[40vw]
            "
        >
            <table className="w-full">
                <caption
                    className="
                        font-yatra-one 
                        text-2xl 
                        whitespace-nowrap 
                        text-yellow-200 
                    "
                >
                    Related Characters
                    <hr className="border-stone-700 mt-2 mb-4" />
                </caption>
                <thead>
                    <tr
                        className="
                            shadow-md
                            [&>th]:py-1
                            uppercase
                            font-yatra-one
                            bg-stone-800
                        "
                    >
                        <th className="min-w-[100px]" scope="col">
                            Name
                        </th>
                        <th className="min-w-[100px]" scope="col">
                            Level
                        </th>
                        <th className="min-w-[100px]" scope="col">
                            Vocation
                        </th>
                    </tr>
                </thead>
                <tbody
                    className="
                        [&>tr>th]:text-left 
                        [&>tr>th]:p-2
                    "
                >
                    {isLoading ?
                        <>
                            {[1, 2, 3].map((key) => (
                                <tr className="odd:bg-stone-300/10 even:bg-stone-400/10" key={key}>
                                    <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                    <td className="py-2"><div className="w-[2rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                    <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                </tr>
                            ))}
                        </>
                        :
                        error ?
                            <tr>
                                <td colSpan={3} className="text-center py-2 bg-stone-300/10">Something went wrong.</td>
                            </tr>
                            :
                            relatedCharacters.length < 1 ?
                                <tr>
                                    <td colSpan={3} className="text-center py-2 bg-stone-300/10">
                                        No characters has been found.
                                    </td>
                                </tr>
                                :
                                <>
                                    {relatedCharacters.map(({ displayName, level, vocation }, i) => (
                                        <tr
                                            key={i}
                                            className="
                                                [&>td]:py-2
                                                odd:bg-stone-400/10 
                                                even:bg-stone-300/10
                                                hover:outline
                                                hover:-outline-offset-1
                                                hover:outline-stone-400/80
                                            "
                                        >
                                            <td>{displayName}</td>
                                            <td>{level}</td>
                                            <td>{getVocationName(vocation)}</td>
                                        </tr>
                                    ))}
                                </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RelatedCharsTable