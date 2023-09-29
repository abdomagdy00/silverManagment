import express from "express";
import { GET_PRODUCTS, GET_PRODUCT, GET_TOTAL_PRICE, LIST_BY_KEY } from "../controllers/products.controller.js";
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "../controllers/products.controller.js";

export const router = express.Router();

// GET
router.get("/get-products", GET_PRODUCTS);
router.get("/get-product/:id", GET_PRODUCT);
router.get("/list-by-key", LIST_BY_KEY);
router.get("/get-total-prices", GET_TOTAL_PRICE);

// PORT
router.post("/create-product", CREATE_PRODUCT);

// UPDATE
router.put("/update-product/:id", UPDATE_PRODUCT);

// DELETE
router.delete("/delete-product/:id", DELETE_PRODUCT);
