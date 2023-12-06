"use client"

import Link from "next/link"

interface CategoryProps {
    title: string
    src: string
    href: string
    className?: string
    onClick: () => void
}

const Category: React.FC<CategoryProps> = ({
    title,
    src,
    href,
    onClick
}) => {
    return (
        <Link href={href} onClick={onClick}>
            <div
                className="
                    flex 
                    items-center 
                    cursor-pointer 
                    group 
                    select-none
                    hover:bg-stone-800/70
                    active:shadow-sm
                    active:shadow-stone-950
                    rounded-full
                "
            >
                <div
                    className={`
                        p-2
                        bg-gradient-radial
                        rounded-full
                        from-stone-500
                        via-transparent
                    `}
                >
                    <img src={src} alt={title} height={32} width={32} />
                </div>
                <span
                    className="
                        capitalize 
                        font-yatra-one 
                        text-xl 
                        group-hover:text-yellow-200 
                        group-active:text-yellow-300
                    "
                >
                    {title}
                </span>
            </div>
        </Link>
    )
}

export default Category