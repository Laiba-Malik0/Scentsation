import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary"; // Cloudinary import kiya

// =======================
// Get All Products
// =======================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Create Product
// =======================
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      description,
      category,
      countInStock,
    } = req.body;

    let imageUrl = "";

    // Agar user ne local system se image send ki hai
    if (req.file) {
      // Image ko direct Cloudinary par upload kar rahe hain
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "scentsation_products", // Cloudinary par is folder me save hoga
      });
      
      // Cloudinary se mila hua secure HTTPS web link url me save karein
      imageUrl = result.secure_url; 
    }

    // Kuch frontends par image schema me 'image' field hoti hai aur kuch me 'imageUrl'
    // Hum safe side rehne ke liye dono keys ko database me create karte hain taake frontend broken na ho!
    const product = await Product.create({
      name,
      brand,
      price,
      description,
      category,
      countInStock,
      imageUrl, // Purana field standard
      image: imageUrl, // Frontend safety ke liye direct 'image' field bhi populate kar rahe hain
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// =======================
// Update Product
// =======================
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    product.name = req.body.name || product.name;
    product.brand = req.body.brand || product.brand;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;

    if (req.file) {
      // Agar update karte waqt nayi image aayi hai to use bhi Cloudinary par upload karenge
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "scentsation_products",
      });
      
      product.imageUrl = result.secure_url;
      product.image = result.secure_url; // Dono fields update karenge
    }

    const updated = await product.save();
    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Delete Product
// =======================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};