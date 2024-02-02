"use client"

import Button from "@/app/components/buttons/button"
import InputText from "@/app/components/inputs/inputText"
import SocialMediaButton from "./socialMediaButton"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { loginSchema, LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { emailSignIn } from "@/actions/signIn"
import { MdMarkEmailRead } from "react-icons/md"

const EmailSent = () => {
    return (
        <div
            className="
                absolute
                left-0
                w-[100vw]

                md:left-[50vw]
                md:w-[50vw]

                h-[100vh]
                top-0
                pt-14
                flex
                flex-col
                justify-center
                items-center
                gap-8
            "
        >
            <MdMarkEmailRead className="text-[6rem] text-yellow-200" />
            <div className="flex flex-col justify-around gap-4 px-8 text-justify">
                <h1 className="font-yatra-one text-3xl text-center">Check your inbox</h1>
                <p>We just sent you a sign in link to confirm your email.</p>
            </div>
        </div>
    )
}

export const SignInForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const { handleSubmit, register, formState: { errors }, setError } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (values: LoginSchema) => {

        setIsLoading(() => true)

        const { error } = await emailSignIn(values)
        if (error) {

            if (error.cause === "EmailValidationError") {
                setError("email", { message: error.message })
            }


            if (error.cause === "EmailSignInError") {
                //TODO: Create toaster to display message
            }
        }
        setIsLoading(false)
        setEmailSent(true)
    }

    if (emailSent) {
        return <EmailSent />
    }

    return (
        <div
            className="
                absolute
                left-0
                w-[100vw]

                md:left-[50vw]
                md:w-[50vw]

                h-[100vh]
                top-0
                pt-14
                flex
                justify-center
                items-center
            "
        >
            <div className="flex flex-col justify-around gap-4">
                <h1 className="font-yatra-one text-3xl text-center">Welcome to the <span className="text-yellow-200">Club</span></h1>
                <div className="w-[90vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] m-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="flex flex-col gap-5 mt-2" disabled={isLoading}>
                            <InputText
                                className="w-full"
                                type="email"
                                errorMsg={errors.email?.message}
                                placeholder="E-mail"
                                {...register("email")}
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
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
                            title="Sign in with Google"
                            icon={<FcGoogle />}
                            onClick={() => {
                                setIsLoading(true)
                                signIn("google", { callbackUrl: "/" })
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}