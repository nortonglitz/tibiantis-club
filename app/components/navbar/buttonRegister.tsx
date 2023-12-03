"use client"

import Button from '../buttons/button'
import useRegisterStore from "@/app/stores/useRegisterStore"

const ButtonRegister = () => {

    const { setIsOpen } = useRegisterStore()

    return (
        <Button onClick={() => setIsOpen(true)}>
            Register
        </Button>
    )
}

export default ButtonRegister