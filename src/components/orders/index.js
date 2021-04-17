import "./style.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Orders = ({ orders }) => {
	let history = useHistory();
	let setSortColumn = useState("ID")[1];
	function handleSort(col, direction) {
		if (col === "Date" || col === "Start date") {
			orders.sort((a, b) => direction * (new Date(a[col]) - new Date(b[col])));
		} else if (col === "Meals") {
			orders.sort((a, b) => direction * (parseInt(a[col]) - parseInt(b[col])));
		} else if (col === "Invoice") {
			console.log("teest");
			orders.sort((a, b) => {
				if (a[col] === b[col]) {
					return 0;
				}
				if (a[col] === "False") {
					return direction;
				}
				return -1 * direction;
			});
		}
		setSortColumn(col + direction);
	}
	return (
		<table id = "orders">
			<thead>
				<tr>
					<th>
						<span>Date</span>
						<div
							onClick={() => handleSort("Date", -1)}
							className="sort_button up"
						></div>
						<div
							onClick={() => handleSort("Date", 1)}
							className="sort_button down"
						></div>
					</th>
					<th>
						<span>Name</span>
					</th>
					<th>
						<span>Phone</span>
					</th>
					<th>
						<span>Email</span>
					</th>
					<th>
						<span>Start date</span>
						<div
							onClick={() => handleSort("Start date", -1)}
							className="sort_button up"
						></div>
						<div
							onClick={() => handleSort("Start date", 1)}
							className="sort_button down"
						></div>
					</th>
					<th>
						<span>Meals</span>
						<div
							onClick={() => handleSort("Meals", -1)}
							className="sort_button up"
						></div>
						<div
							onClick={() => handleSort("Meals", 1)}
							className="sort_button down"
						></div>
					</th>
					<th>
						<span>Invoice status</span>
						<div
							onClick={() => handleSort("Invoice", -1)}
							className="sort_button up"
						></div>
						<div
							onClick={() => handleSort("Invoice", 1)}
							className="sort_button down"
						></div>
					</th>
				</tr>
			</thead>
			<tbody>
				{orders.map((order, i) => {
					return (
						<tr
							onClick={() => history.push(`/order/${order.ID}`)}
							key={order.ID}
						>
							<td>{order["Date"]}</td>
							<td>{order["FirstName LastName"]}</td>
							<td>{order["Phone"]}</td>
							<td>{order["Email"]}</td>
							<td>{order["Start date"]}</td>
							<td>{order["Meals"]}</td>
							<td>{order["Invoice"] === "True" ? "paid" : "unpaid"}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
export { Orders };
