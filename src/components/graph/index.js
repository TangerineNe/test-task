import { createRef, useEffect, useState } from "react";
import "./style.css";
import {
	drawGraph,
	calculatePoints,
	searchNearestPoint,
	drawFilledArc,
} from "./drawGraph";

const Graph = ({ days }) => {
	let [dateInPoint, setDateInPoint] = useState(null);
	let canvasRef = createRef();
	function handleMouseMove(event) {
		const x = event.nativeEvent.offsetX;
		const optimalPoint = searchNearestPoint(canvasRef.current, x);
		let date = optimalPoint.date;
		let formatDate = `${date.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`;
		if (formatDate !== dateInPoint) {
			const x = optimalPoint.x;
			const y = optimalPoint.y;
			drawGraph(canvasRef.current);
			drawFilledArc(canvasRef.current, x, y, 5);
			setDateInPoint(formatDate);
		}
	}
	function handleMouseLeave() {
		drawGraph(canvasRef.current);
		setDateInPoint(null);
	}
	const forUseEffect = Object.keys(days).join("");
	useEffect(() => {
		canvasRef.current.points = calculatePoints(days);
		drawGraph(canvasRef.current, canvasRef.current.points);
	}, [forUseEffect]);
	return (
		<table>
			<thead>
				<tr>
					{dateInPoint ? (
						<th>
							{dateInPoint} - {dateInPoint && (days[dateInPoint] || 0)} orders
						</th>
					) : (
						<th>Graph</th>
					)}
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="for_graph">
						<canvas
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}
							height="350"
							width={window.innerWidth - 16}
							ref={canvasRef}
						/>
					</td>
				</tr>
			</tbody>
		</table>
	);
};
export { Graph };
