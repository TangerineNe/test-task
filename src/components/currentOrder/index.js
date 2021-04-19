import { useParams } from "react-router-dom";
import { Fragment } from "react";
const CurrentOrder = ({ orders }) => {
	let { id } = useParams();
	let order = orders?.find((order) => order.ID === id);
	return (
		<Fragment>
			<h2>
				Order №{id} {orders && !order && "not found"}
			</h2>
			<ul>
				{order && (
					<Fragment>
						<li>Date: {order["Date"]}</li>
						<li>Name: {order["FirstName LastName"]}</li>
						<li>Phone: {order["Phone"]}</li>
						<li>Email: {order["Email"]}</li>
						<li>Start date: {order["Start date"]}</li>
						<li>Meals: {order["Meals"]}</li>
						<li>Invoice: {order["Invoice"] === "True" ? "paid" : "unpaid"}</li>
					</Fragment>
				)}
			</ul>
		</Fragment>
	);
};
export { CurrentOrder };
