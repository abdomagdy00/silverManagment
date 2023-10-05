import { useEffect, useState } from "react";
import "./styles/alert.scss";

export const Alert = ({ message, success, error }) => {
	const [end, setEnd] = useState(false);

	useEffect(() => {
		setEnd(false);
		setTimeout(() => {
			setEnd(true);
		}, 3000);
	}, []);

	return (
		<div className={`alert-section ${success ? "success" : "error"} ${end ? "end" : ""}`}>
			{success && (
				<div className="success">
					<i className="far fa-check-circle" />
					<span>{message}</span>
				</div>
			)}

			{error && (
				<div className="error">
					<i className="far fa-times-circle" />
					<span>{message}</span>
				</div>
			)}
		</div>
	);
};
