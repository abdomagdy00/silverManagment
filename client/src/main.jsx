import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "@/context";
import { inject } from "@vercel/analytics";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "@/assets/sass/_index.scss";
import "@/assets/fonts/fontAwasome.css";

if (import.meta.env.MODE === "production") {
	inject();
	disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ContextProvider>
);
