"use client"

import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: React.ReactNode
    variant?: 'outlined' | 'standard'
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "standard",
    className,
    ...props
}) => {

    const isOutlined = 'outlined' === variant
    const isStandard = 'standard' === variant

    return (
        <button
            className={`
                py-2
                px-4
                rounded-full
                transition-all
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
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button