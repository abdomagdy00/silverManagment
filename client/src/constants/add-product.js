import { user } from "@/assets";

export const formState = {
	img: user,
	name: "",
	description: "",
	silverType: "",
	customePrice: { silverType: "", price: "" },
	catagory: "",
	price: "",
	weight: "",
	gem: "",
};

export const silverTypeOptions = [
	{ name: "ايطالي", price: "30" },
	{ name: "تيلاندي", price: "40" },
	{ name: "مصري", price: "50" },
	{ name: "اخري", price: "0" },
];

export const pricesOptions = ["30", "40", "50", "60", "70"];

export const catagoryOptions = ["رجالي", "حريمي"];

export const gemOptions = ["حجر احمر", "حجر ازرق", "حجر طبيعي"];
