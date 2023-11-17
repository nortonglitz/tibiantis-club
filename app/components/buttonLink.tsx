import Link from "next/link"

interface ButtonProps {
    children?: React.ReactNode
    href: string
    variant?: 'outlined' | 'standard'
}

const ButtonLink: React.FC<ButtonProps> = ({
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
                rounded-lg
                active:shadow-md
                active:shadow-stone-950 
                ${isStandard &&
                `
                    hover:bg-stone-600
                    bg-stone-700
                `}
                ${isOutlined &&
                `
                    border-[1px]
                    border-stone-400
                    hover:bg-stone-400/10
                `}
            `}
        >
            {children}
        </Link>
    )
}

export default ButtonLink