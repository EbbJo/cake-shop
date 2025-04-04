import { Link } from "react-router-dom" // Fixed import from react-router to react-router-dom
import { useCakeContext } from "../contexts/CakeContext";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";

function ProductSummaryCard({ product, amt }) {
    const { id, name, price, description, imageUrl } = product;
    const { removeFromCart, addToCart, SubtractFromGroup } = useCakeContext();

    const handleDelete = async () => {
        removeFromCart(id);
    }

    const handleIncrement = async () => {
        SubtractFromGroup(product)
    }

    const handleDecrement = async () => {
        addToCart(product)
    }

    return (
        <tr className="border-b border-b-pink-200">
            <td className="w-[400px] py-4">
                <div className="flex items-center">
                    <Link to={`/product/${product.id}`} className="shrink-0">
                        <img src={`/Images/Cake-${id}.jpg`} alt={name}
                            className="w-[125px] h-[125px] object-cover rounded-md m-4"
                        />
                    </Link>
                    <div className="flex-1 pr-4">
                        <div className="font-bold text-rose-800 truncate">
                            {name}
                        </div>
                        <div className="text-sm line-clamp-2">
                            {description}
                        </div>
                    </div>
                </div>
            </td>
            <td className="w-[150px] text-center">
                <div className="font-bold text-rose-900">
                    ${price}
                </div>
            </td>
            <td className="w-[150px] text-rose-900">
                <div className="flex justify-center">
                    <button className="p-1 text-md">
                        <FaMinus />
                    </button>
                    <div className="font-bold">
                        {amt}
                    </div>
                    <button className="p-1 text-md">
                        <FaPlus />
                    </button>
                </div>
            </td>
            <td className="w-[150px] text-center text-rose-900">
                <div className="font-bold">
                    ${(price * amt).toFixed(2)}
                </div>
            </td>
            <td className="text-center">
                <button onClick={handleDelete} className="mr-15 text-2xl mt-2 transition-all hover:scale-110 hover:cursor-pointer">
                    <CiCircleRemove />
                </button>
            </td>
        </tr>
    );
}

export default ProductSummaryCard;