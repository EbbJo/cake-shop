import { useCakeContext } from "../contexts/CakeContext"

function Cart() {

    const {clearLocal} = useCakeContext();

    return(
        <div>
            <button onClick={clearLocal}>
                <a href="">Click here to clear local storage</a>
            </button>
        </div>
    )
}

export default Cart; 