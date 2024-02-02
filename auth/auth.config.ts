import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { sendVerificationRequest } from "@/mail"

const prisma = new PrismaClient()

export const {
    handlers: { GET, POST },
    signIn
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        EmailProvider({
            from: process.env.EMAIL_FROM,
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            },
            sendVerificationRequest
        })
    ],
    pages: {
        signIn: '/signin',
        verifyRequest: '/signin',
        signOut: '/'
    }
})