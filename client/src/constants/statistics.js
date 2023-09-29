const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

export const calenderState = {
	day: new Date().toLocaleDateString("en-CA"),
	month: `${year}-${month < 10 ? `0${month}` : month}`,
};
