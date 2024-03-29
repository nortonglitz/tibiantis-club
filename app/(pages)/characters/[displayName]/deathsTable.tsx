"use client"

import LinkText from "@/app/components/links/linkText"
import { useCharacterDeaths } from "@/app/hooks/useCharacterDeaths"
import { getCreatureName, getFieldName } from "@/app/libs/enumAssist"
import useCharacterStore from "@/app/stores/useCharacterStore"
import { formatDistanceToNowStrict } from "date-fns"

const DeathsTable = () => {

    const { character } = useCharacterStore()
    const { deaths, error, isLoading } = useCharacterDeaths(character ? character.id : '')

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
                sm:w-[70vw] 
                md:w-[60vw] 
                lg:w-[50vw]
                xl:w-[40vw]
            "
        >
            <div className="flex items-center">
                <div
                    className={`
                        p-2
                        bg-gradient-radial
                        rounded-full
                        from-stone-500
                        via-transparent
                    `}
                >
                    {!character ?
                        <img src="/assets/imgs/icons/char_info_loading.gif" alt="loading info" />
                        :
                        character.sex === 0 ?
                            <img src="/assets/imgs/icons/char_deaths_male.gif" alt="char info" />
                            :
                            <img src="/assets/imgs/icons/char_deaths_female.gif" alt="char info" />
                    }
                </div>
                <h3
                    className="
                        mt-2
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
            <div className="max-h-[40vh] md:max-h-[50vh] h-fit w-full overflow-y-auto">
                <table className="w-full h-fit relative">
                    <thead className="sticky top-0">
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
                                deaths && deaths.length < 1 ?
                                    <tr>
                                        <td colSpan={3} className="text-center py-2 bg-stone-300/10">
                                            No deaths has been found.
                                        </td>
                                    </tr>
                                    :
                                    <>
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
                                                            {killers.length > 1 ?
                                                                <>
                                                                    <LinkText href={`/characters/${killers[0].displayName.replaceAll(' ', '_')}`}>
                                                                        {killers[0].displayName}
                                                                    </LinkText>
                                                                    {" and "}
                                                                    <LinkText href={`/characters/${killers[1].displayName.replaceAll(' ', '_')}`}>
                                                                        {killers[1].displayName}
                                                                    </LinkText>
                                                                </>
                                                                :
                                                                <>
                                                                    <LinkText href={`/characters/${killers[0].displayName.replaceAll(' ', '_')}`}>
                                                                        {killers[0].displayName}
                                                                    </LinkText>
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

export default DeathsTable