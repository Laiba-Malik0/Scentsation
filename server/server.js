import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

connectDB();

const app = express();

// =======================
// CORS
// =======================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// =======================
// Upload Folder
// =======================
const uploadDir = path.join(process.cwd(), "uploads");

if (process.env.NODE_ENV !== "production") {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
}

app.use("/uploads", express.static(uploadDir));

// =======================
// Routes
// =======================
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// =======================
// Home
// =======================
app.get("/", (req, res) => {
  res.send("Scentsasia API Running...");
});

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
  });
}

export default app;