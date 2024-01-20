import { LuX } from "react-icons/lu"
import CircleSpinner from "@/app/components/spinners/circleSpinner"

interface ModalProps {
    children: React.ReactNode
    title: string
    subtitle?: string
    onClose: () => void
    open: boolean
    loading?: boolean
}

const Modal: React.FC<ModalProps> = ({
    children,
    title,
    subtitle,
    onClose,
    loading = false,
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
                        w-[80vw]
                        sm:w-fit
                        sm:min-w-[20vw]
                        bg-stone-800
                        rounded-3xl
                        p-4
                        shadow-md
                        border
                        border-stone-600
                        relative
                    "
                >
                    {loading &&
                        <div
                            className="
                                rounded-3xl
                                absolute
                                left-0
                                top-0
                                flex
                                items-center
                                justify-center
                                w-full
                                h-full
                                bg-stone-950/30
                                z-[200]
                            "
                        >
                            <CircleSpinner size="xl" />
                        </div>
                    }
                    <div className="flex justify-between items-center">
                        <h1 className="font-yatra-one text-2xl text-yellow-200">{title}</h1>
                        <button onClick={onClose} disabled={loading}>
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