"use client"

import { useState } from "react"
import spellsData from "@/prisma/seeds/spells"

import { intervalToDuration } from "date-fns"
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa"

type Field = "name" | "invocation" | "vocation" | "group" | "isPremium" | "mlCast" | "mana" | "price" | "isRune" | "charges" | "mlUse"
type Order = "asc" | "desc"

const Table: React.FC = () => {

    const [spells, setSpells] = useState([...spellsData].filter(({ isRune }) => isRune).sort((a, b) => a.name.localeCompare(b.name)))
    const [sortProps, setSortProps] = useState<{ field: Field, order: Order }>({
        field: 'name',
        order: 'asc'
    })

    const handleSort = (field: Field) => {
        if (field === 'mana') {
            if (sortProps.order === 'desc') {
                setSpells([...spells].sort((a, b) => {
                    if (!a.mana || !b.mana) return 0
                    if (typeof a.mana === "string" || typeof b.mana === "string") return 0
                    return a.mana - b.mana
                }))
                setSortProps({ field: 'mana', order: 'asc' })
            } else {
                setSpells([...spells].sort((a, b) => {
                    if (!a.mana || !b.mana) return 0
                    if (typeof a.mana === "string" || typeof b.mana === "string") return 0
                    return b.mana - a.mana
                }))
                setSortProps({ field: 'mana', order: 'desc' })
            }
        }

        if (field === 'mlUse') {
            if (sortProps.order === 'desc') {
                setSpells([...spells].sort((a, b) => Number(a.mlUse) - Number(b.mlUse)))
                setSortProps({ field: 'mlUse', order: 'asc' })
            } else {
                setSpells([...spells].sort((a, b) => Number(b.mlUse) - Number(a.mlUse)))
                setSortProps({ field: 'mlUse', order: 'desc' })
            }
        }

        if (field === 'charges') {
            if (sortProps.order === 'desc') {
                setSpells([...spells].sort((a, b) => Number(a.charges) - Number(b.charges)))
                setSortProps({ field: 'charges', order: 'asc' })
            } else {
                setSpells([...spells].sort((a, b) => Number(b.charges) - Number(a.charges)))
                setSortProps({ field: 'charges', order: 'desc' })
            }
        }

        if (field === 'name') {
            if (sortProps.order === 'desc') {
                setSpells([...spells].sort((a, b) => a.name.localeCompare(b.name)))
                setSortProps({ field: 'name', order: 'asc' })
            } else {
                setSpells([...spells].sort((a, b) => b.name.localeCompare(a.name)))
                setSortProps({ field: 'name', order: 'desc' })
            }
        }
    }

    return (
        <>
            <div className="px-3 pt-1 bg-stone-800 rounded-3xl border border-stone-200/10 w-full sm:w-fit">
                <div className="max-h-[80vh] h-fit w-full sm:w-[75vw] overflow-y-auto rounded-xl">
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
                                <th scope="col" className="min-w-[40px]"></th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('name')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block  [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Name
                                        {sortProps.field === 'name' ? sortProps.order === 'asc' ?
                                            <FaSortAlphaDown /> : <FaSortAlphaUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('charges')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Charges
                                        {sortProps.field === 'charges' ? sortProps.order === 'asc' ?
                                            <FaSortNumericDown /> : <FaSortNumericUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('mlUse')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        ML to use
                                        {sortProps.field === 'mlUse' ? sortProps.order === 'asc' ?
                                            <FaSortNumericUp /> : <FaSortNumericDown />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col">
                                    <div className="cursor-default w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        BP Time
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('mana')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Mana
                                        {sortProps.field === 'mana' ? sortProps.order === 'asc' ?
                                            <FaSortNumericDown /> : <FaSortNumericUp />
                                            : null
                                        }
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {spells.map(({ name, invocation, charges, mana, mlUse, imgSrc }, i) => (
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
                                    <td>
                                        {imgSrc &&
                                            <img src={imgSrc} className="m-auto" alt={name} />
                                        }
                                    </td>
                                    <td className="text-left text-base sm:text-lg">
                                        <span className="capitalize">{name}</span>
                                        <span className="italic text-sm text-yellow-100"> {invocation}</span>
                                    </td>
                                    <td>{charges}x</td>
                                    <td>{mlUse}</td>
                                    <td>
                                        {mana ?
                                            intervalToDuration({ start: 0, end: Number(mana) * 20 * 4 * 1000 }).hours ?
                                                intervalToDuration({ start: 0, end: Number(mana) * 20 * 4 * 1000 }).hours + 'h'
                                                : ''
                                            : ''
                                        }
                                        {mana ?
                                            intervalToDuration({ start: 0, end: Number(mana) * 20 * 4 * 1000 }).minutes ?
                                                intervalToDuration({ start: 0, end: Number(mana) * 20 * 4 * 1000 }).minutes + 'm'
                                                : ''
                                            : ''
                                        }
                                    </td>
                                    <td>{mana}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-10 z-10" >
                                <td colSpan={7} className="py-2" />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table