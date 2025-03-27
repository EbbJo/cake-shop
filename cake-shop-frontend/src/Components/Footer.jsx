import { Link } from "react-router";

function Footer() {

    return(
        <nav className="h-10">
            <div className="flex justify-between p-5 bg-rose-800 text-pink-100 font-navbar font-bold">
                <div>
                    <Link to="/">Cake Shop</Link>
                </div>
                <div className="flex justify-between">
                    <div className="mr-5">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="mr-5">
                        <Link to="/about">About us</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Footer;