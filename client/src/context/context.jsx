import { createContext, useMemo, useContext as ReactContext, useReducer } from "react";
import { initialStates } from "./states";
import { Reducer } from "./users/reducer";

let context = createContext(initialStates);

export const ContextProvider = ({ children }) => {
	let [state, dispatch] = useReducer(Reducer, initialStates);
	let value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
	return <context.Provider value={value}>{children}</context.Provider>;
};

const useContext = () => {
	return ReactContext(context);
};
export default useContext;
