import Image from 'next/image'

interface MenuCardProps {
    title: string
    src: string
    alt: string
}

const MenuCard: React.FC<MenuCardProps> = ({
    title,
    alt,
    src
}) => {
    return (
        <div
            className="
                transition
                font-bungee-spice
                text-2xl
                border
                p-4
                cursor-pointer
                rounded-3xl
                border-stone-700
                text-center
                active:shadow-md
                active:shadow-stone-950 
                hover:bg-stone-700/40
                active:border-stone-600/40
            "
        >
            {title}
            <Image className="m-auto" src={src} alt={alt} width={48} height={48} />
        </div>
    )
}

export default MenuCard