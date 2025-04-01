import { useCakeContext } from "../contexts/CakeContext"
import OrderSummary from "../Components/OrderSummary"
import CartOverview from "../Components/CartOverview"

function Cart() {

    const {clearLocal} = useCakeContext();

    return(
        <div className="flex justify-between">
            <button onClick={clearLocal}>
                <a href="">Click here to clear local storage</a>
            </button>
            <OrderSummary />
            <CartOverview />
        </div>
    )
}

export default Cart; 