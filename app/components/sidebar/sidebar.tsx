"use client"

import Category from './category'
import useSidebarStore from "@/app/stores/useSidebarStore"
import ListenerClickOutside from "../listeners/listenerClickOutside"
import { usePlayersOnline } from "@/app/hooks/usePlayersOnline"

const Sidebar = () => {

    const { isOpen, setIsOpen } = useSidebarStore()

    const closeSidebar = () => {
        setIsOpen(false)
    }

    const { quantity } = usePlayersOnline()

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
                        {quantity}
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
                        active:bg-stone-700/50 
                        transition
                        border
                        border-stone-600/30
                        hover:shadow-md
                        hover:shadow-stone-950
                        mt-10
                    "
                >
                    <img src="/assets/player-male.gif" className="w-[32px] h-[32px]" height={32} width={32} alt="player profile" />
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
                            Player
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
                    <Category onClick={closeSidebar} href="/market" src="/assets/bill.gif" title="community" />
                    <Category onClick={closeSidebar} href="/beastiary" src="/assets/imgs/beastiary/kobold.gif" title="beastiary" />
                    <Category onClick={closeSidebar} href="#" src="/assets/abacus.gif" title="calculators" />
                    <Category onClick={closeSidebar} href="/experience" src="/assets/xp.webp" title="experience" />
                    <Category onClick={closeSidebar} href="#" src="/assets/spellbook.gif" title="spells" />
                    <Category onClick={closeSidebar} href="#" src="/assets/gfb.gif" title="runes" />
                    <Category onClick={closeSidebar} href="/foods" src="/assets/cheese.gif" title="foods" />
                    <Category onClick={closeSidebar} href="/equipments" src="/assets/aol.png" title="equipments" />
                    <Category onClick={closeSidebar} href="#" src="/assets/npc.gif" title="NPCs" />
                </div>
            </div>
        </ListenerClickOutside >
    )
}

export default Sidebar