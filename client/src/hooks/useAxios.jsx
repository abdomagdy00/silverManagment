import { useEffect, useState } from "react";
import { routes } from "@/constants";
import axios from "axios";

const router = axios.create(routes.locale);

export const useAxios = (method, url, body, options) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [status, setStatus] = useState();

	const fetcher = async (method, url, body, options) => {
		if (!method || url === "/") return;
		try {
			setIsSubmitted(false);
			setLoading(false);
			setError("");

			if (method === "get") {
				const response = await router.get(url, options);
				const data = response.data;
				setData(() => data);
				setStatus(() => response.status);
				return { data, loading: false, error: false, isSubmitted: true, status: response.status };
			} else {
				const response = await router[method](url, body, options);
				const data = response.data;
				setData(() => data);
				setStatus(() => response.status);
				return { data, loading: false, error: false, isSubmitted: true, status: response.status };
			}
		} catch (error) {
			setError(error?.response?.data?.error || error?.message || "Something Has An Error.");
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
