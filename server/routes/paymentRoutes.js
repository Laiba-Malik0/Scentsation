// routes/paymentRoutes.js
import express from "express";
import { makePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-intent", makePayment);

export default router;