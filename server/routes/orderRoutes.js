import express from "express";
import {
  createOrder,
  createStripeSession,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.post("/stripe-checkout", createStripeSession);

export default router;