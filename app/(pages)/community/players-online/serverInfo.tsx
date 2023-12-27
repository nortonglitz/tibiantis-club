"use client"

import { usePlayersOnlineQuantity } from "@/app/hooks/usePlayersOnlineQuantity"
import { usePlayersOnlineRecord } from "@/app/hooks/usePlayersOnlineRecord"
import { format } from "date-fns"


const ServerInfo = () => {

    const { quantity, isLoading: isLoadingQuantity } = usePlayersOnlineQuantity()
    const { record, isLoading: isLoadingRecord } = usePlayersOnlineRecord()

    return (
        <div
            className="
                bg-stone-800/20
                p-4
                border
                border-stone-700/40
                rounded-3xl
            "
        >
            <table
                className="
                    border-separate
                    border-spacing-x-5
                "
            >
                <tbody
                    className="
                        [&>tr>th]:font-yatra-one
                        [&>tr>th]:text-right
                        [&>tr>td]:text-sm
                        border-separate
                        border-spacing-x-5
                    "
                >
                    <tr>
                        <th>Players Online</th>
                        <td className="font-bold">
                            {isLoadingQuantity ?
                                <div className="w-[3rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                :
                                <>{quantity}</>
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td className="font-semibold">
                            {isLoadingQuantity ?
                                <div className="w-[5rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                :
                                quantity && quantity > 0 ?
                                    <span className="text-tibia-green">Online</span>
                                    :
                                    <span className="text-red-600">Offline</span>
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <td>
                            <div className="flex items-center">
                                London, UK
                                <img className="ml-2 h-[10px]" src="/assets/imgs/icons/uk_flag.gif" alt="UK" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Launch Date</th>
                        <td>April 4, 2020</td>
                    </tr>
                    <tr>
                        <th>PvP Type</th>
                        <td>Normal</td>
                    </tr>
                    <tr>
                        <th className="block">Online Record</th>
                        <td>
                            {
                                isLoadingRecord ?
                                    <>
                                        <div className="w-[3rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" />
                                        <div className="w-[9rem] bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full mt-1" />
                                    </>
                                    :
                                    record ?
                                        <>
                                            {record.quantity}
                                            <p>{format(record.updatedAt, "d MMM Y HH:mm")}</p>
                                        </>
                                        :
                                        "N/A"
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ServerInfo