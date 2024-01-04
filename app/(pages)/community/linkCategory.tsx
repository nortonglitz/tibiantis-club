import Link, { LinkProps } from 'next/link'

interface LinkCategoryProps extends LinkProps {
    className?: string
    title: string
    desc: string
    imgSrc: string
}

const LinkCategory: React.FC<LinkCategoryProps> = ({ imgSrc, title, desc, className, ...props }) => {
    return (
        <Link
            className={`
                    p-2
                    sm:p-4 
                    border-stone-600/30
                    transition
                    border 
                    rounded-3xl 
                    cursor-pointer 
                    bg-stone-800 
                    w-[12rem]
                    h-[fit]
                    group 
                    select-none
                    active:bg-stone-700/50
                    hover:shadow-md
                    hover:shadow-stone-950
                    ${className}
                `}
            {...props}
        >
            <img src={imgSrc} alt={title} className="m-auto h-12 object-none" />
            <h3 className="mt-2 font-yatra-one text-xl text-center group-hover:text-yellow-200 group-active:text-yellow-300 capitalize">{title}</h3>
            <p className="text-xs text-stone-400 text-justify mt-2 hidden sm:flex">{desc}</p>
        </Link>
    )
}

export default LinkCategory