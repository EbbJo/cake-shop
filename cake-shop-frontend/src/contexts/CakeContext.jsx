import { createContext, useState, useContext, useEffect } from "react";
import { getAllCakes, getCakesSearched, getCakeByID, addCake, updateCake, deleteCake } from "../services/api";

const CakeContext = createContext();

export const useCakeContext = () =>  useContext(CakeContext);

export const CakeProvider = ({children}) => {
    const [cakeList, setCakeList] = useState({lastPage: false, cakes: []});
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchAllCakes = async () => {
            const data = await getAllCakes();
            setCakeList({lastPage: false, cakes: data});
        }

        fetchAllCakes();
    }, []);

    const addToCart = async (cake) => {
        setCart((prev) => [...prev, cake]);
        console.info("Added To Cart")
    }

    const removeFromCart = async (cakeId) => {
        setCart((prev) => prev.filter((cake) => cake.id !== cakeId))
        console.info("Removed From Cart")
    }

    const filterCakes = async (pageNr, pageAmt, query = "") => {
        const cakes = await getCakesSearched(pageNr, pageAmt, query);

        setCakeList(cakes);
    }

    const value = {
        cakeList,
        cart,
        filterCakes,
        addToCart,
        removeFromCart
    }

    return (
        <CakeContext.Provider value={value}>{children}</CakeContext.Provider>
    );
}