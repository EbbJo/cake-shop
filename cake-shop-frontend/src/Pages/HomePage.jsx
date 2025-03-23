import ProductCard from "../Components/ProductCard";
import products from "../data/products.js"

function HomePage() {

    return (
        <>
            <div>
                <div id="product-section" className="flex flex-wrap justify-center py-5">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage;