import { Month, Today } from "@/components";
import "./styles/statistics.scss";

export const Statistics = () => {
	return (
		<div className="statistics-section">
			<Today />
			{/* <Month /> */}
		</div>
	);
};
