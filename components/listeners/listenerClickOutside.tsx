"use client"

import { useRef, useEffect } from "react"

interface ListenerClickOutsideProps {
    children: React.ReactNode
    onClickOutside: () => void
    className?: string
}

const ListenerClickOutside: React.FC<ListenerClickOutsideProps> = ({ children, onClickOutside, className }) => {

    const wrapperRef = useRef<HTMLDivElement>(null)
    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                onClickOutside()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [wrapperRef, onClickOutside])

    return (
        <div ref={wrapperRef} className={className}>
            {children}
        </div>
    )
}

export default ListenerClickOutside