import express from "express";
import { CREATE_SALES, GET_SALES } from "../controllers/sales.controller.js";

export const router = express.Router();

router.get("/get-sales", GET_SALES);
router.post("/create-sales", CREATE_SALES);
