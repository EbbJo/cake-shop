import { Link } from "react-router";

function Footer() {

    return(
        <nav>
            <div className="flex justify-between p-5 bg-linear-to-t
             from-sky-500 to-indigo-500 text-white font-navbar font-bold">
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