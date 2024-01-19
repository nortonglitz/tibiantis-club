import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center font-yatra-one text-2xl">
                <img src="/assets/imgs/logos/logo_stroked.png" alt="tibiantis online" className="h-[2.5rem]" />
                <span className="hidden sm:block mt-2 ml-2">
                    Tibiantis
                    <span
                        className="
                        text-[#FFC639]
                        "
                    >
                        Club
                    </span>
                </span>
            </div>
        </Link>
    )
}

export default Logo