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
        <div>
            {product.name}
            {product.price}
            {product.description}

            <img src={`../../public/Images/Cake-${id}.jpg`} className="min-w-[500px] min-h-[500px] max-w-[500px] max-h-[500px]"></img>
        </div>
    )
}

export default ProductPage;