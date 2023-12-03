import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: React.ReactNode
    className?: string
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <button
            className={`
                transition
                hover:outline
                hover:outline-stone-700/40
                active:bg-stone-700/40
                p-2
                rounded-full
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}

export default ButtonIcon