import { useMemo, useState } from "react";
import { useCakeContext } from "../contexts/CakeContext";
import Select from "react-select";
import countryList from "react-select-country-list";
import { addOrder } from "../services/api";
import { useNavigate } from 'react-router-dom';

function OrderSummary() {

    const { cart, TotalPrice } = useCakeContext();
    const navigate = useNavigate();

    const shippingPrice = 2.99;

    const countires = useMemo(() => countryList().getData(), [])
    const provinces = [
        { value: 'midtjylland', label: 'Midtjylland' },
        { value: 'nordjylland', label: 'Nordjylland' },
        { value: 'syddanmark', label: 'Syddanmark' },
        { value: 'sjælland', label: 'Sjælland' },
        { value: 'fyn', label: 'Fyn' },
    ]
    const [selectedCountry, setSelectedCountry] = useState({value:'', label:''})
    const [selectedProvince, setselectedProvince] = useState({value:'', label:''})
    const [enteredCity, setenteredCity] = useState('')
    const [enteredPostalCode, setenteredPostalCode] = useState('')


    const changeHandlerCountires = value => {
        setSelectedCountry(value)
    }
    const changeHandlerProvinces = value => {
        setselectedProvince(value)
    }
    const changeHandlerCities = (e) => {
        setenteredCity(e.target.value)
    }
    const changeHandlerPostalCodes = (e) => {
        setenteredPostalCode(e.target.value)
    }

    const processOrder = async () => {
        console.log(selectedCountry);

        let order = {
            products: [],
            country: selectedCountry.value,
            province: selectedProvince.value,
            city: enteredCity,
            postalCode: enteredPostalCode,
            shippingCost: shippingPrice
        };

        //Cake id's already considered
        let seenCakes = [];

        for (var cake of cart) {
            //If seen cake, skip
            if (seenCakes.indexOf(cake.id) != -1) {
                continue;
            }
            seenCakes.push(cake.id);

            console.log(cake);

            order.products.push({
                cakeId: cake.id,
                quantity: cart.filter(c => c.id === cake.id).length
            });
        }

        console.log(cart);
        console.log(order);

        let response = await addOrder(order);

        if (response === null) {
            navigate('/result/:false');
        } else {
            navigate('/result/:true');
        }
    }

    return (
         <div className="flex flex-col justify-between border border-pink-200 rounded-md w-[400px] p-6 m-5 shadow-md hover:shadow-lg transition-all bg-white">
            <div className="text-xl font-bold text-rose-800 mb-4 border-b border-pink-100 pb-2">
                Order Summary
            </div>
            <div className="space-y-4">
                <div className="flex justify-between">   
                    <div className="text-rose-800">
                        Subtotal:
                    </div>
                    <div className="font-medium">
                        ${TotalPrice()}
                    </div>
                </div>
                
                <div className="flex justify-between">   
                    <div className="text-rose-800">
                        Shipping:
                    </div>
                    <div className="font-medium">
                        ${shippingPrice}
                    </div>
                </div>
                <div>
                    <div className="text-rose-700">
                        Country
                    </div>
                    <Select placeholder={"Select a Country"} options={countires} value={selectedCountry} onChange={changeHandlerCountires}/>
                </div>
                <div>
                    <div className="text-rose-700">
                        Province
                    </div>
                    <Select placeholder={"Select a Country"} options={provinces} value={selectedProvince} onChange={changeHandlerProvinces}/>
                </div>
                <div>
                    <div className="text-rose-700">
                        City
                    </div>
                    <input className="border-[1px] rounded-[4px] border-[color:hsl(0,0%,80%)] transition-all duration-100 border-solid h-[38px] w-[350px] focus:outline-none focus:ring-1 focus:ring-[#2684FF]" onChange={changeHandlerCities}/>
                </div>
                <div>
                    <div className="text-rose-700">
                        Postal code
                    </div>
                    <input onChange={changeHandlerPostalCodes}/>
                </div>
                <div className="flex justify-between border-t border-pink-100 pt-2 mt-2">   
                    <div className="text-rose-800 font-bold">
                        Total:
                    </div>
                    <div className="font-bold text-rose-900">
                        ${TotalPrice() + shippingPrice}
                    </div>
                </div>
            </div>
            
            <button onClick={processOrder} className="mt-6 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded transition-colors">
                Proceed to Checkout
            </button>
        </div>
    )
}


export default OrderSummary;