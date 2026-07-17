import express from "express";
import { makePayment } from "../controllers/paymentController.js"; 

const router = express.Router();

router.post("/create-checkout-session", makePayment);

export default router;