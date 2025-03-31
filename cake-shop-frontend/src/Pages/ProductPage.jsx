//Page for a specific Product. Not for all products.
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCakeByID } from "../services/api.js";
import { Link } from "react-router";
import { useCakeContext } from "../contexts/CakeContext";
import { MdAddShoppingCart } from "react-icons/md";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import toast from 'react-hot-toast';

function ProductPage() {

    const { id } = useParams();

    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getCakeByID(id)
                setProduct(data)
            } catch (err) {
                console.error("Error fetching Product!")
            }
        }

        fetchProduct();
    }, [id])

    if (product == null) {
        return <div>
            Product does not exist!
        </div>
    }

    const { addToCart } = useCakeContext();

    const addCakeToCart = async (e) => {
        addToCart(product)
        toast.success(
            <span>
                {product.name} added to cart
            </span>,
            {
                id: 'success'
            });
    }

    return (
        <div>
            <div class="flex text-rose-700 italic my-2 ml-6">
                <Link to="/" className="flex justify-center items-center">
                    <div>
                        <MdNavigateBefore />
                    </div>
                    <p className="mb-0.5">
                        back
                    </p>
                </Link>
            </div>
            <div class="md:flex md:flex-row mt-8">
                <div class="flex-1">
                    <img src={`/Images/Cake-${id}.jpg`} className="size-[500px] mx-auto rounded-lg object-cover border-2 border-rose-200 border-solid shadow-md mb-10"></img>
                </div>
                <div className="flex-1 ml-2">
                    <div class="text-rose-800 text-3xl my-3">
                        {product.name}
                    </div>
                    <div class="text-xl my-2">
                        ${product.price}
                    </div>
                    <div>
                        <button className="px-3 text-lg
                                                py-1 rounded hover:text-white hover:bg-rose-700 transition-colors"
                            onClick={addCakeToCart}>
                            <MdAddShoppingCart />
                        </button>
                    </div>
                    <div class="text-lg">
                        {product.description}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ProductPage;