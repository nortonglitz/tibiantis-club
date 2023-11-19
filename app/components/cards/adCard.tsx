import Image from "next/image"

interface AdCardProps {
    children?: React.ReactNode
}

const AdCard: React.FC<AdCardProps> = ({
    children
}) => {
    return (
        <div
            className="
                border
                p-2
                rounded-full
                border-stone-600
                hover:bg-stone-600/5
                cursor-pointer
            "
        >
            <Image
                src="/warlord-sword.png"
                alt="advertised item"
                width={24}
                height={24}
            />
            {children}
        </div>
    )
}

export default AdCard