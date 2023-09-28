import { Sales } from "../model/index.js";

export const updateSales = async (sales, body, product) => {
	const orderIndex = sales.orders.findIndex((order) => order.name === body.name.trim());
	// Increament Buy
	console.log(+body.count > +product.count);
	if (+body.count > +product.count) {
		if (orderIndex !== -1) {
			// Update Order
			sales.orders[orderIndex].count.buy += +body.count - +product.count;
			await sales.save();
		} else {
			// Create New Order
			const buy = +body.count - +product.count;
			sales.orders.push({ ...body, count: { buy, sales: "0" } });
			await sales.save();
		}
	}

	// Increament Sales
	if (+body.count < +product.count) {
		if (orderIndex !== -1) {
			// Update Order
			sales.orders[orderIndex].count.sales += +product.count - +body.count;
			await sales.save();
		} else {
			// Create New Order
			const salesCount = +product.count - +body.count;
			sales.orders.push({ ...body, count: { buy: "0", sales: salesCount } });
			await sales.save();
		}
	}
};

export const GET_SALES = async (req, res) => {
	try {
		const sales = await Sales.find();
		res.status(200).json(sales);
	} catch (error) {
		res.status(404).json(`GET_ANALYSIS: ${error.message}`);
	}
};

export const GET_TODAY_SALES = async (req, res) => {
	try {
		const sales = await Sales.findOne({ date: new Date().toLocaleDateString() });
		const orders = sales.orders.map(({ price, weight, count, customePrice: { price: cPrice } }) => (price === "none" ? +cPrice * +weight * count.sales : +price * +weight * count.sales));
		const total = orders.reduce((prev, cur) => +prev + +cur, 0);
		res.status(200).json(total);
	} catch (error) {
		res.status(404).json(`GET_TODAY_SALES: ${error.message}`);
	}
};
