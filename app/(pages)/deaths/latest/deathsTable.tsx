"use client"

import { useDeathsLatest } from "@/app/hooks/useDeathsLatest"
import LinkText from "@/app/components/links/linkText"
import { formatDistanceToNowStrict } from "date-fns"
import { getCreatureName, getFieldName, getVocationName, getVocationAbbreviation } from "@/app/libs/enumAssist"
import Link from "next/link"

interface KillerProps {
    killer: {
        displayName: string
        online: boolean
        vocation: number
        level: number
    }
}

const Killer: React.FC<KillerProps> = ({ killer }) => {
    return (
        <span className="relative group">
            <Link
                href={`/characters/${killer.displayName.replaceAll(' ', '_')}`}
                className={`
                    ${killer.online ? "text-green-500" : "text-red-500"}
                    hover:underline
                    hover:underline-offset-4
                    ${killer.online ? "active:text-green-600" : "active:text-red-600"}
                `}
            >
                {killer.displayName}
            </Link>
            <i className="capitalize text-stone-400 text-xs whitespace-nowrap">
                {` (${killer.level} ${getVocationAbbreviation(getVocationName(killer.vocation))})`}
            </i>
        </span>
    )
}

export default function DeathsTable() {

    const { deaths, error, isLoading } = useDeathsLatest()

    return (
        <div
            className="
                bg-stone-800 
                px-4
                pb-4  
                rounded-3xl 
                border 
                border-stone-600/30 
                w-full
                h-fit
                sm:w-[90vw] 
                md:w-[80vw] 
                lg:w-[70vw]
            "
        >
            <div className="flex">
                <div
                    className={`
                        p-2
                        bg-gradient-radial
                        rounded-full
                        from-stone-500
                        via-transparent
                    `}
                >
                    <img src="/assets/imgs/icons/latest_deaths.gif" alt="deaths" className="w-[32px] h-[32px] object-contain" />
                </div>
                <h3
                    className="
                        mt-3
                        ml-1
                        font-yatra-one 
                        text-2xl 
                        whitespace-nowrap 
                        text-yellow-200
                    "
                >
                    Latest Deaths
                </h3>
            </div>
            <hr className="border-stone-700 mb-2" />
            <div className="max-h-[75vh] h-fit overflow-y-auto">
                <table className="w-full h-fit relative">
                    <thead className="sticky top-0 z-20">
                        <tr className="
                                text-center
                                shadow-md
                                uppercase
                                font-yatra-one
                                bg-stone-800
                                font-bold
                                [&>th]:pb-1
                            "
                        >
                            <th colSpan={1}>Victim</th>
                            <th colSpan={1}>When</th>
                            <th colSpan={1}>Level</th>
                            <th colSpan={1}>Killed by</th>
                        </tr>
                    </thead>
                    <tbody
                        className="
                            [&>tr>th]:text-left 
                            [&>tr>th]:p-2
                            text-center
                        "
                    >
                        {isLoading ?
                            <>
                                {[1, 2, 3].map((key) => (
                                    <tr className="odd:bg-stone-300/10 even:bg-stone-400/10" key={key}>
                                        <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                        <td className="py-2"><div className="w-[2rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                        <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                        <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                    </tr>
                                ))}
                            </>
                            :
                            error ?
                                <tr>
                                    <td colSpan={4} className="text-center py-2 bg-stone-300/10">Something went wrong.</td>
                                </tr>
                                :
                                deaths && deaths.length < 1 ?
                                    <tr>
                                        <td colSpan={4} className="text-center py-2 bg-stone-300/10">
                                            No deaths has been found.
                                        </td>
                                    </tr>
                                    :
                                    <>
                                        {deaths && deaths.map(({ victim, date, cause, killers, creature, field, level }, i) => (
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
                                                <td>
                                                    <LinkText href={`/characters/${victim.displayName.replaceAll(' ', '_')}`}>
                                                        {victim.displayName}
                                                    </LinkText>
                                                </td>
                                                <td>{formatDistanceToNowStrict(date)} ago</td>
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
                                                            {killers && killers.length > 1 ?
                                                                <>
                                                                    {killers[0] &&
                                                                        <Killer killer={killers[0]} />
                                                                    }
                                                                    {" and "}
                                                                    {killers[1] &&
                                                                        <Killer killer={killers[1]} />
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    {killers[0] &&
                                                                        <Killer killer={killers[0]} />
                                                                    }
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
                                    </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}