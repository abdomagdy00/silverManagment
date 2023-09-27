import mongoose from "mongoose";
import { Products } from "../model/products.model.js";

export const GET_PRODUCTS = async (req, res) => {
	try {
		const products = await Products.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(`GET_PRODUCTS: ${error.message}`);
	}
};

export const GET_PRODUCT = async (req, res) => {
	try {
		if (!req.body) return res.status(400).json({ error: "يجب ادخال التفاصيل المطلوبه للمنتج." });

		const product = await Products.find(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(404).json(`GET_PRODUCT: ${error.message}`);
	}
};

export const LIST_By_KEY = async (req, res) => {
	try {
		const [key] = Object.keys(req.query);
		if (!key) return res.status(400).json({ error: "يجب ادخال نوع واحد علي الاقل" });

		const _products = await Products.find().select(key);

		const products = _products.reduce((prev, cur) => prev.concat(cur[key]), []);

		res.status(200).json(Array.from(new Set(products)));
	} catch (error) {
		res.status(404).json(`LIST_OF_Types: ${error.message}`);
	}
};

export const CREATE_PRODUCT = async (req, res) => {
	try {
		await Products.create(req.body);
		res.status(200).json({ success: "تم اضافه المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_PRODUCT: ${error.message}`);
	}
};

export const UPDATE_PRODUCT = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "هذا Id غير صحيح." });

		await Products.findByIdAndUpdate(id, req.body, { new: true });
		res.status(200).json({ success: "تم تعديل المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_PRODUCT: ${error.message}`);
	}
};

export const DELETE_PRODUCT = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "هذا Id غير صحيح." });

		await Products.findByIdAndDelete(id);
		res.status(200).json({ success: "تم حذف المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_PRODUCT: ${error.message}`);
	}
};
