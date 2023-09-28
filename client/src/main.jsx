import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter } from "react-router-dom";
import { inject } from "@vercel/analytics";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/assets/sass/_index.scss";
import "@/assets/fonts/fontAwasome.css";

if (import.meta.env.MODE === "production") {
	inject();
	disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
