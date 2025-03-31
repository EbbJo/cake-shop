import { Link } from "react-router";
import { useCakeContext } from "../contexts/CakeContext";
import { MdOutlineShoppingCart } from "react-icons/md";

function Navbar() {

    const { cart } = useCakeContext();

    function TotalPrice() {
        let total = 0;
        for (let cake of cart) {
            total += cake.price;
        }
        return Math.round(total * 100) / 100;
    }

    return(
        <nav>
            <div className="flex justify-between p-5 bg-pink-200 text-rose-800 font-navbar font-bold">
                <div className="flex items-center">
                    <div className="ml-4 mb-3">
                        <Link><img src="/PngItem_85478.png" width="30" height="25"/></Link>
                    </div>  
                    <div className="ml-5 text-xl hover:text-rose-950 transition-colors">
                        <Link to="/">Cake Shop</Link>
                    </div>
                    <div className="flex mt-1 text-sm">
                        <div className="ml-8 hover:text-rose-950 transition-colors">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="ml-8 hover:text-rose-950 transition-colors">
                            <Link to="/about">About us</Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-lg  ">
                    <div className="mr-5">
                        <Link to="/cart">
                         <button className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-rose-950 font-medium leading-none hover:text-white
                         transition duration-100 ease-in-out">
                            <div className="pr-1 text-base">
                                <MdOutlineShoppingCart />
                            </div>
                            <div className="text-sm">
                                ${TotalPrice()}
                            </div>
                            <div>

                            </div>
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar