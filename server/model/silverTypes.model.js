import { model, Schema } from "mongoose";

const schema = new Schema({
	name: { type: String, trim: true },
	price: { type: String, trim: true },
});

export const SilverTypes = model("silverTypes", schema);
