import "./style.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Orders, Dashboard, Navigation, CurrentOrder } from "../../components";
import * as csv from "fast-csv";
import ordersFile from "./orders.csv";

const App = () => {
	const [orders, setOrders] = useState([]);
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
					.on("end", () => setOrders(tempOrders));
			});
	}, []);
	return (
		<Router>
			<Route path="/:btn">
				<Navigation />
			</Route>
			<Switch>
				<Route path="/dashboard">
					<Dashboard orders={orders} />
				</Route>
				<Route path="/order/:id">
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
