import { Fragment } from "react";
import "./style.css";
const SortButton = ({onSort}) => {
	return (
		<div className = "main_sort_button">
			<div
				onClick={() => onSort(-1)}
				className="sort_button up"
			></div>
			<div
				onClick={() => onSort(1)}
				className="sort_button down"
			></div>
		</div>
	);
};
export { SortButton };
