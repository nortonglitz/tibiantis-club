"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface EquipmentLinkProps {
    imgSrc: string
    category: string
}

const EquipmentLink: React.FC<EquipmentLinkProps> = ({
    imgSrc,
    category
}) => {

    const pathname = usePathname()

    return (
        <Link
            href={`/equipments/${category}`}
            replace
            className={`
                group
                transition-all
                first:rounded-t-full
                last:rounded-b-full
                bg-stone-800
                odd:border
                even:border-x
                border-stone-600/30
                p-2
                active:bg-stone-700/50
                ${pathname.includes(category) ? "" : "hover:outline-stone-600"}
                ${pathname.includes(category) ? "outline-yellow-200" : "outline-stone-600"}
                outline-1
                outline-offset-[-1px]
                ${pathname.includes(category) ? "z-20" : "hover:z-10"}
                ${pathname.includes(category) ? "outline" : "hover:outline"}
                ${pathname.includes(category) ? "shadow-md shadow-stone-950 z-10" : ""}
                ${pathname.includes(category) ? "scale-110" : ""}
            `}
        >
            <div className="relative">
                <div
                    className={`
                        absolute 
                        top-0
                        left-0 
                        w-[32px] 
                        h-[32px]
                        ${pathname.includes(category) ? "" : "backdrop-grayscale"}
                        ${pathname.includes(category) ? "" : "group-hover:backdrop-grayscale-0"}
                    `}
                />
                <img src={imgSrc} alt={category} width={32} height={32} />
            </div>
        </Link>
    )
}

const EquipmentsLinks = () => {
    return (
        <div className="hidden sm:flex sm:flex-col fixed lg:top-32 md:top-28 sm:top-20 lg:left-16 md:left-8 sm:left-3">
            <EquipmentLink category="swords" imgSrc="/assets/imgs/swords/magic_sword.gif" />
            <EquipmentLink category="clubs" imgSrc="/assets/imgs/clubs/thunder_hammer.gif" />
            <EquipmentLink category="axes" imgSrc="/assets/imgs/axes/stonecutter_axe.gif" />
            <EquipmentLink category="distance" imgSrc="/assets/imgs/distance/crossbow.gif" />
            <EquipmentLink category="amulets" imgSrc="/assets/imgs/amulets/amulet_of_loss.gif" />
            <EquipmentLink category="shields" imgSrc="/assets/imgs/shields/blessed_shield.gif" />
            <EquipmentLink category="rings" imgSrc="/assets/imgs/rings/gold_ring.gif" />
            <EquipmentLink category="helmets" imgSrc="/assets/imgs/helmets/golden_helmet.gif" />
            <EquipmentLink category="armors" imgSrc="/assets/imgs/armors/magic_plate_armor.gif" />
            <EquipmentLink category="legs" imgSrc="/assets/imgs/legs/demon_legs.gif" />
            <EquipmentLink category="boots" imgSrc="/assets/imgs/boots/boots_of_haste.gif" />
        </div>
    )
}

export default EquipmentsLinks