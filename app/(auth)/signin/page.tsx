import { SignInForm } from "./signInForm"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login - Tibiantis Club',
}

const SignInPage = () => {
    return (
        <SignInForm />
    )
}

export default SignInPage