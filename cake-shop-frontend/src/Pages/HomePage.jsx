import ProductCard from "../Components/ProductCard";
import { useCakeContext } from "../contexts/CakeContext.jsx";
import { useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";


function HomePage() {
    const AMT_PER_PAGE = 10;

    const {cakeList, filterCakes} = useCakeContext();

    const [seachQuery, setSearchQuery] = useState("");
    
    const [pageNr, setPageNr] = useState(0);

    useEffect(() => {
        filterCakes(pageNr, AMT_PER_PAGE, seachQuery);
        console.log(cakeList);
    }, [pageNr])

    const onSearchChanged = async (e) => {
        setSearchQuery(e.target.value);
    }

    const filterResults = async () => {
        filterCakes(pageNr, AMT_PER_PAGE, seachQuery);
        setPageNr(0);
    }

    const increasePageNr = () => {
        if (!cakeList.lastPage) {
            setPageNr(pageNr+1);
        }
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
                    className="w-[700px] h-[50px] text-center focus:outline-none bg-white border-rose-200 shadow-md hover:shadow-lg
                    border-2 p-1 mr-1.5 rounded-3xl transition duration-300 ease"
                    placeholder="Search" 
                    onChange={onSearchChanged}
                    onKeyDown={(e) => {if (e.key === "Enter") filterResults();}}
                    />
                    <button
                    className="absolute top-2 right-4 flex items-center py-1.5 px-2.5 text-center text-xl hover:cursor-pointer transition duration-200 hover:scale-105 ease-in-out"
                    type="button"
                    onClick={filterResults}>
                        <IoIosSearch />
                    </button> 
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button type="button" id="decPage" className={((pageNr == 0) ? "invisible" : "visible")+" flex items-center rounded bg-rose-600 py-1 px-2.5 border border-transparent text-center text-md text-white transition-all shadow-sm hover:shadow focus:bg-rose-600 focus:shadow-none active:bg-rose-700 hover:bg-rose-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"}
                onClick={decreasePageNr}>
                    <MdNavigateBefore />
                </button>
                <label htmlFor="pageNr" id="pageNrLabel" className="mx-3">{pageNr+1} of {(cakeList.numPages == 0) ? 1 : cakeList.numPages}</label>
                <button type="button" id="incPage" className={(cakeList.lastPage ? "invisible" : "visible")+" top-1 right-1 flex items-center rounded bg-rose-600 py-1 px-2.5 border border-transparent text-center text-md text-white transition-all shadow-sm hover:shadow focus:bg-rose-600 focus:shadow-none active:bg-rose-700 hover:bg-rose-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"}
                onClick={increasePageNr}>
                    <MdNavigateNext />
                </button>
            </div>
            <div>
                <div id="product-section" className="flex flex-wrap justify-center">
                    {cakeList.cakes.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage;