import Link from 'next/link'

const items = [
    'helmets',
    'armors',
    'legs',
    'boots',
    'shields',
    'swords',
    'axes',
    'clubs',
    'distance',
    'ammunition',
    'food',
    'wands',
    'tools',
    'rings',
    'amulets'
]

const Categories = () => {
    return (
        <div className="group relative">
            <span className="cursor-pointer">
                Items
            </span>
            <menu className={`
                    bg-stone-900/95
                    absolute
                    invisible
                    group-hover:visible
                    flex
                    flex-col
                    shadow-md
                    border
                    rounded-xl
                    space-y-2
                    border-stone-600
                    p-2
                `}
            >
                {items.map((item, i) => (
                    <Link key={i} href={`/items/${item}`} className="hover:scale-105 transition capitalize">
                        {item}
                    </Link>
                ))}
            </menu>
        </div>
    )
}

export default Categories