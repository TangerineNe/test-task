import { format } from "@fast-csv/format";
import { Fragment, useState, useEffect } from "react";
import { Graph } from "../graph";
const Dashboard = ({ aggregation }) => {
	const [selectedDate, setSelectedDate] = useState(new Date("1/1/2021"));
	let date = new Date(selectedDate);
	let formatDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
	let keysAggregation = Object.keys(aggregation.meals);
	return (
		<Fragment>
			<Graph days = {aggregation.totalAsDay}></Graph>
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
									setSelectedDate(new Date(event.target.value));
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
							{keysAggregation.length
								? `${keysAggregation[0]} meals - ${
										aggregation.meals[keysAggregation[0]]
								  } orders`
								: ``}
						</td>
						<td>{aggregation.unpaid}</td>
						<td>{aggregation.totalNumber}</td>
						<td>{aggregation.totalAsDay[formatDate]}</td>
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
		</Fragment>
	);
};
export { Dashboard };
