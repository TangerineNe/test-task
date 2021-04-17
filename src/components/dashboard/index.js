import { useEffect, useState } from "react";
import "./style.css";

const Dashboard = ({ orders }) => {
	const aggregation = {
		meals: {},
		unpaid: 0,
		totalNumber: orders.length,
		totalAsDay: 0,
	};

	const [currentDate, setCurrentDate] = useState(new Date("1/1/2021"));

	(function calculateAggregation() {
		for (let i = 0; i < orders.length; i++) {
			let order = orders[i];
			if (!!aggregation.meals[order.Meals]) {
				aggregation.meals[order.Meals]++;
			} else {
				aggregation.meals[order.Meals] = 1;
			}
			if (order.Invoice === "False") {
				aggregation.unpaid++;
			}
			if (
				new Date(order.Date).getDate() === currentDate.getDate() &&
				new Date(order.Date).getMonth() === currentDate.getMonth() &&
				new Date(order.Date).getYear() === currentDate.getYear()
			) {
				aggregation.totalAsDay++;
			}
		}
	})();
	let keysAggregation = Object.keys(aggregation.meals);
	return (
		<table>
			<thead>
				<tr>
					<th>
						<span>Number of orders (Grouped by meals)</span>
					</th>
					<th>
						<span>Number of unpaid orders</span>
					</th>
					<th>
						<span>Total number of orders</span>
					</th>
					<th>
						<span>Number of orders as of</span>
						<br />
						<input
							onChange={(event) => {
								setCurrentDate(new Date(event.target.value));
							}}
							style={{ margin: "5px" }}
							defaultValue="2021-01-01"
							type="date"
						></input>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						{keysAggregation[0] ? `${keysAggregation[0]} meals - ${aggregation.meals[keysAggregation[0]]} orders`: ``}
					</td>
					<td>{aggregation.unpaid}</td>
					<td>{aggregation.totalNumber}</td>
					<td>{aggregation.totalAsDay}</td>
				</tr>
				{keysAggregation.slice(1).map((val, i) => {
					return (
						<tr key={i}>
							<td>{`${val} meals - ${aggregation.meals[val]} orders`}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
export { Dashboard };
