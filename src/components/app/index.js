import "./style.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Orders, Dashboard, Navigation, CurrentOrder } from "../../components";
import * as csv from "fast-csv";
import ordersFile from "./orders.csv";

const aggregation = {
	meals: {},
	unpaid: 0,
	totalNumber: 0,
	totalAsDay: {},
};
const App = () => {
	const [orders, setOrders] = useState();
	useEffect(() => {
		fetch(ordersFile) //preload data from orders.csv
			.then((response) => {
				return response.text();
			})
			.then((csvString) => {
				let tempOrders = [];
				csv
					.parseString(csvString, { headers: true })
					.on("error", (error) => console.error(error))
					.on("data", (row) => tempOrders.push(row))
					.on("end", () => {
						aggregation.totalNumber = tempOrders?.length || 0;
						for (let i = 0; i < tempOrders?.length; i++) {
							let order = tempOrders[i];
							if (!!aggregation.meals[order.Meals]) {
								aggregation.meals[order.Meals]++;
							} else {
								aggregation.meals[order.Meals] = 1;
							}
							if (order.Invoice === "False") {
								aggregation.unpaid++;
							}
							if (!!aggregation.totalAsDay[order.Date]) {
								aggregation.totalAsDay[order.Date]++;
							} else {
								aggregation.totalAsDay[order.Date] = 1;
							}
						}
						setOrders(tempOrders);
					});
			});
	}, []);

	return (
		<Router>
			<Route path={["/:btn", "/"]}>
				<Navigation />
			</Route>
			<Switch>
				<Route path="/dashboard">
					<Dashboard aggregation={aggregation} />
				</Route>
				<Route path="/orders/:id">
					<CurrentOrder orders={orders}></CurrentOrder>
				</Route>
				<Route>
					<Orders orders={orders} />
				</Route>
			</Switch>
		</Router>
	);
};
export { App };
