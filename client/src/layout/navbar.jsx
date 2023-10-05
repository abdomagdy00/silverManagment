import { Link } from "react-router-dom";
import { useState } from "react";
import { logo } from "@/assets";
import "./styles/navbar.scss";

export const Navbar = () => {
	const [toggler, setToggler] = useState(false);
	const [nested, setNested] = useState(false);

	const handleToggler = () => {
		setToggler((t) => !t);
		setNested(() => false);
	};
	const handleNested = () => {
		setNested((n) => !n);
	};

	return (
		<nav className="navbar-section">
			<Link to="/" className="right-side">
				<img src={logo} alt="logo" />
				<h3 className="nav-title">فضيات خان باكوس</h3>
			</Link>
			<div className="left-side">
				<div className="flex-between">
					<Link to="https://www.facebook.com/groups/418717862862700/?ref=share_group_link" target="_blank" className="text-primary">
						جروب عائله الخان
					</Link>
					<i className={`fa ${toggler ? "fa-times" : "fa-bars"}`} onClick={handleToggler} />
				</div>
				<div className={`dropdown ${toggler ? "open" : ""}`}>
					<Link className="option" to="/products" onClick={handleToggler}>
						<i className="fa fa-table" />
						<p className="name">عرض المنتجات</p>
					</Link>
					<Link className="option" to="/products/add-product" onClick={handleToggler}>
						<i className="fa fa-plus" />
						<p className="name">اضافة منتج</p>
					</Link>
					<Link className="option" to="/statistics" onClick={handleToggler}>
						<i className="fas fa-chart-line" />
						<p className="name">الاحصائيات</p>
					</Link>
					<div className="nested-dropdown">
						<span className="option" onClick={handleNested}>
							<p className="name">تعديل الثوابت</p>
							<i className={`fas ${nested ? "fa-angle-down" : "fa-angle-left"}`} />
						</span>
						<div className={`links ${nested ? "" : "hide-height"}`}>
							<Link to="/update/silverTypes" className="option" onClick={handleToggler}>
								<i className="fas fa-ring" />
								<p className="name">نوع الخاتم</p>
							</Link>
							<Link to="/update/gems" className="option" onClick={handleToggler}>
								<i className="far fa-gem" />
								<p className="name">نوع الحجر</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
