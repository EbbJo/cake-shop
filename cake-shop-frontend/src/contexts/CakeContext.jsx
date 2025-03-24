import { createContext, useState, useContext, useEffect, Children, use } from "react";
import { getAllCakes, getCakeByID, addCake, updateCake, deleteCake } from "../services/api";

const CakeContext = createContext();

export const useCakeContext = () =>  useContext(CakeContext);

export const CakeProvider = ({children}) => {
    const [cakeList, setCakeList] = useState([]);

    useEffect(() => {
        const fetchAllCakes = async () => {
            const data = await getAllCakes();
            setCakeList(data);
        }

        fetchAllCakes();
    }, []);

    const value = {
        cakeList
    }

    return (
        <CakeContext.Provider value={value}>{children}</CakeContext.Provider>
    );
}