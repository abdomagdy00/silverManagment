import mongoose from "mongoose";

export const DBconnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI);
	} catch (error) {
		console.log(`DBconnection: ${error.message}`);
	}
};
