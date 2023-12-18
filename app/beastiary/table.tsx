"use client"

import { useState } from "react"
import beastiaryData from '../../prisma/seeds/beastiary'

import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa"

type Field = "name" | "xp" | "hp"
type Order = "asc" | "desc"

const Table: React.FC = () => {

    const [beastiary, setBeastiary] = useState([...beastiaryData].sort((a, b) => !a.xp ? -1 : !b.xp ? 1 : a.xp - b.xp))
    const [sortProps, setSortProps] = useState<{ field: Field, order: Order }>({
        field: 'xp',
        order: 'asc'
    })

    const handleSort = (field: Field) => {
        if (field === 'name') {
            if (sortProps.order === 'desc') {
                setBeastiary([...beastiary].sort((a, b) => a.name.localeCompare(b.name)))
                setSortProps({ field: 'name', order: 'asc' })
            } else {
                setBeastiary([...beastiary].sort((a, b) => b.name.localeCompare(a.name)))
                setSortProps({ field: 'name', order: 'desc' })
            }
        }

        if (field === 'xp') {
            if (sortProps.order === 'desc') {
                setBeastiary([...beastiary].sort((a, b) => !a.xp ? -1 : !b.xp ? 1 : a.xp - b.xp))
                setSortProps({ field: 'xp', order: 'asc' })
            } else {
                setBeastiary([...beastiary].sort((a, b) => !a.xp ? 1 : !b.xp ? -1 : b.xp - a.xp))
                setSortProps({ field: 'xp', order: 'desc' })
            }
        }

        if (field === 'hp') {
            if (sortProps.order === 'desc') {
                setBeastiary([...beastiary].sort((a, b) => !a.hp ? -1 : !b.hp ? 1 : a.hp - b.hp))
                setSortProps({ field: 'hp', order: 'asc' })
            } else {
                setBeastiary([...beastiary].sort((a, b) => !a.hp ? 1 : !b.hp ? -1 : b.hp - a.hp))
                setSortProps({ field: 'hp', order: 'desc' })
            }
        }
    }

    return (
        <div className="px-3 pt-1 bg-stone-800 rounded-3xl border border-stone-200/10 w-full sm:w-fit">
            <div className="max-h-[80vh] w-full sm:w-[75vw] overflow-y-auto rounded-xl">
                <table className="relative w-full">
                    <thead className="top-0 sticky z-10">
                        <tr
                            className="
                                    self-end
                                    shadow-md
                                    [&>th]:py-1
                                    uppercase
                                    font-yatra-one
                                    bg-stone-800
                                    select-none
                                "
                        >
                            <th scope="col" className="min-w-[40px]"></th>
                            <th className="min-w-[100px] cursor-pointer" scope="col" onClick={() => handleSort('name')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block  [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Name
                                    {sortProps.field === 'name' ? sortProps.order === 'asc' ?
                                        <FaSortAlphaDown /> : <FaSortAlphaUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[100px] cursor-pointer" scope="col" onClick={() => handleSort('xp')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    XP
                                    {sortProps.field === 'xp' ? sortProps.order === 'asc' ?
                                        <FaSortNumericDown /> : <FaSortNumericUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[100px] cursor-pointer" scope="col" onClick={() => handleSort("hp")}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    HP
                                    {sortProps.field === 'hp' ? sortProps.order === 'asc' ?
                                        <FaSortNumericDown /> : <FaSortNumericUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[100px]" scope="col">
                                Loot
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {beastiary.map(({ name, imageSrc, xp, hp, loot }, i) => (
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
                                <td className="min-w-[100px]">
                                    <img className="m-auto" src={imageSrc} alt={name} />
                                </td>
                                <td className="text-left capitalize text-base sm:text-lg text-tibia-green font-medium">{name}</td>
                                <td>
                                    {xp && (
                                        <div className="flex w-fit m-auto gap-1">
                                            <img className="self-center" src="/assets/imgs/icons/xp.gif" alt="experience" />
                                            {xp}
                                        </div>
                                    )}
                                </td>
                                <td className="text-red-400">
                                    <div className="flex w-fit m-auto gap-1">
                                        <img className="self-center" src="/assets/imgs/icons/hp.gif" alt="healthpoints" />
                                        {hp}
                                    </div>
                                </td>
                                <td>{loot?.sort().join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                            <td colSpan={5} className="py-2" />
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Table