"use client"

import { useCharacter } from "@/app/hooks/useCharacter"
import { getCityName, getSexName, getVocationName } from "@/app/libs/enumAssist"
import { FaCheck } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import { formatDistanceToNow } from 'date-fns'
import Link from "next/link"

interface CharTableProps {
    displayName: string
}

const CharTable: React.FC<CharTableProps> = ({ displayName }) => {

    const { character, error } = useCharacter(displayName)

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

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
            {!error ?
                <table className="w-full h-fit">
                    <caption
                        className="
                            font-yatra-one 
                            text-2xl 
                            whitespace-nowrap 
                            text-yellow-200 
                        "
                    >
                        Character Information
                        <hr className="border-stone-700 mt-2 mb-4" />
                    </caption>
                    <thead>
                        <tr className="shadow-md">
                            <td colSpan={2}></td>
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