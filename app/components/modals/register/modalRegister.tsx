"use client"

import useRegisterStore from "@/app/stores/useRegisterStore"
import useLoginStore from "@/app/stores/useLoginStore"
import Modal from '../modal'
import InputText from '@/app/components/inputs/inputText'
import { MouseEventHandler, useState } from "react"
import Button from '../../buttons/button'
import SocialMediaButton from "../login/socialMediaButton"
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

const ModalRegister: React.FC = () => {

    const { isOpen, setIsOpen } = useRegisterStore()
    const { setIsOpen: setLoginIsOpen } = useLoginStore()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <Modal title="Register" subtitle="Join our club!" open={isOpen} onClose={() => setIsOpen(false)} loading={isLoading}>
            <form>
                <fieldset className="flex flex-col gap-2 mt-2" disabled={isLoading}>
                    <InputText placeholder="E-mail" />
                    <InputText type="password" placeholder="Password" />
                    <InputText type="password" placeholder="Confirm Password" />
                    <div className="flex justify-end">
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setLoginIsOpen(true)
                                setIsOpen(false)
                            }}
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
                            Already have an account?
                        </button>
                    </div>
                    <Button type="submit" onClick={onSubmit}>Sign Up</Button>
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
                    title="Sign up with Google"
                    icon={<FcGoogle />}
                />
            </div>
        </Modal>
    )
}

export default ModalRegister