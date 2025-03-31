import { Link } from "react-router"
import { MdAddShoppingCart } from "react-icons/md";
import { useCakeContext } from "../contexts/CakeContext";
import toast from 'react-hot-toast';
import { useState } from "react";


function ProductCard( {product} ) {

    const { id, name, price, description, imageUrl } = product;
    const { addToCart } = useCakeContext();

    const [amt, setAmt] = useState(1);

    const onAmtChange = async (e) => {
        setAmt(e.target.value);
    }

    const addCakeToCart = async (e) => {
        for (let i = 0; i < amt; i++) {
            addToCart(product)
        }
        setAmt(1)
        toast.success(
            <span>
             {product.name} added to cart
            </span>, 
            {
            id: 'success'
        });
    }
    

    return (
            <div className="border border-pink-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white m-5">
                <div className="relative">
                <Link to={`/product/${product.id}`}>
                    <img src={`/Images/Cake-${id}.jpg`} alt={name} width={200} height={150}
                        className="w-full h-48 object-cover rounded-md mb-4 min-w-[200px] min-h-[150px] max-w-[200px] max-h-[150px]"
                    />
                </Link>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-rose-800">{name}</p>
                        <p className="font-bold text-rose-900">${price}</p>
                    </div>
                    <div className="flex justify-between mt-5">
                        <input 
                            id="inputAmt"
                            type="number" 
                            value={amt} 
                            min={0} 
                            onChange={onAmtChange}
                            className="bg-white w-20 py-1 text-center pl-4 border rounded focus:outline-none focus:border-rose-400"
                        />
                        <button className="px-3 text-lg
                        py-1 rounded hover:text-white hover:bg-rose-700 transition-colors"
                        onClick={addCakeToCart}>
                            <MdAddShoppingCart />
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default ProductCard;