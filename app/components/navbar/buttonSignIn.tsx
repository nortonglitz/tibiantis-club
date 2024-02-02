"use client"

import Button from '@/app/components/buttons/button'
import useLoginStore from "@/app/stores/useLoginStore"
import Link from "next/link"

const ButtonSignIn = () => {

    const { setIsOpen } = useLoginStore()

    return (
        <Button>
            <Link href="/signin">
                Join us!
            </Link>
        </Button>
    )
}

export default ButtonSignIn