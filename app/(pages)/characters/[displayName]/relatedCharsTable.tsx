"use client"

import { useRelatedCharacters } from "@/app/hooks/useRelatedCharacters"
import { getVocationName } from "@/app/libs/enumAssist"
import useCharacterStore from "@/app/stores/useCharacterStore"
import Link from "next/link"

const RelatedCharsTable = () => {

    const { character } = useCharacterStore()
    const { relatedCharacters, isLoading, error } = useRelatedCharacters(character ? character.id : '')

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
            <h3
                className="
                    font-yatra-one 
                    text-2xl 
                    whitespace-nowrap 
                    text-yellow-200
                "
            >
                Related Characters
            </h3>
            <hr className="border-stone-700 mb-2" />
            <div className="max-h-[40vh] md:max-h-[50vh] h-fit w-full overflow-y-auto">
                <table className="w-full h-fit relative">
                    <thead className="sticky top-0">
                        <tr
                            className="
                                text-center
                                shadow-md
                                uppercase
                                font-yatra-one
                                bg-stone-800
                                font-bold
                                [&>th]:pb-1
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
                        {isLoading || !character ?
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
                                relatedCharacters && relatedCharacters.length < 1 ?
                                    <tr>
                                        <td colSpan={3} className="text-center py-2 bg-stone-300/10">
                                            No characters has been found.
                                        </td>
                                    </tr>
                                    :
                                    <>
                                        {relatedCharacters && relatedCharacters.map(({ displayName, level, vocation }, i) => (
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
                                                <td className="px-2">
                                                    <Link
                                                        href={`/characters/${displayName.replaceAll(' ', '_')}`}
                                                        className="
                                                            text-yellow-200
                                                            hover:underline
                                                            active:text-yellow-300
                                                        "
                                                    >
                                                        {displayName}
                                                    </Link>
                                                </td>
                                                <td className="text-center">{level}</td>
                                                <td className="text-center capitalize">{getVocationName(vocation)}</td>
                                            </tr>
                                        ))}
                                    </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RelatedCharsTable