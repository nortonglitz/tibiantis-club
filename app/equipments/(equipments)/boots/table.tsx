"use client"

import { useState } from "react"
import bootsData from '../../../../prisma/seeds/boots'

import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa"

type Field = "name" | "attr" | "weight" | "arm"
type Order = "asc" | "desc"

const Table: React.FC = () => {

    const [boots, setBoots] = useState([...bootsData].sort((a, b) => a.name.localeCompare(b.name)))
    const [sortProps, setSortProps] = useState<{ field: Field, order: Order }>({
        field: 'name',
        order: 'asc'
    })

    const handleSort = (field: Field) => {
        if (field === 'name') {
            if (sortProps.order === 'desc') {
                setBoots([...boots].sort((a, b) => a.name.localeCompare(b.name)))
                setSortProps({ field: 'name', order: 'asc' })
            } else {
                setBoots([...boots].sort((a, b) => b.name.localeCompare(a.name)))
                setSortProps({ field: 'name', order: 'desc' })
            }
        }

        if (field === 'arm') {
            if (sortProps.order === 'desc') {
                setBoots([...boots].sort((a, b) => !a.arm ? -1 : !b.arm ? 1 : a.arm - b.arm))
                setSortProps({ field: 'arm', order: 'asc' })
            } else {
                setBoots([...boots].sort((a, b) => !a.arm ? 1 : !b.arm ? -1 : b.arm - a.arm))
                setSortProps({ field: 'arm', order: 'desc' })
            }
        }

        if (field === 'weight') {
            if (sortProps.order === 'desc') {
                setBoots([...boots].sort((a, b) => a.weight - b.weight))
                setSortProps({ field: 'weight', order: 'asc' })
            } else {
                setBoots([...boots].sort((a, b) => b.weight - a.weight))
                setSortProps({ field: 'weight', order: 'desc' })
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
                            <th className="min-w-[100px] cursor-pointer" scope="col" onClick={() => handleSort('arm')}>
                                <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                    Arm
                                    {sortProps.field === 'arm' ? sortProps.order === 'asc' ?
                                        <FaSortNumericDown /> : <FaSortNumericUp />
                                        : null
                                    }
                                </div>
                            </th>
                            <th className="min-w-[100px]" scope="col">
                                Attr
                            </th>
                            <th className="text-stone-500 min-w-[100px] cursor-pointer" scope="col" onClick={() => handleSort("weight")}>
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
                        {boots.map(({ weight, name, imageSrc, arm, attr }, i) => (
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
                                <td>{arm}</td>
                                <td>{attr}</td>
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
    )
}

export default Table