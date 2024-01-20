"use client"

import Link from "next/link"
import { useState } from "react"
import ListenerClickOutside from "../listeners/listenerClickOutside"
import CircleSpinner from "@/app/components/spinners/circleSpinner"
import { signOut } from "next-auth/react"

interface ButtonUserProps {
    imageSrc: string
}

const ButtonUser: React.FC<ButtonUserProps> = ({ imageSrc }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="relative">
            <button
                className="
                    rounded-full
                    p-1
                    active:bg-stone-600/30
                    hover:outline-stone-600/30
                    hover:outline
                    cursor-pointer
                "
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={imageSrc} alt="profile image"
                    className="rounded-full h-[30px] border-2 border-yellow-500"
                />
            </button>
            <ListenerClickOutside
                onClickOutside={() => setIsOpen(false)}
            >
                <div
                    className={`
                        ${isOpen ? 'block' : 'hidden'}
                        gap-2
                        flex
                        flex-col
                        mt-1
                        rounded-xl
                        bg-stone-800
                        right-0
                        absolute
                        p-4
                        shadow-sm
                        shadow-stone-950
                        [&>*]:font-yatra-one
                        [&>*]:text-xl
                        [&>*]:capitalize
                        [&>*]:whitespace-nowrap
                        [&>*]:text-right
                    `}
                >
                    {isLoading &&
                        <div
                            className="
                                absolute 
                                w-full 
                                h-full 
                                bg-stone-950/30 
                                rounded-xl 
                                top-0 
                                left-0
                                flex
                                justify-center
                                items-center
                            "
                        >
                            <CircleSpinner size="md" />
                        </div>
                    }
                    <Link
                        href="#"
                        onClick={() => setIsOpen(false)}
                        className="
                            hover:text-yellow-200
                            active:text-yellow-300
                        "
                    >
                        Settings
                    </Link>
                    <button
                        disabled={isLoading}
                        onClick={() => {
                            setIsLoading(true)
                            signOut()
                        }}
                        className="
                            text-red-400
                            hover:text-red-500
                            active:text-red-600
                        "
                    >
                        Logout
                    </button>
                </div>
            </ListenerClickOutside>
        </div>
    )
}

export default ButtonUser