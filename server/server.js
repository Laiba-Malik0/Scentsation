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
// IMPROVED CORS CONFIG (Vercel-Friendly)
// =======================
const allowedOrigins = [
  "https://scentsation-26ai.vercel.app",
  "https://scentsation-self.vercel.app", // Aapka backend URL (safety ke liye)
  "http://localhost:5173",                 // Local testing ke liye
];

const corsOptions = {
  origin: function (origin, callback) {
    // Agar request same server se ho (no origin, e.g. Postman) ya allowed list me ho
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200 // Legacy browsers (IE11, etc.) ke liye 200 behtar hai 204 se
};

app.use(cors(corsOptions));

// Pre-flight requests (OPTIONS) ko handle karne ke liye middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});

export default app;