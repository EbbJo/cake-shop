import { Link } from "react-router-dom" // Fixed import from react-router to react-router-dom
import { useCakeContext } from "../contexts/CakeContext";
import { useState } from "react";

function ProductSummaryCard({ product, amt }) {
    const { id, name, price, description, imageUrl } = product;

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
                        <div className="text-sm text-rose-600 line-clamp-2">
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
            <td className="w-[150px] text-center text-rose-900">
                <div className="font-bold">
                    {amt}5
                </div>
            </td>
            <td className="w-[150px] text-center text-rose-900">
                <div className="font-bold">
                    ${(price * amt).toFixed(2)}
                </div>
            </td>
        </tr>
    );
}

export default ProductSummaryCard;