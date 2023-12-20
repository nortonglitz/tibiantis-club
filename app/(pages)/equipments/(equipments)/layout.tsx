import EquipmentsLinks from "./equipmentsLinks"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div
            className="
                flex
                justify-center
                items-center
                py-4
                sm:p-8
            "
        >
            <EquipmentsLinks />
            {children}
        </div>
    )
}