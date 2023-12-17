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
            className={`
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
            <div className="flex items-center">
                <img src={imgSrc} alt={category} width={32} height={32} />
            </div>
        </Link>
    )
}

const EquipmentsLinks = () => {
    return (
        <div className="hidden sm:flex sm:flex-col absolute top-32 left-20">
            <EquipmentLink category="swords" imgSrc="/assets/imgs/swords/foil.gif" />
            <EquipmentLink category="clubs" imgSrc="/assets/imgs/clubs/hammer_of_wrath.gif" />
            <EquipmentLink category="axes" imgSrc="/assets/imgs/axes/dragon_lance.gif" />
            <EquipmentLink category="distance" imgSrc="/assets/imgs/distance/crossbow.gif" />
            <EquipmentLink category="amulets" imgSrc="/assets/imgs/amulets/amulet_of_loss.gif" />
            <EquipmentLink category="shields" imgSrc="/assets/imgs/shields/griffin_shield.gif" />
            <EquipmentLink category="rings" imgSrc="/assets/imgs/rings/ring_of_the_sky.gif" />
            <EquipmentLink category="helmets" imgSrc="/assets/imgs/helmets/amazon_helmet.gif" />
            <EquipmentLink category="armors" imgSrc="/assets/imgs/armors/dwarven_armor.gif" />
            <EquipmentLink category="legs" imgSrc="/assets/imgs/legs/demon_legs.gif" />
            <EquipmentLink category="boots" imgSrc="/assets/imgs/boots/patched_boots.gif" />
        </div>
    )
}

export default EquipmentsLinks