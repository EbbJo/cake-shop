import { useCakeContext } from "../contexts/CakeContext"
import OrderSummary from "../Components/OrderSummary"
import CartOverview from "../Components/CartOverview"

function Cart() {

    const { clearLocal } = useCakeContext();

    return (
        <>
            <div className="flex justify-between">
                <CartOverview />
                <OrderSummary />
            </div>
            <button onClick={clearLocal}>
                <a href="">Click here to clear local storage</a>
            </button>
        </>
    )
}

export default Cart; 