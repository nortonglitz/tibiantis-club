"use client"

import Modal from '../modal'
import InputText from '@/app/components/inputs/inputText'
import useLoginStore from "@/app/stores/useLoginStore"
import Button from '../../buttons/button'
import { MouseEventHandler } from "react"
import SocialMediaButton from "./socialMediaButton"
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from "react-icons/fa6"
import useRegisterStore from "@/app/stores/useRegisterStore"

const ModalLogin = () => {

    const { isOpen, setIsOpen } = useLoginStore()
    const { setIsOpen: setRegisterIsOpen } = useRegisterStore()

    const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <Modal
            open={isOpen}
            title="Login"
            subtitle="Welcome to the club!"
            onClose={() => setIsOpen(false)}
        >
            <form className="flex flex-col gap-2 mt-2">
                <InputText placeholder="E-mail" />
                <InputText placeholder="Password" type="password" />
                <div className="flex justify-end">
                    <button
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
                <Button type="submit" onClick={onSubmit}>Sign In</Button>
            </form>
            <div className="flex my-4 items-center text-xs">
                <div className="flex-grow border-t border-stone-600/40"></div>
                <span className="flex-shrink mx-4 text-stone-600">OR</span>
                <div className="flex-grow border-t border-stone-600/40"></div>
            </div>
            <div className="flex gap-2 flex-col">
                <SocialMediaButton
                    onClick={() => setIsOpen(false)}
                    title="Sign in with Google"
                    icon={<FcGoogle />}
                />
                <SocialMediaButton
                    onClick={() => setIsOpen(false)}
                    title="Sign in with Facebook"
                    icon={<FaFacebookF className="text-[#4267B2]" />}
                />
                <SocialMediaButton
                    onClick={() => {
                        setRegisterIsOpen(true)
                        setIsOpen(false)
                    }}
                    title="Sign up with custom E-mail"
                    icon={<>@</>}
                />
            </div>
        </Modal>
    )
}

export default ModalLogin