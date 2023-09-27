import "./styles/alert.scss";

export const Alert = ({ message, success, error }) => {
	return (
		<div className={`alert-section ${success ? "success" : "error"}`}>
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
