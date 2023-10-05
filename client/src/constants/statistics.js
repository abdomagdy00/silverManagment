export const getDate = (calender) => {
	const date = new Date(calender);

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${year}-${+month < 10 ? `0${month}` : month}-${+day < 10 ? `0${day}` : day}`;
};
