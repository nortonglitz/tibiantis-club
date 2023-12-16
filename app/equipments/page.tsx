import type { Metadata } from 'next'
import LinkCategory from './linkCategory'

export const metadata: Metadata = {
    title: 'Equipments - Tibiantis Club',
}

export default function EquipmentsPage() {

    return (
        <main
            className="
                flex
                flex-col
                align-center
                py-2
                flex-wrap
                gap-2
                sm:gap-4
            "
        >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-5">
                <LinkCategory
                    href="/equipments/swords"
                    title="swords"
                    imgSrc="/assets/imgs/swords/foil.gif"
                    desc="The best option for those that don&apos;t want to spend much but still wanna deal some damage."
                />
                <LinkCategory
                    href="/equipments/clubs"
                    className=""
                    title="clubs"
                    imgSrc="/assets/imgs/clubs/hammer_of_wrath.gif"
                    desc="The cheapest weapon to get, you will probably use if you are a mage or low budget knight."
                />
                <LinkCategory
                    href="/equipments/axes"
                    title="axes"
                    imgSrc="/assets/imgs/axes/dragon_lance.gif"
                    desc="This is the most expensive weapon, it will take a while until you be strong."
                />
                <LinkCategory
                    href="/equipments/distance"
                    title="distance"
                    imgSrc="/assets/imgs/distance/crossbow.gif"
                    desc="This is the most expensive weapon, it will take a while until you be strong."
                />
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <LinkCategory
                    href="/equipments/amulets"
                    title="amulets"
                    imgSrc="/assets/imgs/amulets/amulet_of_loss.gif"
                    desc="Mainly used to protect item lost, but you can choose also between armor or special effects."
                />
                <LinkCategory
                    href="/equipments/shields"
                    title="shields"
                    imgSrc="/assets/imgs/shields/griffin_shield.gif"
                    desc="You can block up to two monsters with them."
                />
                <LinkCategory
                    href="/equipments/rings"
                    title="rings"
                    imgSrc="/assets/imgs/rings/ring_of_the_sky.gif"
                    desc="Can improve your skills, fast healing and a lot of special effects."
                />
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <LinkCategory
                    href="/equipments/helmets"
                    title="helmets"
                    imgSrc="/assets/imgs/helmets/amazon_helmet.gif"
                    desc="Improves your armor, lighters are better for mages and paladins."
                />
                <LinkCategory
                    href="/equipments/armors"
                    title="armors"
                    imgSrc="/assets/imgs/armors/dwarven_armor.gif"
                    desc="Improves your armor, lighters are better for mages and paladins."
                />
                <LinkCategory
                    href="/equipments/legs"
                    title="legs"
                    imgSrc="/assets/imgs/legs/demon_legs.gif"
                    desc="Improves your armor, lighters are better for mages and paladins."
                />
                <LinkCategory
                    href="/equipments/boots"
                    title="boots"
                    imgSrc="/assets/imgs/boots/patched_boots.gif"
                    desc="Makes you faster or improve your armor, is up to you."
                />
            </div>
        </main>
    )
}