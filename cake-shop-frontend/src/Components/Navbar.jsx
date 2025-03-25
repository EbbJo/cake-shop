import { Link } from "react-router";

function Navbar() {

    return(
        <nav>
            <div className="flex justify-between p-5 bg-amber-100 text-yellow-900 font-navbar font-bold">
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

export default Navbar