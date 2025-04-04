import { useCakeContext } from "../contexts/CakeContext"

function CartOverview() {

	const { cart } = useCakeContext();

	return (
		<div className="ml-6 mt-2 bg-white">
			<table className="table-auto">
				<thead>
					<tr>
						<th>Products</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.map(cartItem => (
						<CartItem item={cartItem} />
					))}
				</tbody>
			</table>
		</div>
	)
}

function CartItem({ item }) {

	const { id, name, price, description, imageUrl } = item;

	return (
		<tr>
			<td>

				{name}
				<br />
				{description}
			</td>
			<td>
				${price}
			</td>
		</tr>
	)
}

export default CartOverview;