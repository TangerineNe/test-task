const BLUE = "#15a4fa";
const DAY_MILLISECONDS = 60 * 60 * 24 * 1000;
export function drawFilledArc(canvas, x, y, r) {
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
}
export function drawGraph(canvas) {
	const points = canvas.points;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 2;
	ctx.strokeStyle = BLUE;
	ctx.fillStyle = BLUE;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(0, points[0]?.y);
	for (let i = 0; i < points.length; i++) {
		ctx.lineTo(points[i]?.x, points[i]?.y);
	}
	ctx.lineTo(canvas.width, points[points.length - 1]?.y);
	ctx.stroke();
	ctx.closePath();
	for (let i = 0; i < points.length; i++) {
		drawFilledArc(canvas, points[i]?.x, points[i]?.y, 3);
	}
}
export function calculatePoints(days) {
	//Поиск вершин графа
	const arrOfDays = Object.keys(days)
		.map((day) => new Date(day))
		.sort((a, b) => a - b);
	const firstDay = +arrOfDays[0];
	const lastDay = +arrOfDays[arrOfDays.length - 1];
	const countDay = (lastDay - firstDay) / DAY_MILLISECONDS;
	const padding = 50;
	const width = window.innerWidth - 16;
	const height = 350;
	let maxCountOrders = 0;
	for (let day in days) {
		maxCountOrders = Math.max(maxCountOrders, parseInt(days[day]));
	}
	let points = [];
	for (let i = firstDay; i <= lastDay; i += DAY_MILLISECONDS) {
		const date = new Date(i);
		const formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
		const x = (((width - padding) / countDay) * (i - firstDay)) / DAY_MILLISECONDS + padding / 2;
		const y = height - (((height - padding) / maxCountOrders) * (days[formatDate] || 0) + padding / 2);
		points.push({ x, y, date });
	}
	return points;
}
export function searchNearestPoint(canvas, x) {
	//Поиск ближайшей точки по x
	const points = canvas.points;
	let optimalPoint = points[0];
	let minDistance = Infinity;
	for (let i = 0; i < points.length; i++) {
		if (Math.abs(points[i].x - x) < minDistance) {
			minDistance = Math.abs(points[i].x - x);
			optimalPoint = points[i];
		}
	}
	return (
		optimalPoint || {
			x: null,
			y: null,
			date: null,
		}
	);
}
