import { price } from "@/assets";
import "./styles/footer.scss";

export const Footer = () => {
	return (
		<div className="footer-section">
			<div className="price">
				<img src={price} alt="price" />
			</div>
			<div className="footer">
				<div className="heading">
					<h3>متوفر لينا خدمة توصيل الي المنازل</h3>
					<i className="fas fa-motorcycle" />
				</div>
				<div className="services">
					<h3>للأستفسار اتصل علي الرقم</h3>
					<div className="">
						<h3>01221003599</h3>
						<i className="fas fa-phone-volume" />
					</div>
				</div>
			</div>
		</div>
	);
};
