import { GET_PRODUCTS } from "@/utilities";

export const Reducer = async (states, action) => {
	const state = await states;

	switch (action.type) {
		case "GET_ALL": {
			let res = await GET_PRODUCTS();
			state.users = res.data;
			return state;
		}
		case "INCREAMENT": {
			state.count += 1;
			return state;
		}
		case "DECREAMENT": {
			state.count -= 1;
			return state;
		}
		default: {
			return state;
		}
	}
};
