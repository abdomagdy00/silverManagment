import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import "./styles/search.scss";

export const Search = () => {
	const { data, loading, error } = useAxios("get", "/products/list-by-key?name");
	const [searchResult, setSearchResult] = useState([]);
	const [search, setSearch] = useState("");
	const [toggler, setToggler] = useState(false);
	const navigate = useNavigate();

	const handleChange = ({ target: { value } }) => {
		setSearch(() => value);
		if (!data?.length) return;

		const result = data.map((option) => (option.name.includes(search) ? option : "")).filter((s) => s);
		setSearchResult(() => result);
	};

	const handleOpen = () => {
		setToggler(() => true);
	};

	const handleClose = () => {
		setToggler(() => false);
	};

	const handleNavigate = (id) => {
		setToggler(() => false);
		navigate(`/products/get-product/${id}`);
	};

	return (
		<div className="search-section">
			<div className={`overlay ${toggler ? "" : "hidden"}`} onClick={handleClose} />

			<div className="wrapper">
				<div className={`searchbox ${toggler ? "opened-list" : ""}`}>
					<input type="search" placeholder="البحث..." onChange={handleChange} onFocus={handleOpen} />
					<i className="fa fa-search" />
				</div>

				<div className={`searchlist ${toggler && searchResult.length ? "" : "hidden"}`}>
					{error && <p className="option">{error}</p>}

					{loading && <p className="option">Loading...</p>}

					{searchResult?.map((option, i) => (
						<p key={i} className={`option ${i % 2 ? "" : "bg"}`} onClick={() => handleNavigate(option._id)}>
							{option.name}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};
