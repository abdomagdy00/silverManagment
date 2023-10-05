import express from "express";
import { GET_DATA } from "../controllers/statics.controller.js";
import { ADD_SILVER_TYPE, UPDATE_SILVER_TYPE } from "../controllers/statics.controller.js";
import { ADD_GEM, UPDATE_GEM } from "../controllers/statics.controller.js";

export const router = express.Router();

// GET ALL
router.get("/get-data", GET_DATA);

// CREATE
router.post("/add-silverType", ADD_SILVER_TYPE);
router.post("/add-gem", ADD_GEM);

// UPDATE
router.put("/update-silverType/:id", UPDATE_SILVER_TYPE);
router.put("/update-gem/:id", UPDATE_GEM);
