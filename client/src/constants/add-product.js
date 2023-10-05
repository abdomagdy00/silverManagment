import { profile } from "@/assets";

export const formState = {
	img: profile,
	name: "",
	count: "",
	description: "",
	silverType: "",
	catagory: "",
	price: "",
	weight: "",
	gem: "",
};

export const silverTypeOptions = [
	{ name: "ايطالي", price: "30" },
	{ name: "تيلاندي", price: "40" },
	{ name: "مصري", price: "50" },
];

export const catagoryOptions = [
	{
		id: 1,
		name: "رجالي",
	},
	{
		id: 2,
		name: "حريمي",
	},
];
