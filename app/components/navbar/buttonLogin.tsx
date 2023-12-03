"use client"

import Button from '@/app/components/buttons/button'
import useLoginStore from "@/app/stores/useLoginStore"

const ButtonLogin = () => {

    const { setIsOpen } = useLoginStore()

    return (
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
            Login
        </Button>
    )
}

export default ButtonLogin