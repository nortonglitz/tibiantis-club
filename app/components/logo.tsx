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
                Tibiantis
                <span
                    className="
                        text-yellow-200
                        absolute
                        top-[20%]
                        left-[90%]
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