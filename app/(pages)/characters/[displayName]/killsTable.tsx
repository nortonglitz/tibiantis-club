"use client"

import LinkText from "@/app/components/links/linkText"
import { useCharacterKills } from "@/app/hooks/useCharacterKills"
import useCharacterStore from "@/app/stores/useCharacterStore"
import { formatDistanceToNow } from "date-fns"

const DeathsTable = () => {

    const { character } = useCharacterStore()
    const { kills, error, isLoading } = useCharacterKills(character ? character.id : '')

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
            <div className="max-h-[60vh] md:max-h-[50vh] h-fit w-full overflow-y-auto">
                <table className="w-full h-fit">
                    <caption
                        className="
                            font-yatra-one 
                            text-2xl 
                            whitespace-nowrap 
                            text-yellow-200
                        "
                    >
                        Kills
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
                            <td colSpan={1}>When</td>
                            <td colSpan={1}>Level</td>
                            <td colSpan={1}>Name</td>
                        </tr>
                    </thead>
                    <tbody
                        className="
                            [&>tr>th]:text-left 
                            [&>tr>th]:p-2
                            text-center
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
                                !kills || kills.length < 1 ?
                                    <tr>
                                        <td colSpan={3} className="text-center py-2 bg-stone-300/10">
                                            No kills has been found.
                                        </td>
                                    </tr>
                                    :
                                    <>
                                        {kills && kills.map(({ date, victim, victimLevel }, i) => (
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
                                                <td>
                                                    {victimLevel}
                                                </td>
                                                <td>
                                                    <LinkText href={`/characters/${victim.displayName.replaceAll(' ', '_')}`}>
                                                        {victim.displayName}
                                                    </LinkText>
                                                </td>
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

export default DeathsTable