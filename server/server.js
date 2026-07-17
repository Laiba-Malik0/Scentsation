import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Database Connect
connectDB();

const app = express();

// =======================
// STANDARD CORS CONFIG (Vercel-Optimized)
// =======================
const corsOptions = {
  origin: "https://scentsation-26ai.vercel.app",
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// Note: Local "uploads" folder static serving ko remove kar diya hai,
// kyunki hamari saari images ab Cloudinary ke live CDN links se load hongi!

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
  res.send("Scentsasia API Running on Cloudinary Cloud Storage...");
});

// =======================
// Server Listen
// =======================
const PORT = process.env.PORT || 5000;

// Local testing aur standard cloud hosting ke liye server listen zaroori hai.
// Vercel serverless functions handle karne ke liye is export ko automatic use karega.
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});

export default app;