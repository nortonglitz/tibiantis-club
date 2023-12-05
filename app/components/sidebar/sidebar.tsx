"use client"

import { useEffect, useState } from "react"
import Category from './category'
import Image from "next/image"
import useSidebarStore from "@/app/stores/useSidebarStore"
import ListenerClickOutside from "../listeners/listenerClickOutside"

const Sidebar = () => {

    const { isOpen, setIsOpen } = useSidebarStore()
    const [playersOnline, setPlayersOnline] = useState(0)

    const closeSidebar = () => {
        setIsOpen(false)
    }

    const getPlayersOnline = async () => {
        const data = await fetch("/api/playersHistory/latest", { cache: "no-cache" })
        const dataParsed = await data.json()

        setPlayersOnline(dataParsed.quantity)
    }

    useEffect(() => {
        getPlayersOnline()
    }, [])

    return (
        <ListenerClickOutside onClickOutside={closeSidebar}>
            <div
                className={`
                    px-2
                    py-4
                    fixed
                    h-full
                    bg-stone-900
                    border-l
                    w-52
                    border-stone-600
                    z-[200]
                    top-0
                    right-0
                    transition-all
                    ${isOpen ? '' : 'translate-x-full'}
                    ${isOpen ? 'visible' : 'invisible'}
                `}
            >
                <div className="flex justify-between mx-2 font-yatra-one mb-2">
                    Players Online
                    <strong className="text-yellow-200">
                        {playersOnline}
                    </strong>
                </div>
                <button
                    className="
                        flex 
                        items-center 
                        bg-stone-800 
                        rounded-xl 
                        w-full 
                        p-2 
                        hover:bg-stone-700/50 
                        transition
                        border
                        border-stone-600/30
                        active:shadow-md
                        active:shadow-stone-950
                        mt-10
                    "
                >
                    <Image src="/assets/player-male.gif" className="w-[32px] h-[32px]" height={32} width={32} alt="player profile" />
                    <div className="flex flex-col ml-4 font-sans overflow-clip">
                        <div
                            className="
                                text-tibia-green 
                                font-medium
                                w-full
                                text-ellipsis
                                overflow-hidden
                                whitespace-nowrap
                                text-left
                            "
                        >
                            Tonnor
                        </div>
                        <div className="flex flex-col text-xs [&>div]:w-fit text-stone-400">
                            <div>Level 100</div>
                            <div>Elite Knight</div>
                        </div>
                    </div>
                </button>
                <div
                    className="
                        flex
                        flex-col
                        h-full
                        mt-10
                    "
                >
                    <Category onClick={closeSidebar} href="/market" src="/assets/bill.gif" title="market" />
                    <Category onClick={closeSidebar} href="#" src="/assets/slime.gif" title="creatures" />
                    <Category onClick={closeSidebar} href="#" src="/assets/abacus.gif" title="calculators" />
                    <Category onClick={closeSidebar} href="/experience" src="/assets/xp.webp" title="experience" />
                    <Category onClick={closeSidebar} href="#" src="/assets/spellbook.gif" title="spells" />
                    <Category onClick={closeSidebar} href="#" src="/assets/gfb.gif" title="runes" />
                    <Category onClick={closeSidebar} href="#" src="/assets/cheese.gif" title="foods" />
                    <Category onClick={closeSidebar} href="#" src="/assets/aol.png" title="equipments" />
                    <Category onClick={closeSidebar} href="#" src="/assets/npc.gif" title="NPCs" />
                </div>
            </div>
        </ListenerClickOutside >
    )
}

export default Sidebar