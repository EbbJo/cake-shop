//Page for a specific Product. Not for all products.

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCakeByID } from "../services/api.js";

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

    return (
        <div class="md:flex md:flex-row mt-10">
            <div class="flex-1">
                <img src={`/Images/Cake-${id}.jpg`} className="size-[500px] mx-auto rounded-lg object-cover border-2 border-rose-200 border-solid shadow-md mb-10"></img>
            </div>
            <div className="flex-1 ml-2">
                <div class="text-rose-800 text-3xl my-3">
                    {product.name}
                </div>
                <div class="text-xl my-2">
                    {product.price}$
                </div>
                <div class="text-lg">
                    {product.description}  
                </div>    
            </div>
        </div>

    )
}

export default ProductPage;