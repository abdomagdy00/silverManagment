import { Products, SilverTypes, Gems } from "../model/index.js";

export const GET_DATA = async (req, res) => {
	try {
		const { silverTypes, gems } = req.query;

		if (!silverTypes && gems) {
			const gems = await Gems.find();
			res.status(200).json(gems);
			return;
		}
		if (silverTypes && !gems) {
			const silverTypes = await SilverTypes.find();
			res.status(200).json(silverTypes);
			return;
		}
		if (silverTypes && gems) {
			const silverTypes = await SilverTypes.find();
			const gems = await Gems.find();
			res.status(200).json({ silverTypes, gems });
			return;
		}

		res.status(400).json({ error: "No Query Was Found." });
	} catch (error) {
		res.status(404).json(`GET_SILVER_TYPES: ${error.message}`);
	}
};

export const ADD_SILVER_TYPE = async (req, res) => {
	try {
		const body = req.body;

		const isExist = await SilverTypes.findOne({ name: body.name.trim() });
		if (isExist) return res.status(400).json({ error: "هذا النوع موجود بالفعل" });

		await SilverTypes.create(body);
		res.status(200).json({ success: "لقد تم اضافة نوع الفضه الجديد بنجاح" });
	} catch (error) {
		res.status(404).json(`ADD_SILVER_TYPE: ${error.message}`);
	}
};

export const UPDATE_SILVER_TYPE = async (req, res) => {
	try {
		const body = req.body;
		const { id } = req.params;

		if (!id || !body?.name || !body?.price) return res.status(400).json({ error: `ID And Body Are Required.` });

		const silverType = await SilverTypes.findById(id);
		if (!silverType) return res.status(400).json({ error: "Id Is Not Current." });

		// Update Statics Data
		silverType.price = body.price;
		silverType.name = body.name.trim();
		await silverType.save();

		// Update Products Data
		await Products.updateMany({ silverType: body.prev }, { silverType: body.name.trim(), price: body.price }, { new: true });

		res.status(200).json({ success: `لقد تم تعديل نوع الفضه بنجاح` });
	} catch (error) {
		res.status(404).json(`UPDATE_SILVER_TYPES: ${error.message}`);
	}
};

export const ADD_GEM = async (req, res) => {
	try {
		const body = req.body;

		const isExist = await Gems.findOne({ name: body.name.trim() });
		if (isExist) return res.status(400).json({ error: "هذا النوع موجود بالفعل" });

		await Gems.create(body);
		res.status(200).json({ success: "لقد تم اضافة نوع الفضه الجديد بنجاح" });
	} catch (error) {
		res.status(404).json(`ADD_GEM: ${error.message}`);
	}
};

export const UPDATE_GEM = async (req, res) => {
	try {
		const body = req.body;
		const { id } = req.params;

		if (!id || !body?.prev || !body?.name) return res.status(400).json({ error: `ID And Body Are Required.` });

		const gem = await Gems.findById(id);
		if (!gem) return res.status(400).json({ error: "Id Is Not Current." });

		// Update Statics Data
		gem.name = body.name.trim();
		await gem.save();

		// Update Products Data
		await Products.updateMany({ gem: body.prev }, { gem: body.name.trim() }, { new: true });

		res.status(200).json({ success: `لقد تم تعديل نوع الحجر بنجاح` });
	} catch (error) {
		res.status(404).json(`UPDATE_GEM: ${error.message}`);
	}
};
