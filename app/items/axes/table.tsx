"use client"

import { useState } from "react"
import axesData from '../../../prisma/seeds/axes'

import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp, FaCheck, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"
import { FaX } from "react-icons/fa6"

type Field = "name" | "atk" | "def" | "weight" | "twoHanded"
type Order = "asc" | "desc"

const Table: React.FC = () => {

    const [axes, setAxes] = useState([...axesData].sort((a, b) => a.name.localeCompare(b.name)))
    const [sortProps, setSortProps] = useState<{ field: Field, order: Order }>({
        field: 'name',
        order: 'asc'
    })

    const handleSort = (field: Field) => {
        if (field === 'name') {
            if (sortProps.order === 'desc') {
                setAxes([...axes].sort((a, b) => a.name.localeCompare(b.name)))
                setSortProps({ field: 'name', order: 'asc' })
            } else {
                setAxes([...axes].sort((a, b) => b.name.localeCompare(a.name)))
                setSortProps({ field: 'name', order: 'desc' })
            }
        }

        if (field === 'atk') {
            if (sortProps.order === 'desc') {
                setAxes([...axes].sort((a, b) => a.atk - b.atk))
                setSortProps({ field: 'atk', order: 'asc' })
            } else {
                setAxes([...axes].sort((a, b) => b.atk - a.atk))
                setSortProps({ field: 'atk', order: 'desc' })
            }
        }

        if (field === 'def') {
            if (sortProps.order === 'desc') {
                setAxes([...axes].sort((a, b) => a.def - b.def))
                setSortProps({ field: 'def', order: 'asc' })
            } else {
                setAxes([...axes].sort((a, b) => b.def - a.def))
                setSortProps({ field: 'def', order: 'desc' })
            }
        }

        if (field === 'weight') {
            if (sortProps.order === 'desc') {
                setAxes([...axes].sort((a, b) => a.weight - b.weight))
                setSortProps({ field: 'weight', order: 'asc' })
            } else {
                setAxes([...axes].sort((a, b) => b.weight - a.weight))
                setSortProps({ field: 'weight', order: 'desc' })
            }
        }

        if (field === 'twoHanded') {
            if (sortProps.order === 'desc') {
                setAxes([...axes].sort((a, b) => (a.twoHanded === b.twoHanded) ? 0 : a.twoHanded ? -1 : 1))
                setSortProps({ field: 'twoHanded', order: 'asc' })
            } else {
                setAxes([...axes].sort((a, b) => (b.twoHanded === a.twoHanded) ? 0 : b.twoHanded ? -1 : 1))
                setSortProps({ field: 'twoHanded', order: 'desc' })
            }
        }
    }

    return (
        <div className="px-3 pt-1 bg-stone-800 rounded-3xl border border-stone-200/10 w-full sm:w-fit">
            <div className="max-h-[80vh] w-full sm:w-[75vw] overflow-y-auto rounded-xl">
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
                            <th className="min-w-[100px]" scope="col" onClick={() => handleSort('atk')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Atk
                                    {sortProps.field === 'atk' ? sortProps.order === 'asc' ?
                                        <FaSortNumericDown /> : <FaSortNumericUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[100px]" scope="col" onClick={() => handleSort('def')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Def
                                    {sortProps.field === 'def' ? sortProps.order === 'asc' ?
                                        <FaSortNumericDown /> : <FaSortNumericUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[150px]" scope="col" onClick={() => handleSort("twoHanded")}>
                                <div className="w-fit whitespace-nowrap relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Two Hands
                                    {sortProps.field === 'twoHanded' ? sortProps.order === 'asc' ?
                                        <FaSortAmountDown /> : <FaSortAmountUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="text-stone-500 min-w-[100px]" scope="col" onClick={() => handleSort("weight")}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Weight
                                    {sortProps.field === 'weight' ? sortProps.order === 'asc' ?
                                        <FaSortNumericDown /> : <FaSortNumericUp />
                                        : null
                                    }
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {axes.map(({ weight, name, imageSrc, atk, def, twoHanded }, i) => (
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
                                    <img className="m-auto" src={imageSrc} height={32} width={32} alt={name} />
                                </td>
                                <td className="text-left capitalize text-base sm:text-lg">{name}</td>
                                <td>{atk}</td>
                                <td>{def}</td>
                                <td><div className="flex justify-center">{twoHanded ? <FaCheck /> : <FaX />}</div></td>
                                <td className="text-stone-500">{weight} oz</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                            <td colSpan={6} className="py-2" />
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Table