import { createRef, useEffect, useState } from "react";
import "./style.css";


const Graph = ({ days }) => {
  let [dateInPoint, setDateInPoint] = useState(null);
	let canvasRef = createRef();
  function calculatePoints(){
    const DAY_MILLISECONDS = 60*60*24*1000;
		const arrOfDays = Object.keys(days).map((day) => new Date(day)).sort((a, b) => a - b);
    const firstDay = +arrOfDays[0];
    const lastDay = +arrOfDays[arrOfDays.length - 1];
    const countDay = (lastDay-firstDay)/DAY_MILLISECONDS;
    const padding = 50;
    const width = window.innerWidth - 16;
    const height = 350;
    let maxCountOrders = 0;
    for(let day in days){
      maxCountOrders = Math.max(maxCountOrders, parseInt(days[day]));
    }
    let points = [];
    for(let i = firstDay; i <= lastDay; i += DAY_MILLISECONDS){
      const date = new Date(i);
      const formatDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
      let x = ((width - padding)/countDay) * (i-firstDay)/DAY_MILLISECONDS + padding/2;
      let y = height - ( ((height - padding)/maxCountOrders)*(days[formatDate] || 0) + padding/2 );
      points.push({x, y, date});
    }
    return points;
  }
  function drawGraph(points){
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#15a4fa";
    ctx.fillStyle = "#15a4fa";
    ctx.beginPath();
    ctx.moveTo(0, points[0]?.y);
    for(let i = 0; i < points.length; i++){
      ctx.lineTo(points[i]?.x, points[i]?.y);
    }
    ctx.lineTo(canvasRef.current.width, points[points.length - 1]?.y)
    ctx.stroke();
    ctx.closePath();
    for(let i = 0; i < points.length; i++){
      ctx.beginPath();
      ctx.arc(points[i]?.x, points[i]?.y, 3, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      
    }
  }
  function drawPoint(event){
    const ctx = canvasRef.current.getContext("2d");
    drawGraph(canvasRef.current.points);
    let x = event.nativeEvent.offsetX;
    let optimalPoint = canvasRef.current.points[0];
    let minDistance = Infinity;
    for(let i = 0; i < canvasRef.current.points.length; i++){
      if(Math.abs(canvasRef.current.points[i].x - x) < minDistance){
        minDistance = Math.abs(canvasRef.current.points[i].x - x);
        optimalPoint = canvasRef.current.points[i];
      }
    }
    x = optimalPoint?.x;
    let y = optimalPoint?.y;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#7896bb";
    ctx.font = "20px serif";
    let date = optimalPoint?.date;
    let formatDate = `${date?.getMonth()+1}/${date?.getDate()}/${date?.getFullYear()}`;
   // dateInPoint = formatDate;
    setDateInPoint(formatDate)
    //ctx.fillText(formatDate, 710, 40);

  }
  function handleMouseLeave(){
    drawGraph(canvasRef.current.points);
    setDateInPoint(null);
  }
	useEffect(() => {
    canvasRef.current.points = calculatePoints();
    drawGraph(canvasRef.current.points);
	});

	return (
		<table>
			<thead>
				<tr>
          {!dateInPoint && <th>Graph</th>}
          {dateInPoint && <th>{dateInPoint} - {dateInPoint && ( days[dateInPoint] || 0)} orders</th>}
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="for_graph">
						<canvas onMouseMove = {drawPoint} onMouseLeave = {handleMouseLeave} height = "350" width = {window.innerWidth - 16} ref={canvasRef} />
					</td>
				</tr>
			</tbody>
		</table>
	);
};
export { Graph };
