import { useEffect, useState } from "react";
import { useCakeContext } from "../contexts/CakeContext"
import ProductSummaryCard from "./ProductSummaryCard";
import { CgLayoutGrid } from "react-icons/cg";

function CartOverview() {

	const { groupedCart } = useCakeContext();
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		setCartItems(groupedCart)
	}, [groupedCart])

	return (
		<div className="ml-4 mt-3 bg-white h-[600px] w-[1070px] overflow-auto">
			<table className="table-fixed">
				<thead className="border-b border-b-pink-200">
					<tr>
						<th className="text-left pl-7 w-[350px] text-rose-800">Item</th>
						<th className="text-center w-[240px] text-rose-800">Price</th>
						<th className="text-center w-[240px] text-rose-800">Quantity</th>
						<th className="text-center w-[240px] text-rose-800">Total</th>
					</tr>
				</thead>
				<tbody className="">
					{groupedCart.length > 0 ? (
						groupedCart.map(({ product, count }) => (
							<ProductSummaryCard
								key={product.id}
								product={product}
								amt={count}
							/>
						))
					) : (
						<tr>
							<td colSpan="5" className="text-center py-8 text-rose-800">
								Your cart is empty
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default CartOverview;