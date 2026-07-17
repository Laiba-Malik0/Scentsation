import Product from "../models/Product.js";

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

    if (req.file) {
      // Kyunki router me 'multer-storage-cloudinary' setup hai, 
      // req.file.path me direct Cloudinary ka live web URL mil jayega!
      imageUrl = req.file.path; 
    }

    // Dono fields (imageUrl aur image) save kar rahe hain taake frontend break na ho
    const product = await Product.create({
      name,
      brand,
      price,
      description,
      category,
      countInStock,
      imageUrl,
      image: imageUrl, 
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
      // Nayi image automatic Cloudinary par upload ho chuki hai, bas url update karein
      product.imageUrl = req.file.path;
      product.image = req.file.path;
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