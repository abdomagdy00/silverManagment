import { model, Schema } from "mongoose";

export const getDate = (calender) => {
	const date = new Date(calender);

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${year}-${+month < 10 ? `0${month}` : month}-${+day < 10 ? `0${day}` : day}`;
};

const schema = new Schema({
	date: { type: String, default: getDate(new Date()) },
	orders: [
		{
			name: { type: String, trim: true },
			count: { buy: Number, sales: Number },
			weight: String,
			catagory: String,
			gem: String,
			silverType: String,
			price: String,
		},
	],
});

export const Sales = model("sales", schema);
