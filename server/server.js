import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { products, sales } from "./routes/index.js";
import { corsOrigins, DBconnection } from "./configs/index.js";

// Configs
export const app = express();
dotenv.config();
app.use(cors(corsOrigins));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100kb", parameterLimit: 10000000 }));

// Routes
app.use("/api/products", products);
app.use("/api/sales", sales);
app.use("/*", (req, res) => res.status(200).json({ method: req.method, path: req.url, website: "silver management", message: "This Route Is Not Exist." }));

// Mongodb
DBconnection();
mongoose.connection.on("connected", () => console.log("Database Connected 🚀"));
mongoose.connection.on("disconnected", () => console.log("Database Disconnected 😭"));

app.listen(process.env.PORT || 5000);
