import { createContext, useState, useContext, useEffect } from "react";
import { emptyProductQuery, getAllCakes, getCakesSearched, getCakeByID, addCake, updateCake, deleteCake } from "../services/api";

const CakeContext = createContext();

export const useCakeContext = () =>  useContext(CakeContext);

export const CakeProvider = ({children}) => {
    const [cakeList, setCakeList] = useState(emptyProductQuery());
    const [cart, setCart] = useState(() => {
        //Get the cart from local storage, or an empty array if no cart exists.
        return JSON.parse(localStorage.getItem('cart')) || [];
    });

    //Update cart in local storage on update
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = async (cake) => {
        setCart((prev) => [...prev, cake]);
    }

    const removeFromCart = async (cakeId) => {
        setCart((prev) => prev.filter((cake) => cake.id !== cakeId))
        console.info("Removed From Cart")
    }

    const filterCakes = async (pageNr, pageAmt, query = "") => {
        const cakes = await getCakesSearched(pageNr, pageAmt, query);

        setCakeList(cakes);
    }

    const clearLocal = async () => {
        localStorage.clear();
    }

    function TotalPrice() {
        let total = 0;
        for (let cake of cart) {
            total += cake.price;
        }
        return Math.round(total * 100) / 100;
    }

    const value = {
        cakeList,
        cart,
        filterCakes,
        addToCart,
        removeFromCart,
        TotalPrice,
        clearLocal
    }

    return (
        <CakeContext.Provider value={value}>{children}</CakeContext.Provider>
    );
}