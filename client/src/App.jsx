import { Routes, Route } from "react-router-dom";
import { Home, GetProducts, GetProduct, AddProduct, UpdateProduct, Statistics } from "@/views";
import { UpdateSilverTypes, UpdateGems } from "@/components";
import { Wrapper } from "@/layout";

function App() {
	return (
		<Routes>
			<Route path="*" element="Route Not Defined" />
			<Route path="/" element={<Wrapper />}>
				<Route index element={<Home />} />
			</Route>

			<Route path="/products" element={<Wrapper />}>
				<Route index element={<GetProducts />} />
				<Route path="get-product/:id" element={<GetProduct />} />
				<Route path="add-product" element={<AddProduct />} />
				<Route path="update-product" element={<UpdateProduct />} />
			</Route>

			<Route path="/statistics" element={<Wrapper />}>
				<Route index element={<Statistics />} />
			</Route>

			<Route path="/update" element={<Wrapper />}>
				<Route path="silverTypes" element={<UpdateSilverTypes />} />
				<Route path="gems" element={<UpdateGems />} />
			</Route>
		</Routes>
	);
}

export default App;
