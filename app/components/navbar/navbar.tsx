import ButtonLink from '../buttonLink'
import Categories from './categories'

const Navbar = () => {

    return (
        <nav className="
            fixed
            w-full
            shadow-md
        ">
            <div className="
                flex
                bg-stone-900
                py-4
                justify-between
                lg:px-10
                "
            >
                Logo
                <Categories />
                <div className="space-x-2">
                    <ButtonLink href="#">
                        Register
                    </ButtonLink>
                    <ButtonLink variant="outlined" href="#">
                        Login
                    </ButtonLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar