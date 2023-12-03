"use client"

import useRegisterStore from "@/app/stores/useRegisterStore"
import useLoginStore from "@/app/stores/useLoginStore"
import Modal from '../modal'
import InputText from '@/app/components/inputs/inputText'
import { MouseEventHandler } from "react"
import Button from '../../buttons/button'
import SocialMediaButton from "../login/socialMediaButton"
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from "react-icons/fa6"

const ModalRegister: React.FC = () => {

    const { isOpen, setIsOpen } = useRegisterStore()
    const { setIsOpen: setLoginIsOpen } = useLoginStore()

    const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <Modal title="Register" subtitle="Join our club!" open={isOpen} onClose={() => setIsOpen(false)}>
            <form className="flex flex-col gap-2 mt-2">
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
            </form>
            <div className="flex my-4 items-center text-xs">
                <div className="flex-grow border-t border-stone-600/40"></div>
                <span className="flex-shrink mx-4 text-stone-600">OR</span>
                <div className="flex-grow border-t border-stone-600/40"></div>
            </div>
            <div className="flex gap-2 flex-col">
                <SocialMediaButton
                    onClick={() => setIsOpen(false)}
                    title="Sign up with Google"
                    icon={<FcGoogle />}
                />
                <SocialMediaButton
                    onClick={() => setIsOpen(false)}
                    title="Sign up with Facebook"
                    icon={<FaFacebookF className="text-[#4267B2]" />}
                />
            </div>
        </Modal>
    )
}

export default ModalRegister