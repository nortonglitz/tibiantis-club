"use client"

import { useState } from "react"

import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa"
import { usePlayersOnline } from "@/app/hooks/usePlayersOnline"
import { getVocationName } from "@/app/libs/enumAssist"

type Field = "name" | "vocation" | "level"
type Order = "asc" | "desc"

const Table: React.FC = () => {

    const { players, isLoading } = usePlayersOnline()

    const [sortProps, setSortProps] = useState<{ field: Field, order: Order }>({
        field: 'name',
        order: 'asc'
    })

    const handleSort = (field: Field) => {
        if (field === 'level') {
            if (sortProps.order === 'desc') {
                players.sort((a, b) => a.level - b.level)
                setSortProps({ field: 'level', order: 'asc' })
            } else {
                players.sort((a, b) => b.level - a.level)
                setSortProps({ field: 'level', order: 'desc' })
            }
        }

        if (field === 'name') {
            if (sortProps.order === 'desc') {
                players.sort((a, b) => a.name.localeCompare(b.name))
                setSortProps({ field: 'name', order: 'asc' })
            } else {
                players.sort((a, b) => b.name.localeCompare(a.name))
                setSortProps({ field: 'name', order: 'desc' })
            }
        }

        if (field === 'vocation') {
            if (sortProps.order === 'desc') {
                players.sort((a, b) => a.vocation - b.vocation)
                setSortProps({ field: 'vocation', order: 'asc' })
            } else {
                players.sort((a, b) => b.vocation - a.vocation)
                setSortProps({ field: 'vocation', order: 'desc' })
            }
        }
    }

    return (
        <div className="px-3 pt-1 bg-stone-800 rounded-3xl border border-stone-200/10 w-full sm:w-fit">
            <div className="h-fit max-h-[80vh] w-full sm:w-[75vw] overflow-y-auto rounded-xl">
                <table className="relative text-center w-full">
                    <thead className="top-0 sticky z-10">
                        <tr
                            className="
                                    self-end
                                    shadow-md
                                    [&>th]:py-1
                                    uppercase
                                    font-yatra-one
                                    bg-stone-800
                                    [&>th]:cursor-pointer
                                    select-none
                                "
                        >
                            <th className="min-w-[100px]" scope="col" onClick={() => handleSort('name')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block  [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Name
                                    {sortProps.field === 'name' ? sortProps.order === 'asc' ?
                                        <FaSortAlphaDown /> : <FaSortAlphaUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[100px]" scope="col" onClick={() => handleSort('level')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Level
                                    {sortProps.field === 'level' ? sortProps.order === 'asc' ?
                                        <FaSortNumericDown /> : <FaSortNumericUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[100px]" scope="col" onClick={() => handleSort('vocation')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Vocation
                                    {sortProps.field === 'vocation' ? sortProps.order === 'asc' ?
                                        <FaSortAlphaDown /> : <FaSortAlphaUp />
                                        : null
                                    }
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <tr>
                                <td colSpan={3}>
                                    <img
                                        className="mx-auto my-10"
                                        src="/assets/imgs/loading/players_loading.gif" alt="loading players"
                                    />
                                </td>
                            </tr>
                            :
                            players.map(({ level, vocation, name }, i) => (
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
                                    <td className="text-left capitalize px-2 text-yellow-200 sm:text-lg">{name}</td>
                                    <td>{level}</td>
                                    <td className="capitalize">{getVocationName(vocation)}</td>
                                </tr>
                            ))}
                        <tr />
                    </tbody>
                    <tfoot>
                        <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                            <td colSpan={3} className="py-2" />
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Table