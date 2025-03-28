import { Link } from "react-router";

function Navbar() {

    return(
        <nav>
            <div className="flex justify-between p-5 bg-pink-200 text-rose-800 font-navbar font-bold">
                <div className="flex items-center">
                    <div className="ml-4 mb-3">
                        <Link><img src="PngItem_85478.png" width="40" height="35"/></Link>
                    </div>  
                    <div className="ml-5 text-3xl hover:text-rose-950 transition-colors">
                        <Link to="/">Cake Shop</Link>
                    </div>
                </div>
                <div className="flex justify-between items-center text-lg  ">
                    <div className="mr-5 hover:text-rose-950 transition-colors">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="mr-5 hover:text-rose-950 transition-colors">
                        <Link to="/about">About us</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar