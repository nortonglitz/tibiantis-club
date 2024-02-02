"use client"

import ButtonMenu from './buttonMenu'
import Logo from '../logo'

import ButtonSignIn from "./buttonSignIn"
import UserMenu from './userMenu'

import { useSession } from "next-auth/react"

const Navbar = () => {

    const { status, data: session } = useSession()

    return (
        <nav className="
                z-[100]
                fixed
                w-full
                shadow-md
            "
        >
            <div className="
                    flex
                    bg-stone-900
                    py-2
                    justify-between
                    items-center
                    lg:px-10
                    sm:px-6
                    px-4
                "
            >
                <Logo />
                <div className="flex gap-2 items-center">
                    {status === "unauthenticated" &&
                        <ButtonSignIn />
                    }
                    {status === "loading" &&
                        <div className="w-[30px] m-auto bg-stone-500/30 animate-pulse h-[30px] rounded-full" />
                    }
                    {status === "authenticated" && session.user &&
                        <UserMenu
                            imageSrc={session.user.image || "/assets/imgs/icons/user_avatar.gif"}
                        />
                    }
                    <ButtonMenu />
                </div>
            </div>
        </nav>
    )
}

export default Navbar