"use client"

import { FormEventHandler, useState } from "react"
import { getVocationName } from "@/app/libs/enumAssist"
import Link from "next/link"

import InputText from "@/app/components/inputs/inputText"
import Button from "@/app/components/buttons/button"

import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa"
import { useFindCharacter, CharacterFound } from "@/app/hooks/useFindCharacter"


type Field = "name" | "vocation" | "level"
type Order = "asc" | "desc"

const Finder = () => {

    const [findCharacterName, setFindCharacterName] = useState('')

    const [sortProps, setSortProps] = useState<{ field: Field, order: Order }>({
        field: 'name',
        order: 'asc'
    })

    const { characters, error, isLoading } = useFindCharacter(findCharacterName.length > 2 ? findCharacterName : '')

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault()

    }

    const handleSort = (field: Field) => {
        if (field === 'level') {
            if (sortProps.order === 'desc') {
                characters.sort((a, b) => a.level - b.level)
                setSortProps({ field: 'level', order: 'asc' })
            } else {
                characters.sort((a, b) => b.level - a.level)
                setSortProps({ field: 'level', order: 'desc' })
            }
        }

        if (field === 'name') {
            if (sortProps.order === 'desc') {
                characters.sort((a, b) => a.name.localeCompare(b.name))
                setSortProps({ field: 'name', order: 'asc' })
            } else {
                characters.sort((a, b) => b.name.localeCompare(a.name))
                setSortProps({ field: 'name', order: 'desc' })
            }
        }

        if (field === 'vocation') {
            if (sortProps.order === 'desc') {
                characters.sort((a, b) => a.vocation - b.vocation)
                setSortProps({ field: 'vocation', order: 'asc' })
            } else {
                characters.sort((a, b) => b.vocation - a.vocation)
                setSortProps({ field: 'vocation', order: 'desc' })
            }
        }
    }

    return (
        <>
            <div className="w-full sm:w-[75vw] md:w-[60vw] lg:w-[40vw] bg-stone-800 p-4 rounded-3xl border border-stone-600/30">
                <h3 className="font-yatra-one text-2xl text-yellow-200">Find Character</h3>
                <hr className="mt-2 mb-4 border-stone-600/30" />
                <form className="flex items-center gap-2 flex-nowrap" onSubmit={handleSubmit}>
                    <InputText
                        placeholder="Character Name"
                        className="py-2 flex-1"
                        classNameInput="py-2"
                        onChange={e => setFindCharacterName(e.target.value)}
                    />
                    <Button className="py-3">Submit</Button>
                </form>
            </div>
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
                                            <FaSortAmountDown /> : <FaSortAmountUp />
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
                                characters && characters.length > 0 ?
                                    characters.map(({ level, vocation, displayName }, i) => (
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
                                                <div className="flex w-full text-left">
                                                    <Link
                                                        href={`/characters/${displayName.replace(' ', '-')}`}
                                                        className="
                                                px-2 
                                                text-yellow-200
                                                sm:text-lg
                                                active:text-yellow-300
                                                hover:underline
                                                hover:underline-offset-4
                                            "
                                                    >
                                                        {displayName}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>{level}</td>
                                            <td className="capitalize">{getVocationName(vocation)}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={3} className="text-center pt-4 text-stone-400">
                                            There are no characters to show
                                        </td>
                                    </tr>
                            }
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
        </>
    )
}

export default Finder