//Page for a specific Product. Not for all products.

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCakeByID } from "../services/api.js";

function ProductPage() {

    const { id } = useParams();

    const [product, setProduct] = useState({name: "", price:"", description: ""})

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

    return (
        <div>
            {product.name}
            {product.price}
            {product.description}
        </div>
    )
}

export default ProductPage;