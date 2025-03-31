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
        <div class="flex flex-row mt-10">
            <div class="flex-1">
                <img src={`/Images/Cake-${id}.jpg`} className="size-[500px] mx-auto rounded-3xl"></img>
            </div>
            <div className="flex-1">
                {product.name}
                <br />
                {product.price}
                <br />
                {product.description}                
            </div>
        </div>

    )
}

export default ProductPage;