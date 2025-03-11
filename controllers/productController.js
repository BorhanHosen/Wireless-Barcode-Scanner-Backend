import Product from "../models/Product.js";

// Fetch All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Add a New Product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Invalid Product Data" });
  }
};

// Get Product by Product Code
export const getProductByCode = async (req, res) => {
  try {
    const product = await Product.findOne({ productCode: req.params.code });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
