import { useState } from "react";
import "./styles/search.scss";

export const Search = () => {
	const [search, setSearch] = useState("");

	const handleChange = ({ target: { value } }) => setSearch(() => value);

	return (
		<div className="search-section">
			<div className="">
				<input type="search" name="search" placeholder="البحث..." onChange={handleChange} />
				<i className="fa fa-search" />
			</div>
		</div>
	);
};
