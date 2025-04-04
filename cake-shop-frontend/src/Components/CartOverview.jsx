import { useCakeContext } from "../contexts/CakeContext"
import ProductSummaryCard from "./ProductSummaryCard";

function CartOverview() {

	const { cart } = useCakeContext();
	const { cart } = useCakeContext();

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
					{cart.map(cartItem => (
						<ProductSummaryCard product={cartItem} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CartOverview;