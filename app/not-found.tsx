"use client"

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
                </div>
            </div>
        </main>
    )
}