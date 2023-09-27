import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/layout";

export const Wrapper = () => {
	return (
		<Fragment>
			<Navbar />
			<Outlet />
		</Fragment>
	);
};
