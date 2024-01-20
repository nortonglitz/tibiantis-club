interface CircleSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl"
}

const CircleSpinner: React.FC<CircleSpinnerProps> = ({
    size = "md"
}) => {
    return (
        <div
            className={`
                border-stone-600/30
                animate-spin
                rounded-full
                border-t-stone-300

                ${size === 'sm' && 'w-5'}
                ${size === 'sm' && 'h-5'}
                ${size === 'sm' && 'border-2'}

                ${size === 'md' && 'w-10'}
                ${size === 'md' && 'h-10'}
                ${size === 'md' && 'border-4'}

                ${size === 'lg' && 'w-16'}
                ${size === 'lg' && 'h-16'}
                ${size === 'lg' && 'border-4'}

                ${size === 'xl' && 'w-32'}
                ${size === 'xl' && 'h-32'}
                ${size === 'xl' && 'border-4'}
            `}
        />
    )
}

export default CircleSpinner