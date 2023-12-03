import Link from "next/link"

interface LinkButtonProps {
    children?: React.ReactNode
    href: string
    variant?: 'outlined' | 'standard'
}

const LinkButton: React.FC<LinkButtonProps> = ({
    children,
    variant = "standard",
    href
}) => {

    const isOutlined = 'outlined' === variant
    const isStandard = 'standard' === variant

    return (
        <Link
            href={href}
            className={`
                py-2
                px-4
                rounded-full
                active:shadow-md
                active:shadow-stone-950 
                active:border-stone-600/40
                ${isStandard &&
                `
                    hover:bg-stone-600
                    bg-stone-700
                `}
                ${isOutlined &&
                `
                    border-[1px]
                    border-stone-700
                    hover:bg-stone-700/40
                `}
            `}
        >
            {children}
        </Link>
    )
}

export default LinkButton