import "./style.css";
import dashboardPng from "./dashboard.png";
import orderPng from "./order.png";
import { Link, useParams } from "react-router-dom";
const Navigation = () => {
	let btn = useParams().btn || "orders";
	return (
		<nav id="navigation">
			<Link to="/orders">
				<div
					style={{
						backgroundImage: `url(${orderPng})`,
						backgroundSize: "33%",
					}}
					className={btn === "orders" ? "active" : ""}
				>
					<span>Order</span>
				</div>
			</Link>
			<Link to="/dashboard">
				<div
					style={{
						backgroundImage: `url(${dashboardPng})`,
						backgroundSize: "40%",
					}}
					className={btn === "dashboard" ? "active" : ""}
				>
					<span>Dashboard</span>
				</div>
			</Link>
		</nav>
	);
};
export { Navigation };
