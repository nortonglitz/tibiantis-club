"use client"

import Modal from '../modal'
import InputText from '@/app/components/inputs/inputText'
import useLoginStore from "@/app/stores/useLoginStore"
import Button from '../../buttons/button'
import { MouseEventHandler, useState } from "react"
import SocialMediaButton from "./socialMediaButton"
import { FcGoogle } from 'react-icons/fc'
import useRegisterStore from "@/app/stores/useRegisterStore"
import { signIn } from 'next-auth/react'

const ModalLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, setIsOpen } = useLoginStore()
    const { setIsOpen: setRegisterIsOpen } = useRegisterStore()

    const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <Modal
            open={isOpen}
            loading={isLoading}
            title="Login"
            subtitle="Welcome to the club!"
            onClose={() => setIsOpen(false)}
        >
            <form>
                <fieldset className="flex flex-col gap-2 mt-2" disabled={isLoading}>
                    <InputText placeholder="E-mail" />
                    <InputText placeholder="Password" type="password" />
                    <div className="flex justify-end">
                        <button
                            disabled={isLoading}
                            onClick={() => setIsOpen(false)}
                            className="
                                text-sm
                                md:text-xs 
                                text-right 
                                text-stone-500 
                                hover:text-yellow-200
                                active:text-yellow-300
                                cursor-pointer
                                transition-all
                            "
                        >
                            Forgot password?
                        </button>
                    </div>
                    <Button
                        type="submit"
                        onClick={onSubmit}
                    >
                        Sign In
                    </Button>
                </fieldset>
            </form>
            <div className="flex my-4 items-center text-xs">
                <div className="flex-grow border-t border-stone-600/40"></div>
                <span className="flex-shrink mx-4 text-stone-600">OR</span>
                <div className="flex-grow border-t border-stone-600/40"></div>
            </div>
            <div className="flex gap-2 flex-col">
                <SocialMediaButton
                    disabled={isLoading}
                    onClick={() => {
                        setIsLoading(true)
                        signIn('google')
                    }}
                    title="Sign in with Google"
                    icon={<FcGoogle />}
                />
                <SocialMediaButton
                    disabled={isLoading}
                    onClick={() => {
                        setRegisterIsOpen(true)
                        setIsOpen(false)
                    }}
                    title="Sign up with E-mail"
                    icon="@"
                />
            </div>
        </Modal>
    )
}

export default ModalLogin