import "./styles/header.scss";

export const Header = () => {
	return (
		<header className="header-section">
			<div className="">
				<h4 className="subtitle">الرصيد</h4>
				<span className="price">0</span>
			</div>
			<div className="">
				<h4 className="subtitle">الاجمالي</h4>
				<span className="price">0,00</span>
			</div>
		</header>
	);
};
