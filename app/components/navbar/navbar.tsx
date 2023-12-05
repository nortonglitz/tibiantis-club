import ButtonMenu from './buttonMenu'
import Logo from '../logo'
import Sidebar from "../sidebar/sidebar"
import ButtonLogin from "./buttonLogin"
import ButtonRegister from "./buttonRegister"

const Navbar = () => {

    return (
        <>
            <nav className="
                    z-[100]
                    fixed
                    w-full
                    shadow-md
                "
            >
                <div className="
                        flex
                        bg-stone-900
                        py-2
                        justify-between
                        items-center
                        lg:px-10
                        sm:px-6
                        px-4
                    "
                >
                    <Logo />
                    <div className="flex gap-2 items-center">
                        <ButtonRegister />
                        <ButtonLogin />
                        <ButtonMenu />
                    </div>
                </div>
            </nav>
            <Sidebar />
        </>
    )
}

export default Navbar