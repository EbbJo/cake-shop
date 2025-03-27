import { Link } from "react-router"

function ProductCard( {product} ) {

    const { id, name, price, description, imageUrl } = product;
    

    return (
            <div className="border border-pink-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white m-5">
                <div className="relative">
                <Link to={`/product/${product.id}`}>
                    <img src={"https://placehold.co/200x150"} alt={name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                </Link>
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-rose-800">{name}</p>
                        <p className="font-bold text-rose-900">${price}</p>
                    </div>
                    <div className="flex justify-between mt-5">
                        <input 
                            type="number" 
                            defaultValue={1} 
                            min={0} 
                            className="bg-white w-20 py-1 text-center pl-4 border rounded focus:outline-none focus:border-rose-400"
                        />
                        <button className="bg-rose-600 text-white px-3
                        py-1 rounded hover:bg-rose-700 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default ProductCard;