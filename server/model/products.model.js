import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		img: String,
		name: { type: String, trim: true },
		count: String,
		weight: String,
		catagory: String,
		gem: String,
		silverType: String,
		price: String,
		description: String,
	},
	{ timestamps: true }
);

export const Products = model("products", schema);
