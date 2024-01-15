"use client"

import { MouseEventHandler, useState } from "react"
import spellsData from "@/prisma/seeds/spells"

import { getVocationNumber } from "@/app/libs/enumAssist"
import { FaCheck, FaSortAlphaDown, FaSortAlphaUp, FaSortAmountDown, FaSortAmountUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa"
import { getSpellGroupName } from "@/app/libs/enumAssist"
import { FaX } from "react-icons/fa6"

type Field = "name" | "invocation" | "vocation" | "group" | "isPremium" | "mlCast" | "mana" | "price" | "isRune"
type Order = "asc" | "desc"

interface TagProps {
    name: string
    selected?: boolean
    imgSrc: string
    onClick: MouseEventHandler<HTMLDivElement>
}

const Tag: React.FC<TagProps> = ({
    name,
    selected = false,
    imgSrc,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`
                transition-all
                bg-stone-800
                flex
                items-center
                min-w-fit
                p-2
                border
                border-stone-600/30
                rounded-3xl
                cursor-pointer
                ${selected ? 'text-yellow-300' : 'text-yellow-200/30'}
                ${selected ? '' : 'hover:text-yellow-200'}       
                active:text-yellow-300
                hover:border-stone-600/70
                select-none
                capitalize
                group
            `}
        >
            <img
                src={imgSrc}
                alt={name}
                className={`
                    ${selected ? '' : 'grayscale'}
                    group-hover:grayscale-0
                    mr-1
                `}
            />
            <span className="w-full text-center font-yatra-one text-xl">{name}</span>
        </div>
    )
}

type Vocation = "all" | "sorcerer" | "druid" | "knight" | "paladin"

const Table: React.FC = () => {

    const [spells, setSpells] = useState([...spellsData].sort((a, b) => a.name.localeCompare(b.name)))
    const [vocation, setVocation] = useState('all')
    const [sortProps, setSortProps] = useState<{ field: Field, order: Order }>({
        field: 'name',
        order: 'asc'
    })

    const handleTagClick = (voc: Vocation) => {
        setVocation(voc)

        if (voc === "all") {
            setSpells([...spellsData])
            return
        }

        setSpells([...spellsData.filter(({ vocations }) => vocations.find(vocNum => vocNum === getVocationNumber(voc)))])
    }

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

        if (field === 'price') {
            if (sortProps.order === 'desc') {
                setSpells([...spells].sort((a, b) => a.price - b.price))
                setSortProps({ field: 'price', order: 'asc' })
            } else {
                setSpells([...spells].sort((a, b) => b.price - a.price))
                setSortProps({ field: 'price', order: 'desc' })
            }
        }

        if (field === 'group') {
            if (sortProps.order === 'desc') {
                setSpells([...spells].sort((a, b) => a.group - b.group))
                setSortProps({ field: 'group', order: 'asc' })
            } else {
                setSpells([...spells].sort((a, b) => b.group - a.group))
                setSortProps({ field: 'group', order: 'desc' })
            }
        }

        if (field === 'isRune') {
            if (sortProps.order === 'asc') {
                setSpells([...spells].sort((a, b) => (a.isRune === b.isRune) ? 0 : a.isRune ? -1 : 1))
                setSortProps({ field: 'isRune', order: 'desc' })
            } else {
                setSpells([...spells].sort((a, b) => (a.isRune === b.isRune) ? 0 : b.isRune ? -1 : 1))
                setSortProps({ field: 'isRune', order: 'asc' })
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

        if (field === 'isPremium') {
            if (sortProps.order === 'desc') {
                setSpells([...spells].sort((a, b) => (a.isPremium === b.isPremium) ? 0 : a.isPremium ? -1 : 1))
                setSortProps({ field: 'isPremium', order: 'asc' })
            } else {
                setSpells([...spells].sort((a, b) => (a.isPremium === b.isPremium) ? 0 : b.isPremium ? -1 : 1))
                setSortProps({ field: 'isPremium', order: 'desc' })
            }
        }
    }

    return (
        <>
            <div className="flex gap-4 w-full overflow-auto md:justify-center py-2">
                <Tag
                    selected={vocation === 'all'}
                    name="all"
                    imgSrc="/assets/imgs/icons/spellbook.gif"
                    onClick={() => handleTagClick('all')}
                />
                <Tag
                    selected={vocation === 'knight'}
                    name="knight"
                    imgSrc="/assets/imgs/icons/knight_icon.gif"
                    onClick={() => handleTagClick('knight')}
                />
                <Tag
                    selected={vocation === 'paladin'}
                    name="paladin"
                    imgSrc="/assets/imgs/icons/paladin_icon.gif"
                    onClick={() => handleTagClick('paladin')}
                />
                <Tag
                    selected={vocation === 'druid'}
                    name="druid"
                    imgSrc="/assets/imgs/icons/druid_icon.gif"
                    onClick={() => handleTagClick('druid')}
                />
                <Tag
                    selected={vocation === 'sorcerer'}
                    name="sorcerer"
                    imgSrc="/assets/imgs/icons/sorcerer_icon.gif"
                    onClick={() => handleTagClick('sorcerer')}
                />
            </div>
            <div className="px-3 pt-1 bg-stone-800 rounded-3xl border border-stone-200/10 w-full sm:w-fit">
                <div className="max-h-[75vh] h-fit w-full sm:w-[75vw] overflow-y-auto rounded-xl">
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
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('group')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Group
                                        {sortProps.field === 'group' ? sortProps.order === 'asc' ?
                                            <FaSortAlphaDown /> : <FaSortAlphaUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('isRune')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Type
                                        {sortProps.field === 'isRune' ? sortProps.order === 'asc' ?
                                            <FaSortAlphaDown /> : <FaSortAlphaUp />
                                            : null
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('isPremium')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Premium
                                        {sortProps.field === 'isPremium' ? sortProps.order === 'asc' ?
                                            <FaSortAmountDown /> : <FaSortAmountUp />
                                            : null
                                        }
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
                                <th className="min-w-[100px]" scope="col" onClick={() => handleSort('price')}>
                                    <div className="w-fit relative m-auto [&>svg]:hidden sm:[&>svg]:block [&>svg]:absolute [&>svg]:top-[0.1rem] [&>svg]:-right-6">
                                        Price
                                        {sortProps.field === 'price' ? sortProps.order === 'asc' ?
                                            <FaSortNumericDown /> : <FaSortNumericUp />
                                            : null
                                        }
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {spells.map(({ name, invocation, group, isPremium, mana, price, isRune, imgSrc }, i) => (
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
                                        <span className="italic text-sm"> ({invocation})</span>
                                    </td>
                                    <td>{getSpellGroupName(group)}</td>
                                    <td>{isRune ? "rune" : "instant"}</td>
                                    <td><div className="flex justify-center">{isPremium ? <FaCheck /> : <FaX />}</div></td>
                                    <td>{mana}</td>
                                    <td>{price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
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