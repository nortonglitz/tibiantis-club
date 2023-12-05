import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/">
            <span
                className="
                    select-none
                    relative
                    font-yatra-one
                    text-2xl
                    cursor-pointer
                "
            >
                <div className="hidden sm:block">Tibiantis</div>
                <div className="block sm:hidden text-4xl">T</div>
                <span
                    className="
                        text-yellow-200
                        absolute
                        left-[40%]
                        top-[20%]
                        sm:left-[90%]
                        font-bold
                        italic
                        -rotate-12
                    "
                >
                    Club
                </span>
            </span>
        </Link>
    )
}

export default Logo