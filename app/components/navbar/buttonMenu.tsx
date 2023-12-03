"use client"

import useSidebarStore from "@/app/stores/useSidebarStore"
import IconButton from "../buttons/buttonIcon"

import { LuMenu } from "react-icons/lu"

const ButtonMenu = () => {

    const { isOpen, setIsOpen } = useSidebarStore()

    return (
        <IconButton
            onClick={() => setIsOpen(!isOpen)}
        >
            <LuMenu className="text-2xl" />
        </IconButton>
    )
}

export default ButtonMenu