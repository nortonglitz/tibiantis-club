"use server"

import { prisma } from "@/app/libs/dbClient"
import { LoginSchema, loginSchema } from "@/schemas"
import { signIn } from "@/auth"

type ErrorCauses = "EmailValidationError" | "EmailSignInError"

type EmailSignInReturn = {
    error?: {
        cause: ErrorCauses,
        message: string
    },
    success?: {
        message: string
    }
}

export const emailSignIn = async (values: LoginSchema): Promise<EmailSignInReturn> => {
    try {

        const validatedFields = await loginSchema.safeParseAsync(values)

        if (!validatedFields.success) {
            return {
                error: {
                    cause: "EmailValidationError",
                    message: "Invalid email"
                }
            }

        }

        const { email } = validatedFields.data

        await signIn("email", { email: email })

        return {
            success: {
                message: "Confirmation email sent."
            }
        }

    } catch (error: any) {
        return {
            error: {
                cause: "EmailSignInError",
                message: "Email already in use"
            }
        }
    }
}