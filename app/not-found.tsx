"use client"

import Link from "next/link"

export default function ErrorPage() {
    return (
        <main className="pt-10 flex justify-center px-4">
            <div className="flex flex-col items-center">
                <div className="flex gap-5 items-center">
                    <img src="/assets/coffin.gif" alt="not found error" />
                    <p className="font-yatra-one text-3xl">This page does not exists</p>
                </div>
                <div>
                    <p className="text-lg italic mt-5">Are you looking for this page for too long?</p>
                    <p className="text-lg italic">Look at them, they were lost too...</p>
                    <p className="text-lg italic">The more you wait, more they decay...</p>
                    <div className="flex justify-around mt-5">
                        <img src="/assets/not_found_body_male.gif" alt="dead man" />
                        <img src="/assets/not_found_body_female.gif" alt="dead woman" />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Link
                            href="/"
                            replace
                            className="
                                transition
                                border
                                border-red-600/20
                                bg-red-600/10
                                hover:bg-red-600/30
                                active:bg-red-600/40
                                py-2 
                                px-3 
                                rounded-full
                            "
                        >
                            <div className="flex items-center gap-2">
                                <img className="animate-bounce" src="/assets/imgs/signs/west.gif" alt="sign" />
                                Get out!
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}