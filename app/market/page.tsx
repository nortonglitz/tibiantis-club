import type { Metadata } from 'next'
import Image from "next/image"
import LinkText from "@/app/components/links/linkText"

const items = [
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    },
    {
        imgUrl: '/assets/warlord-sword.png',
        name: 'Warlord Sword',
        quantitiy: 1,
        value: '50kk',
        seller: 'Tonnor',
        city: "Ab'dendriel"
    }
]

export const metadata: Metadata = {
    title: 'Market - Tibiantis Club',
}

export default function MarketPage() {
    return (
        <main
            className="
                flex
                justify-center
                p-10
            "
        >
            <div className="px-3 pt-1 bg-stone-800 rounded-3xl border border-stone-200/10">
                <div className="h-[80vh] w-[75vw] overflow-y-auto rounded-xl">
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
                                "
                            >
                                <th scope="col">Item</th>
                                <th scope="col">Value</th>
                                <th scope="col">Seller</th>
                                <th scope="col">City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(({ city, imgUrl, name, quantitiy, seller, value }, i) => (
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
                                        <div className="group relative  m-auto w-fit cursor-help">
                                            <Image src={imgUrl} height={24} width={24} alt={name} />
                                            <div
                                                className="
                                                    flex 
                                                    absolute 
                                                    top-[0]
                                                    left-[100%]
                                                    invisible 
                                                    group-hover:visible 
                                                    bg-stone-900/80
                                                    px-2
                                                    rounded-full
                                                    text-tibia-green
                                                    font-semibold
                                                    z-0
                                                    whitespace-nowrap
                                                "
                                            >
                                                {name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{value}</td>
                                    <td>
                                        <LinkText
                                            className="hover:text-yellow-200 active:text-yellow-400"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            href={`https://tibiantis.online/?page=character&name=${seller}`}
                                        >
                                            {seller}
                                        </LinkText>
                                    </td>
                                    <td>{city}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                                <td className="py-2" colSpan={6}>Anyone can advertise here, watch out before buying.</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </main>
    )
}
