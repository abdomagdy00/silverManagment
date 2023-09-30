import { useEffect, useState } from "react";
import { routes } from "@/constants";
import axios from "axios";

let router;
if (import.meta.env.MODE === "development") router = axios.create(routes.locale);
else router = axios.create(routes.remote);

export const useAxios = (method, url, body, options) => {
	const [data, setData] = useState();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [status, setStatus] = useState();

	const fetcher = async (method, url, body, options) => {
		if (!method || url === "/") return;
		try {
			setIsSubmitted(false);
			setLoading(true);
			setError("");

			if (method === "get") {
				const response = await router.get(url, options);
				const data = response.data;
				setData(() => data);
				setStatus(() => response.status);
				return { data, loading: false, error: "", isSubmitted: true, status: response.status };
			} else {
				const response = await router[method](url, body, options);
				const data = response.data;
				setData(() => data);
				setStatus(() => response.status);
				return { data, loading: false, error: "", isSubmitted: true, status: response.status };
			}
		} catch (error) {
			const err = error?.response?.data?.error || error?.message || "Something Has An Error.";
			setError(() => err);
			return { loading: false, error: err, isSubmitted: true, status: response.status };
		} finally {
			setLoading(false);
			setIsSubmitted(true);
		}
	};

	useEffect(() => {
		fetcher(method, url, body, options);
	}, [method, url, body, options]);

	const refetch = async (method, url, body, options) => await fetcher(method, url, body, options);

	return { data, loading, error, isSubmitted, status, refetch };
};
