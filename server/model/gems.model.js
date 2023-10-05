import { model, Schema } from "mongoose";

const schema = new Schema({
	name: { type: String, trim: true },
});

export const Gems = model("gems", schema);
