import type { Metadata } from 'next'
import { Sora, Yatra_One } from 'next/font/google'
import Navbar from '@/app/components/navbar/navbar'
import './globals.css'
import ModalLogin from "./components/modals/login/modalLogin"
import ModalRegister from "./components/modals/register/modalRegister"

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const yatraOne = Yatra_One({ subsets: ['latin'], weight: '400', variable: '--font-yatra-one' })

export const metadata: Metadata = {
  title: 'Tibiantis Club',
  description: 'Place to get into Tibiantis game and find useful informations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${sora.className}
          ${sora.variable}
          ${yatraOne.variable}
          bg-stone-900
          text-white
        `}
      >
        <Navbar />
        <ModalLogin />
        <ModalRegister />
        <div className="p-7" />
        {children}
      </body>
    </html >
  )
}
