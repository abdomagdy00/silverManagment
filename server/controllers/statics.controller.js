import { Products } from "../model/index.js";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const __dirname = process.cwd();

const SilverTypes = JSON.parse(readFileSync(join(__dirname, "data", "silverTypes.json"), "utf-8")) || [];
const Gems = JSON.parse(readFileSync(join(__dirname, "data", "gems.json"), "utf-8")) || [];

const updateData = (data, flag) => {
	if (flag === 0) {
		writeFileSync(join(__dirname, "data", "silverTypes.json"), JSON.stringify(data, null, 3));
	}
	if (flag === 1) {
		writeFileSync(join(__dirname, "data", "gems.json"), JSON.stringify(data, null, 3));
	}
};

export const GET_DATA = async (req, res) => {
	try {
		const { silverTypes, gems } = req.query;

		if (!silverTypes && gems) return res.status(200).json(Gems);
		if (silverTypes && !gems) return res.status(200).json(SilverTypes);
		if (silverTypes && gems) return res.status(200).json({ silverTypes: SilverTypes, gems: Gems });

		res.status(400).json({ error: "No Query Was Found." });
	} catch (error) {
		res.status(404).json(`GET_SILVER_TYPES: ${error.message}`);
	}
};

export const ADD_SILVER_TYPE = async (req, res) => {
	try {
		const body = req.body;
		const id = +SilverTypes[SilverTypes.length - 1]?.id;

		const isExist = SilverTypes.some(({ name }) => name === body.name);
		if (isExist) return res.status(400).json({ error: "هذا النوع موجود بالفعل" });

		SilverTypes.push({ id: id ? id + 1 : 1, ...body });
		updateData(SilverTypes, 0);

		res.status(200).json({ success: "لقد تم اضافة نوع الفضه الجديد بنجاح" });
	} catch (error) {
		res.status(404).json(`ADD_SILVER_TYPE: ${error.message}`);
	}
};

export const UPDATE_SILVER_TYPE = async (req, res) => {
	try {
		const body = req.body;
		const { id } = req.params;

		if (!id || !Object.keys(body).length) return res.status(400).json({ error: `ID And Body Are Required.` });

		const index = SilverTypes.findIndex((silverType) => +silverType.id === +id);
		if (index === -1) return res.status(400).json({ error: "Id Is Not Current." });

		// Update Statics Data
		SilverTypes.splice(index, 1, { ...SilverTypes[index], ...body });
		updateData(SilverTypes, 0);

		// Update Products Data
		await Products.updateMany({ silverType: body.name }, { price: body.price }, { new: true });

		res.status(200).json({ success: `لقد تم تعديل نوع الفضه بنجاح` });
	} catch (error) {
		res.status(404).json(`UPDATE_SILVER_TYPES: ${error.message}`);
	}
};

export const ADD_GEM = async (req, res) => {
	try {
		const body = req.body;
		const id = +Gems[Gems.length - 1]?.id;

		const isExist = Gems.some(({ name }) => name === body.name);
		if (isExist) return res.status(400).json({ error: "هذا النوع موجود بالفعل" });

		Gems.push({ id: id ? id + 1 : 1, ...body });
		updateData(Gems, 1);

		res.status(200).json({ success: "لقد تم اضافة نوع الحجر الجديد بنجاح" });
	} catch (error) {
		res.status(404).json(`ADD_GEM: ${error.message}`);
	}
};

export const UPDATE_GEM = async (req, res) => {
	try {
		const body = req.body;
		const { id } = req.params;

		if (!id || !body?.name || !body?.prev) return res.status(400).json({ error: `ID And Body Are Required.` });

		const index = Gems.findIndex((gem) => +gem.id === +id);
		if (index === -1) return res.status(400).json({ error: "Id Is Not Current." });

		// Update Statics Data
		Gems[index].name = body.name;
		console.log(Gems);
		updateData(Gems, 1);

		// Update Products Data
		await Products.updateMany({ gem: body.prev }, { gem: body.name }, { new: true });

		res.status(200).json({ success: `لقد تم تعديل نوع الحجر بنجاح` });
	} catch (error) {
		res.status(404).json(`UPDATE_GEM: ${error.message}`);
	}
};
