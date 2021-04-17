import { useParams } from "react-router-dom";
import { Fragment } from "react";
const CurrentOrder = ({ orders }) => {
	let { id } = useParams();
	let order = orders.filter((order) => order.ID === id)[0];
	return (
		<Fragment>
			<h2>Order №{id}</h2>
			<div>
				<ul>
					<li>Date: {order["Date"]}</li>
					<li>Name: {order["FirstName LastName"]}</li>
					<li>Phone: {order["Phone"]}</li>
					<li>Email: {order["Email"]}</li>
					<li>Start date: {order["Start date"]}</li>
					<li>Meals: {order["Meals"]}</li>
					<li>Invoice: {order["Invoice"]}</li>
				</ul>
			</div>
		</Fragment>
	);
};
export { CurrentOrder };
