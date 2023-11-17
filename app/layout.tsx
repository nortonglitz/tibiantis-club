import type { Metadata } from 'next'
import { Piazzolla } from 'next/font/google'
import Navbar from '@/app/components/navbar/navbar'
import './globals.css'

const piazzola = Piazzolla({ subsets: ['latin'] })

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
        className={
          piazzola.className + `
            bg-stone-900
            text-white
            font-semibold
          `
        }
      >
        <Navbar />
        <div className="p-8" />
        {children}
      </body>
    </html >
  )
}
