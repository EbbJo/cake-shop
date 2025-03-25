import ProductCard from "../Components/ProductCard";
import { useCakeContext } from "../contexts/CakeContext.jsx";
import { getCakesSearched } from "../services/api.js";
import { useState, useEffect } from "react";

function HomePage() {
    const AMT_PER_PAGE = 10;

    const {cakeList, filterCakes} = useCakeContext();

    const [seachQuery, setSearchQuery] = useState("");

    const [pageNr, setPageNr] = useState(0);

    useEffect(() => {
        filterCakes(pageNr, AMT_PER_PAGE, seachQuery);
    }, [pageNr])

    const onSearchChanged = async (e) => {
        setSearchQuery(e.target.value);
    }

    const filterResults = async () => {
        filterCakes(pageNr, AMT_PER_PAGE, seachQuery);
        setPageNr(0);
    }

    const increasePageNr = () => {
        setPageNr(pageNr+1);
    }

    const decreasePageNr = () => {
        if (pageNr > 0) {
            setPageNr(pageNr-1);
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="relative flex justify-center my-10">
                    <input
                    type="text"
                    className="w-[700px] h-[50px] text-center bg-transparent focus:outline-none border-slate-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400
                    border-2 p-1 mr-1.5 rounded-md transition duration-300 ease"
                    placeholder="Search" 
                    onChange={onSearchChanged}/>
                    <button
                    className="top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={filterResults}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                    </svg>
                    Search
                    </button> 
                </div>
            </div>
            <div className="flex justify-center">
                <button type="button" className="top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={decreasePageNr}>
                    &lt; Prev
                </button>
                <label htmlFor="pageNr" id="pageNrLabel" className="mx-3">{pageNr+1}</label>
                <button type="button" className="top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={increasePageNr}>
                    Next &gt;
                </button>
            </div>
            <div>
                <div id="product-section" className="flex flex-wrap justify-self-start">
                    {cakeList.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage;