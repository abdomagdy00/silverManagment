import express from "express";
import { GET_SALES, GET_TODAY_SALES } from "../controllers/sales.controller.js";

export const router = express.Router();

router.get("/get-sales", GET_SALES);
router.get("/get-today-sales", GET_TODAY_SALES);
