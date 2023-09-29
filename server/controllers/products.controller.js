import mongoose from "mongoose";
import { Products, Sales } from "../model/index.js";
import { updateSales } from "./sales.controller.js";

export const GET_PRODUCTS = async (req, res) => {
	try {
		const { limit, ...query } = req.query;
		const keys = Object.keys(query);

		const products = await Products.find()
			.select(keys)
			.limit(limit || 999);

		const prices = products.map(({ price, count, weight, customePrice: { price: cPrice } }) => (price === "none" ? +cPrice * +count * +weight : +price * +count * +weight)) || [];
		const total = prices.reduce((prev, cur) => prev + cur, 0);

		res.status(200).json({ count: products.length, totalPrice: total || 0, result: products });
	} catch (error) {
		res.status(404).json(`GET_PRODUCTS: ${error.message}`);
	}
};

export const GET_PRODUCT = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) return res.status(400).json({ error: "يجب ادخال Id الخاص بالمنتج" });

		const product = await Products.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(404).json(`GET_PRODUCT: ${error.message}`);
	}
};

export const GET_TOTAL_PRICE = async (req, res) => {
	try {
		// Products Price
		const products = await Products.find();
		const prices = products.map(({ price, count, weight, customePrice: { price: cPrice } }) => (price === "none" ? +cPrice * count * +weight : +price * count * +weight)) || [];
		const productPrices = prices.reduce((prev, cur) => prev + cur, 0);

		// Today Sales
		const sales = await Sales.findOne({ date: new Date().toLocaleDateString("en-CA") });
		if (sales) {
			const orders = sales?.orders.map(({ price, weight, count, customePrice: { price: cPrice } }) => (price === "none" ? +cPrice * +weight * +count.sales : +price * +weight * +count.sales));
			const salePrices = orders.reduce((prev, cur) => +prev + +cur, 0);
			res.status(200).json({ productPrices, salePrices });
		} else {
			res.status(200).json({ productPrices, salePrices: 0 });
		}
	} catch (error) {
		res.status(404).json(`GET_PRICE: ${error.message}`);
	}
};

export const LIST_BY_KEY = async (req, res) => {
	try {
		const [key] = Object.keys(req.query);
		if (!key) return res.status(400).json({ error: "يجب ادخال نوع واحد علي الاقل" });

		const products = await Products.find().select(key);

		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(`LIST_OF_Types: ${error.message}`);
	}
};

export const CREATE_PRODUCT = async (req, res) => {
	try {
		const product = await Products.findOne({ name: req.body.name.trim() });
		if (product) return res.status(400).json({ error: "هذا المنتج موجود بالفعل" });

		// Add Products
		await Products.create(req.body);

		// Update Analysis
		const sales = await Sales.findOne({ date: new Date().toLocaleDateString("en-CA") });
		if (!sales) {
			await Sales.create({ orders: [] });
			const sales = await Sales.findOne({ date: new Date().toLocaleDateString("en-CA") });
			const _product = await Products.findOne({ name: req.body.name.trim() });
			await updateSales(sales, req.body, _product);
		} else {
			const _product = await Products.findOne({ name: req.body.name.trim() });
			await updateSales(sales, req.body, _product);
		}

		// Response
		res.status(200).json({ success: "تم اضافه المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_PRODUCT: ${error.message}`);
	}
};

export const UPDATE_PRODUCT = async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "هذا Id غير صحيح." });

		// Check
		const product = await Products.findOne({ name: body.name });
		if (!product) return res.status(400).json({ error: "لم يتم العثور علي المنتج" });

		// Update Products
		await Products.findByIdAndUpdate(id, body, { new: true });

		// Update Analysis
		let sales = await Sales.findOne({ date: new Date().toLocaleDateString("en-CA") });
		if (!sales) {
			await Sales.create({ orders: [] });
			let _sales = await Sales.findOne({ date: new Date().toLocaleDateString("en-CA") });
			_sales && (await updateSales(_sales, body, product));
		} else {
			await updateSales(sales, body, product);
		}

		res.status(200).json({ success: "تم تعديل المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_PRODUCT: ${error.message}`);
	}
};

export const DELETE_PRODUCT = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "هذا Id غير صحيح." });

		const product = await Products.findById(id);
		if (!product) return res.status(400).json({ error: "لم يتم العثور علي المنتج" });

		// Delete Product
		await Products.findByIdAndDelete(id);

		// Update Analysis
		const sales = await Sales.findOne({ date: new Date().toLocaleDateString("en-CA") });
		updateSales(sales, product, product);

		res.status(200).json({ success: "تم حذف المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_PRODUCT: ${error.message}`);
	}
};
