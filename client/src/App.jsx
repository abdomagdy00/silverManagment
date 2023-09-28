import { Routes, Route } from "react-router-dom";
import { Home, GetProducts, GetProduct, AddProduct, UpdateProduct } from "@/views";
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
		</Routes>
	);
}

export default App;
