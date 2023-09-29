import { Link } from "react-router-dom";
import { useState } from "react";
import { logo } from "@/assets";
import "./styles/navbar.scss";

export const Navbar = () => {
	const [toggler, setToggler] = useState(false);

	const handleToggler = () => setToggler((t) => !t);

	return (
		<nav className="navbar-section">
			<Link to="/" className="right-side">
				<img src={logo} alt="logo" />
				<h3 className="nav-title">فضيات خان باكوس</h3>
			</Link>
			<div className="left-side">
				<i className={`fa ${toggler ? "fa-times" : "fa-bars"}`} onClick={handleToggler} />
				<div className={`dropdown ${toggler ? "open" : ""}`}>
					<Link to="/products" className="option" onClick={handleToggler}>
						<i className="fa fa-table" />
						<p className="name">عرض المنتجات</p>
					</Link>
					<Link to="/products/add-product" className="option" onClick={handleToggler}>
						<i className="fa fa-plus" />
						<p className="name">اضافة منتج</p>
					</Link>
					<Link to="/statistics" className="option" onClick={handleToggler}>
						<i className="fas fa-chart-line" />
						<p className="name">الاحصائيات</p>
					</Link>
				</div>
			</div>
		</nav>
	);
};
