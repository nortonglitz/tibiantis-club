"use client"

import { useState } from "react"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

interface InputTextProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type?: "password" | "text",
    classNameInput?: string
}

const InputText: React.FC<InputTextProps> = ({
    type = "text",
    className,
    classNameInput,
    ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={`relative ${className}`}>
            <input
                type={type === 'text' ? 'text' : showPassword ? 'text' : 'password'}
                className={`
                    w-full
                    py-1
                    px-4
                    rounded-full
                    focus:outline-none
                    bg-stone-900
                    ring-[1px]
                    transition
                    ring-stone-700
                    focus:ring-stone-400
                    placeholder:text-stone-600
                    ${classNameInput}
                `}
                {...props}
            />
            {type === 'password' &&
                <div
                    className="
                        absolute 
                        top-0 
                        right-0 
                        text-xl
                        h-full 
                        flex 
                        items-center 
                        cursor-pointer
                    "
                >
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="
                            transition-all
                            p-[0.35rem]
                            mr-1
                            rounded-full
                            text-stone-600
                            hover:text-stone-500
                            active:bg-stone-800
                            select-none
                        "
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
            }
        </div>
    )
}

export default InputText