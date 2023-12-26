"use client"

import { useCharacter } from "@/app/hooks/useCharacter"
import { getCityName, getSexName, getVocationName } from "@/app/libs/enumAssist"
import { FaCheck } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import { formatDistanceToNow } from 'date-fns'

interface TableProps {
    displayName: string
}

const Table: React.FC<TableProps> = ({ displayName }) => {

    const { character, isLoading } = useCharacter(displayName)

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div className="bg-stone-800 p-4 rounded-3xl border border-stone-600/30">
            {character && (
                <table>
                    <caption
                        className="
                        font-yatra-one 
                        text-2xl 
                        whitespace-nowrap 
                        text-yellow-200 
                    ">
                        Character Information
                        <hr className="border-stone-700 mt-2 mb-4" />
                    </caption>
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
                                {character.displayName}
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
                                    {character.online ?
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
                                {character.level}
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
                                {getSexName(character.sex)}
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
                                {getVocationName(character.vocation)}
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
                                {getCityName(character.residence)}
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
                                {character.premium ?
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
                                {character.online ? "Playing for" : "Offline for"}
                            </th>
                            <td className="text-sm">
                                {capitalizeFirstLetter(formatDistanceToNow(new Date(character.onlineUpdatedAt)))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Table