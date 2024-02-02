"use client"

import { forwardRef } from "react"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { BsXCircleFill } from "react-icons/bs"

interface InputTextProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    errorMsg?: string
    wrapperClassName?: string
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>((
    {
        className,
        wrapperClassName,
        required,
        errorMsg,
        ...props
    },
    ref
) => {
    const error = Boolean(errorMsg)
    return (
        <div
            className={`
                [&>p]:mt-1
                [&>p]:mx-4
                [&>p]:text-sm
                [&>p]:text-red-500
                ${wrapperClassName}
            `}
        >
            <input
                ref={ref}
                className={`
                    py-2
                    px-4
                    rounded-full
                    bg-stone-900
                    ring-[1px]
                    transition
                    ${error ? "ring-red-500" : "ring-stone-700"}
                    
                    focus:outline-none
                    ${error ? "focus:ring-red-600" : "focus:ring-stone-400"}
                    

                    placeholder:text-stone-600
                    
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    
                    ${className}
                `}
                {...props}
            />
            {error && <p>{errorMsg}</p>}
        </div>
    )
})

InputText.displayName = "InputText"

export default InputText