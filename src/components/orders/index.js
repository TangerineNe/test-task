import "./style.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { SortButton } from "../sortButton";
const Orders = ({ orders }) => {
	let history = useHistory();
	let setSortParams = useState({ column: "ID", direction: 1 })[1];
	function handleSort(column, direction) {
		if (column === "Date" || column === "Start date") {
			orders.sort((a, b) => {
				return direction * (new Date(a[column]) - new Date(b[column]));
			});
		} else if (column === "Meals") {
			orders.sort((a, b) => {
				return direction * (parseInt(a[column]) - parseInt(b[column]));
			});
		} else if (column === "Invoice") {
			orders.sort((a, b) => {
				if (a[column] === b[column]) {
					return 0;
				}
				if (a[column] === "False") {
					return direction;
				}
				return -1 * direction;
			});
		}
		setSortParams({ column, direction });
	}
	return (
		<table id="orders">
			<thead>
				<tr>
					<th>
						<span>Date</span>
						<SortButton onSort = {(direction)=>handleSort("Date", direction)}/>
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
						<SortButton onSort = {(direction)=>handleSort("Start date", direction)}/>
					</th>
					<th>
						<span>Meals</span>
						<SortButton onSort = {(direction)=>handleSort("Meals", direction)}/>
					</th>
					<th>
						<span>Invoice status</span>
						<SortButton onSort = {(direction)=>handleSort("Invoice", direction)}/>
					</th>
				</tr>
			</thead>
			<tbody>
				{!orders && (
					<tr>
						<td colSpan="7">Loading...</td>
					</tr>
				)}
				{orders?.map((order, i) => {
					return (
						<tr
							onClick={() => history.push(`/orders/${order.ID}`)}
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
