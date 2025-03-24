import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import products from "../data/products.js"
import { getAllCakes } from "../services/api.js";
import { useCakeContext } from "../contexts/CakeContext.jsx";

function HomePage() {
    const {cakeList} = useCakeContext();

    return (
        <>
            <div>
                <div id="product-section" className="flex flex-wrap justify-self-start py-5">
                    {cakeList.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage;