import { useState } from "react";
import { useCakeContext } from "../contexts/CakeContext";
import Select from "react-select";

function OrderSummary() {

    const { cart, TotalPrice } = useCakeContext();
    const shippingPrice = 2.99;
    const countries = [
        { value: "denmark", label: "Denmark" }
    ]
    const provinces = [
        { value: 'midtjylland', label: 'Midtjylland' },
        { value: 'nordjylland', label: 'Nordjylland' },
        { value: 'syddanmark', label: 'Syddanmark' },
        { value: 'sjælland', label: 'Sjælland' },
        { value: 'fyn', label: 'Fyn' },
    ]
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedProvince, setselectedProvince] = useState('')
    const [enteredCity, setenteredCity] = useState('')
    const [enteredPostalCode, setenteredPostalCode] = useState('')


    const changeHandlerCountries = value => {
        setSelectedCountry(value)
    }
    const changeHandlerProvinces = value => {
        setselectedProvince(value)
    }
    const changeHandlerCities = value => {
        setenteredCity(value)
    }
    const changeHandlerPostalCodes = value => {
        setenteredPostalCode(value)
    }

    return (
        <div className="flex flex-col justify-between border border-pink-200 rounded-md w-[400px] p-6 mr-4 mt-3 shadow-md hover:shadow-lg transition-all bg-white">
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
                    <Select placeholder={"Select a Country"} options={countries} value={selectedCountry} onChange={changeHandlerCountries} />
                </div>
                <div>
                    <div className="text-rose-700">
                        Province
                    </div>
                    <Select placeholder={"Select a Country"} options={provinces} value={selectedProvince} onChange={changeHandlerProvinces} />
                </div>
                <div>
                    <div className="text-rose-700">
                        City
                    </div>
                    <input placeholder="Enter a City" className="p-2.5 border-[1px] rounded-[4px] border-[color:hsl(0,0%,80%)] transition-all duration-100 border-solid h-[38px] w-[350px] focus:outline-none focus:border-[#2684FF] focus:ring-1 focus:ring-[#2684FF]" onChange={changeHandlerCities} />
                </div>
                <div>
                    <div className="text-rose-700">
                        Postal code
                    </div>
                    <input placeholder="Enter a Postal code" className="p-2.5 border-[1px] rounded-[4px] border-[color:hsl(0,0%,80%)] transition-all duration-100 border-solid h-[38px] w-[350px] focus:outline-none focus:border-[#2684FF] focus:ring-1 focus:ring-[#2684FF]" onChange={changeHandlerPostalCodes} />
                </div>
                <div className="flex justify-between border-t border-pink-100 pt-2 mt-2">
                    <div className="text-rose-800 font-bold">
                        Total:
                    </div>
                    <div className="font-bold text-rose-900">
                        ${((TotalPrice() + shippingPrice) * 100) / 100}
                    </div>
                </div>
            </div>

            <button className="mt-6 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded transition-colors">
                Proceed to Checkout
            </button>
        </div>
    )
}


export default OrderSummary;