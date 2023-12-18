"use client"

import { useState } from "react"
import distanceData from '../../../../prisma/seeds/distance'
import ammunitionsData from '../../../../prisma/seeds/ammunitions'

import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp, FaCheck, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"
import { FaX } from "react-icons/fa6"

type Field = "name" | "atk" | "weight" | "twoHanded"
type Order = "asc" | "desc"

const Table: React.FC = () => {

    const [distance, setDistance] = useState([...distanceData].sort((a, b) => !a.atk ? 1 : !b.atk ? -1 : b.atk - a.atk))
    const [distanceSortProps, setDistanceSortProps] = useState<{ field: Field, order: Order }>({
        field: 'atk',
        order: 'desc'
    })

    const [ammunitions, setAmmunitions] = useState([...ammunitionsData].sort((a, b) => !a.atk ? 1 : !b.atk ? -1 : b.atk - a.atk))
    const [ammunitionsSortProps, setAmmunitionsSortProps] = useState<{ field: Field, order: Order }>({
        field: 'atk',
        order: 'desc'
    })

    const handleSortDistance = (field: Field) => {
        if (field === 'name') {
            if (distanceSortProps.order === 'desc') {
                setDistance([...distance].sort((a, b) => a.name.localeCompare(b.name)))
                setDistanceSortProps({ field: 'name', order: 'asc' })
            } else {
                setDistance([...distance].sort((a, b) => b.name.localeCompare(a.name)))
                setDistanceSortProps({ field: 'name', order: 'desc' })
            }
        }

        if (field === 'atk') {
            if (distanceSortProps.order === 'desc') {
                setDistance([...distance].sort((a, b) => !a.atk ? -1 : !b.atk ? 1 : a.atk - b.atk))
                setDistanceSortProps({ field: 'atk', order: 'asc' })
            } else {
                setDistance([...distance].sort((a, b) => !a.atk ? 1 : !b.atk ? -1 : b.atk - a.atk))
                setDistanceSortProps({ field: 'atk', order: 'desc' })
            }
        }

        if (field === 'weight') {
            if (distanceSortProps.order === 'desc') {
                setDistance([...distance].sort((a, b) => a.weight - b.weight))
                setDistanceSortProps({ field: 'weight', order: 'asc' })
            } else {
                setDistance([...distance].sort((a, b) => b.weight - a.weight))
                setDistanceSortProps({ field: 'weight', order: 'desc' })
            }
        }

        if (field === 'twoHanded') {
            if (distanceSortProps.order === 'desc') {
                setDistance([...distance].sort((a, b) => (a.twoHanded === b.twoHanded) ? 0 : a.twoHanded ? -1 : 1))
                setDistanceSortProps({ field: 'twoHanded', order: 'asc' })
            } else {
                setDistance([...distance].sort((a, b) => (b.twoHanded === a.twoHanded) ? 0 : b.twoHanded ? -1 : 1))
                setDistanceSortProps({ field: 'twoHanded', order: 'desc' })
            }
        }
    }

    const handleSortAmmunitions = (field: Field) => {
        if (field === 'name') {
            if (ammunitionsSortProps.order === 'desc') {
                setAmmunitions([...ammunitions].sort((a, b) => a.name.localeCompare(b.name)))
                setAmmunitionsSortProps({ field: 'name', order: 'asc' })
            } else {
                setAmmunitions([...ammunitions].sort((a, b) => b.name.localeCompare(a.name)))
                setAmmunitionsSortProps({ field: 'name', order: 'desc' })
            }
        }

        if (field === 'atk') {
            if (ammunitionsSortProps.order === 'desc') {
                setAmmunitions([...ammunitions].sort((a, b) => !a.atk ? -1 : !b.atk ? 1 : a.atk - b.atk))
                setAmmunitionsSortProps({ field: 'atk', order: 'asc' })
            } else {
                setAmmunitions([...ammunitions].sort((a, b) => !a.atk ? 1 : !b.atk ? -1 : b.atk - a.atk))
                setAmmunitionsSortProps({ field: 'atk', order: 'desc' })
            }
        }

        if (field === 'weight') {
            if (ammunitionsSortProps.order === 'desc') {
                setAmmunitions([...ammunitions].sort((a, b) => a.weight - b.weight))
                setAmmunitionsSortProps({ field: 'weight', order: 'asc' })
            } else {
                setAmmunitions([...ammunitions].sort((a, b) => b.weight - a.weight))
                setAmmunitionsSortProps({ field: 'weight', order: 'desc' })
            }
        }
    }

    return (
        <div className="flex flex-col gap-10">
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
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSortDistance('name')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block  [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Name
                                        {distanceSortProps.field === 'name' ? distanceSortProps.order === 'asc' ?
                                            <FaSortAlphaDown /> : <FaSortAlphaUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSortDistance('atk')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Atk
                                        {distanceSortProps.field === 'atk' ? distanceSortProps.order === 'asc' ?
                                            <FaSortNumericDown /> : <FaSortNumericUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[150px]" scope="col" onClick={() => handleSortDistance("twoHanded")}>
                                    <div className="w-fit whitespace-nowrap relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Two Hands
                                        {distanceSortProps.field === 'twoHanded' ? distanceSortProps.order === 'asc' ?
                                            <FaSortAmountDown /> : <FaSortAmountUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="text-stone-500 min-w-[100px]" scope="col" onClick={() => handleSortDistance("weight")}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Weight
                                        {distanceSortProps.field === 'weight' ? distanceSortProps.order === 'asc' ?
                                            <FaSortNumericDown /> : <FaSortNumericUp />
                                            : null
                                        }
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {distance.map(({ weight, name, imageSrc, atk, twoHanded }, i) => (
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
                                    <td><div className="flex justify-center">{twoHanded ? <FaCheck /> : <FaX />}</div></td>
                                    <td className="text-stone-500">{weight} oz</td>
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
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSortAmmunitions('name')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block  [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Name
                                        {ammunitionsSortProps.field === 'name' ? ammunitionsSortProps.order === 'asc' ?
                                            <FaSortAlphaDown /> : <FaSortAlphaUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSortAmmunitions('atk')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Atk
                                        {ammunitionsSortProps.field === 'atk' ? ammunitionsSortProps.order === 'asc' ?
                                            <FaSortNumericDown /> : <FaSortNumericUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="text-stone-500 min-w-[100px]" scope="col" onClick={() => handleSortAmmunitions("weight")}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Weight
                                        {ammunitionsSortProps.field === 'weight' ? ammunitionsSortProps.order === 'asc' ?
                                            <FaSortNumericDown /> : <FaSortNumericUp />
                                            : null
                                        }
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ammunitions.map(({ weight, name, imageSrc, atk }, i) => (
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
                                    <td className="text-stone-500">{weight} oz</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                                <td colSpan={4} className="py-2" />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table