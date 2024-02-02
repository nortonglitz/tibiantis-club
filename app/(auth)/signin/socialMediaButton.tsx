import { DetailedHTMLProps, ButtonHTMLAttributes } from "react"

interface SocialMediaButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: React.ReactNode
    title: string
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
    icon,
    title,
    className,
    ...props
}) => {
    return (
        <button
            className={`
                px-1
                transition
                grid
                grid-cols-5
                w-full
                border
                rounded-full
                divide-x-[1px]
                border-stone-700
                divide-stone-700
                [&>div]:transition-all
                
                hover:border-stone-600
                hover:divide-stone-600

                active:divide-stone-500
                active:border-stone-500
                active:bg-stone-900/40

                disabled:opacity-50
                disabled:cursor-not-allowed

                group
                ${className}
            `}
            {...props}
        >
            <div className="col-span-1 text-2xl m-auto" >
                {icon}
            </div>
            <div
                className="
                    col-span-4 
                    py-2
                    px-2
                    text-stone-500 
                    group-hover:text-yellow-200
                    group-active:text-yellow-300
                "
            >
                {title}
            </div>
        </button>
    )
}

export default SocialMediaButton