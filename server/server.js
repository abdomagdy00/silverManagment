import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { products } from "./routes/index.js";
import { DBconnection } from "./configs/index.js";

// Configs
export const app = express();
dotenv.config();
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/products", products);
app.use("/*", (req, res) => res.status(200).json({ method: req.method, path: req.url, website: "silver management", message: "This Route Is Not Exist." }));

// Mongodb
DBconnection();
mongoose.connection.on("connected", () => console.log(`Server Running On [http://localhost:${process.env.PORT}] 🚀`));
mongoose.connection.on("disconnected", () => console.log(`Server Disabled`));

// app.listen(process.env.PORT);
