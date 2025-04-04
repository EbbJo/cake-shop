import { createContext, useState, useContext, useEffect } from "react";
import { emptyProductQuery, getAllCakes, getCakesSearched, getCakeByID, addCake, updateCake, deleteCake } from "../services/api";

const CakeContext = createContext();

export const useCakeContext = () => useContext(CakeContext);

export const CakeProvider = ({ children }) => {
    const [cakeList, setCakeList] = useState(emptyProductQuery());
    const [cart, setCart] = useState(() => {
        //Get the cart from local storage, or an empty array if no cart exists.
        return JSON.parse(localStorage.getItem('cart')) || [];
    });
    const [groupedCart, setGroupedCart] = useState(() => {
        return JSON.parse(localStorage.getItem('groupedCart')) || [];
    })

    //Update cart in local storage on update
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('groupedCart', JSON.stringify(groupCart(cart)))
    }, [cart]);

    const addToCart = async (cake) => {
        const updatedCart = [...cart, cake];

        setCart(updatedCart);
        setGroupedCart(groupCart(updatedCart));
    }

    const removeFromCart = async (cakeId) => {
        const updatedCart = cart.filter((cake) => cake.id !== cakeId)

        setCart(updatedCart)
        setGroupedCart(groupCart(updatedCart))
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

    function groupCart(cartToGroup) {
        const groupedCart = cartToGroup.reduce((acc, product) => {
            const id = product.id;

            // If this product ID doesn't exist in the accumulator yet, create it
            if (!acc[id]) {
                acc[id] = {
                    product: product,
                    count: 0
                };
            }

            // Increment the count for this product ID
            acc[id].count += 1;

            return acc;
        }, {});

        // Convert the grouped object to an array
        const groupedCartItems = Object.values(groupedCart);

        return groupedCartItems;
    }

    function SubtractFromGroup(cake) {
        // Find the item in the cart
        const itemIndex = cart.findIndex(item => item.id === cake.id);

        if (itemIndex !== -1) {
            // Create a copy of the cart
            const updatedCart = [...cart];

            // Remove one occurrence of the item
            updatedCart.splice(itemIndex, 1);

            // Update the cart state
            setCart(updatedCart);
            setGroupedCart(groupCart(updatedCart));
            // groupedCart will be updated automatically via the useEffect
        }
    }

    const value = {
        cakeList,
        cart,
        groupedCart,
        filterCakes,
        addToCart,
        removeFromCart,
        TotalPrice,
        clearLocal,
        SubtractFromGroup
    }

    return (
        <CakeContext.Provider value={value}>{children}</CakeContext.Provider>
    );
}