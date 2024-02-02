export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <div
                className="
                    overflow-hidden
                    absolute
                    top-0
                    hidden
                    md:block
                "
            >
                <img
                    src="/assets/pics/login_background.jpeg"
                    alt="login image"
                    className="
                        object-cover
                        md:w-[50vw]
                        h-[100vh]
                    "
                />
            </div>
            {children}
        </main>
    )
}