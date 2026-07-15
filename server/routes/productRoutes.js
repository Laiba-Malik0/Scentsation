import express from "express";
import multer from "multer";
import path from "path";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// =======================
// Multer Configuration
// =======================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// =======================
// Routes
// =======================

// Get All Products
router.get("/", getProducts);

// Add Product
router.post(
  "/",
  upload.single("image"),
  createProduct
);

// Update Product
router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;