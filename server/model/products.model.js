import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		img: String,
		name: String,
		description: String,
		silverType: String,
		customePrice: { silverType: String, price: String },
		catagory: String,
		price: String,
		weight: String,
		gem: String,
	},
	{ timestamps: true }
);

export const Products = model("products", schema);
