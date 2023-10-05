import { Sales } from "../model/index.js";

export const updateSales = async (sales, body, product, isNew) => {
	const orderIndex = sales.orders.findIndex((order) => order.name === body.name.trim());
	console.log(orderIndex, +body.count, +product?.count);

	// Increament To Buy
	if (+body.count > +product?.count) {
		if (orderIndex === -1) {
			// Create New Order
			const buy = +body.count - +product.count;
			sales.orders.push({ ...body, count: { buy, sales: "0" } });
			await sales.save();
		} else {
			// Update Order
			sales.orders[orderIndex].count.buy += +body.count - +product.count;
			await sales.save();
		}
	}

	// Increament To Sale
	if (+body.count < +product.count) {
		if (orderIndex === -1) {
			// Create New Order
			const salesCount = +product.count - +body.count;
			sales.orders.push({ ...body, count: { buy: "0", sales: salesCount } });
			await sales.save();
		} else {
			// Update Order
			sales.orders[orderIndex].count.sales += +product.count - +body.count;
			await sales.save();
		}
	}

	// Create New One
	if (isNew) {
		const buy = +body.count;
		sales.orders.push({ ...body, count: { buy, sales: "0" } });
		await sales.save();
	}
};

export const GET_SALES = async (req, res) => {
	try {
		const { day, month } = req.query;

		if (day) {
			const year = day.slice(0, 4);
			const month = day.slice(5, 7);
			const days = day.slice(8, 10);

			const sales = await Sales.findOne({ date: `${+month}/${+days}/${+year}` });
			return res.status(200).json(sales);
		}

		if (month) {
			return;
		}

		const sales = await Sales.find();
		res.status(200).json(sales);
	} catch (error) {
		res.status(404).json(`GET_ANALYSIS: ${error.message}`);
	}
};

export const CREATE_SALES = async (req, res) => {
	try {
		const sale = await Sales.create({ orders: [] });
		res.status(200).json(sale);
	} catch (error) {
		res.status(404).json(`CREATE_SALES: ${error.message}`);
	}
};
