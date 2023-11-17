"use client"

interface ButtonProps {
    children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    children
}) => {
    return (
        <button
            className="
                bg-stone-900
                py-2
                px-4
                rounded-full
                hover:bg-indigo-800
                transition
                active:shadow-md
                active:shadow-stone-950
            "
        >
            {children}
        </button>
    )
}

export default Button