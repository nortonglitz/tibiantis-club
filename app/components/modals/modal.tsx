import { LuX } from "react-icons/lu"

interface ModalProps {
    children: React.ReactNode
    title: string
    subtitle?: string
    onClose: () => void
    open: boolean
}

const Modal: React.FC<ModalProps> = ({
    children,
    title,
    subtitle,
    onClose,
    open
}) => {
    return (
        <>
            <div
                className={`
                    fixed
                    h-full
                    w-full
                    z-[149]
                    bg-stone-950/80
                    ${open ? 'block' : 'hidden'}
                `}
            />
            <div
                className={`
                    fixed
                    flex
                    items-center
                    justify-center
                    h-full
                    w-full
                    z-[150]
                    transition-all
                    ${open ? '' : 'translate-y-full'}
                    ${open ? 'visible' : 'invisible'}
                `}
            >
                <div
                    className="
                        bg-stone-800
                        rounded-3xl
                        p-4
                        shadow-md
                        border
                        border-stone-600
                    "
                >
                    <div className="flex justify-between items-center">
                        <h1 className="font-yatra-one text-2xl text-yellow-200">{title}</h1>
                        <button onClick={onClose}>
                            <LuX
                                className="
                                    rounded-full
                                    cursor-pointer
                                    text-stone-700 
                                    hover:text-stone-600 
                                    active:text-stone-500
                                    text-2xl
                                "
                            />
                        </button>
                    </div>
                    <h6 className="mb-4">{subtitle}</h6>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal