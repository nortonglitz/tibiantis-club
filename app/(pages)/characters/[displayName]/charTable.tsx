"use client"

import { useEffect } from "react"
import { useCharacter } from "@/app/hooks/useCharacter"
import { getCityName, getSexName, getVocationName } from "@/app/libs/enumAssist"
import { FaCheck } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import { formatDistanceToNow } from 'date-fns'
import Link from "next/link"
import useCharacterStore from "@/app/stores/useCharacterStore"

interface CharTableProps {
    displayName: string
}

const CharTable: React.FC<CharTableProps> = ({ displayName }) => {

    const { character, error } = useCharacter(displayName)
    const { setCharacter } = useCharacterStore()

    useEffect(() => {
        setCharacter(character)
    }, [character, setCharacter])

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

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
                            <img src="/assets/imgs/icons/char_info_male.gif" alt="char info" />
                            :
                            <img src="/assets/imgs/icons/char_info_female.gif" alt="char info" />
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
                    Character Information
                </h3>
            </div>
            <hr className="border-stone-700 mb-2" />
            {!error ?
                <table className="w-full h-fit">
                    <thead>
                        <tr className="shadow-md">
                            <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody
                        className="
                            [&>tr>th]:text-left 
                            [&>tr>th]:p-2
                        "
                    >
                        <tr
                            className="
                                bg-stone-300/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <th>
                                Name
                            </th>
                            <td>
                                {
                                    !character ?
                                        <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                        :
                                        character.displayName
                                }
                            </td>
                        </tr>
                        <tr
                            className="
                            bg-stone-400/10
                            hover:outline
                            hover:-outline-offset-1
                            hover:outline-stone-400/80
                        "
                        >
                            <th>
                                Status
                            </th>
                            <td>
                                <div className="flex items-center">
                                    {!character ?
                                        <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                        :
                                        character.online ?
                                            <span className="text-tibia-green">Online</span>
                                            :
                                            <span className="text-red-400">Offline</span>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr
                            className="
                                bg-stone-300/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <th>
                                Level
                            </th>
                            <td>
                                {!character ? <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /> : character.level}
                            </td>
                        </tr>
                        <tr
                            className="
                                bg-stone-400/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <th>
                                Sex
                            </th>
                            <td className="capitalize">
                                {!character ? <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /> : getSexName(character.sex)}
                            </td>
                        </tr>
                        <tr
                            className="
                                bg-stone-300/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <th>
                                Vocation
                            </th>
                            <td className="capitalize">
                                {!character ?
                                    <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /> :
                                    getVocationName(character.vocation)
                                }
                            </td>
                        </tr>
                        <tr
                            className="
                                bg-stone-400/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <th>
                                Residence
                            </th>
                            <td className="capitalize">
                                {!character ?
                                    <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                    :
                                    getCityName(character.residence)
                                }
                            </td>
                        </tr>
                        <tr
                            className="
                                bg-stone-300/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <th>
                                Premium
                            </th>
                            <td className="text-sm">
                                {!character ?
                                    <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                    :
                                    character.premium ?
                                        <span className="text-tibia-green"><FaCheck /></span>
                                        :
                                        <span className="text-red-400"><FaX /></span>
                                }
                            </td>
                        </tr>
                        <tr
                            className="
                                bg-stone-400/10
                                hover:outline
                                hover:-outline-offset-1
                                hover:outline-stone-400/80
                            "
                        >
                            <th>
                                {!character ?
                                    <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                    :
                                    character.online ? "Playing for" : "Offline for"
                                }
                            </th>
                            <td className="text-sm">
                                {
                                    !character ?
                                        <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                        :
                                        capitalizeFirstLetter(formatDistanceToNow(new Date(character.onlineUpdatedAt)))
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                :
                <div className="flex flex-col items-center">
                    <p>No character has been found.</p>
                    <p>Try searching on
                        <Link
                            href="/characters/find"
                            className="
                                    ml-1
                                    text-yellow-200
                                    hover:underline
                                    active:text-yellow-300
                                "
                        >
                            Find Character
                        </Link>
                        .
                    </p>
                </div>
            }
        </div>
    )
}

export default CharTable