import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

// Order creation route
router.post("/", createOrder);

// Get all orders route
router.get("/", getOrders);

export default router;