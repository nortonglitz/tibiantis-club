"use client"

import LinkText from "@/app/components/links/linkText"
import { useCharacterDeaths } from "@/app/hooks/useCharacterDeaths"
import { getCreatureName, getFieldName } from "@/app/libs/enumAssist"
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
                        <td colSpan={1}>When</td>
                        <td colSpan={1}>Level</td>
                        <td colSpan={1}>Killed by</td>
                    </tr>
                </thead>
                <tbody
                    className="
                        [&>tr>th]:text-left 
                        [&>tr>th]:p-2
                        text-center
                    "
                >
                    {deaths && deaths.map(({ date, cause, killers, creature, field, level }, i) => (
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
                                {level}
                            </td>
                            <>
                                {cause === 0 && creature && (
                                    <td>
                                        {<img
                                            className="m-auto"
                                            src={`/assets/imgs/beastiary/${getCreatureName(creature).replaceAll(' ', '_')}.gif`}
                                            alt={getCreatureName(creature)}
                                        />}
                                    </td>
                                )}
                                {cause === 1 && (
                                    <td>
                                        {killers.length > 1 ?
                                            <>
                                                <LinkText href={`/characters/${killers[0].displayName}`}>{killers[0].displayName.replaceAll(' ', '_')}</LinkText>
                                                and
                                                <LinkText href={`/characters/${killers[0].displayName}`}>{killers[1].displayName.replaceAll(' ', '_')}</LinkText>
                                            </>
                                            :
                                            <>
                                                <LinkText href={`/characters/${killers[0].displayName}`}>{killers[0].displayName.replaceAll(' ', '_')}</LinkText>
                                            </>
                                        }
                                    </td>
                                )}
                                {cause === 2 && field !== null && (
                                    <td>
                                        {<img
                                            className="m-auto"
                                            src={`/assets/imgs/fields/${getFieldName(field).replaceAll(' ', '_')}.gif`}
                                            alt={getFieldName(field)}
                                        />}
                                    </td>
                                )}
                            </>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DeathsTable