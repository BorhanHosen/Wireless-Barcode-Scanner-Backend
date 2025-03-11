import express from "express";
import {
  getProducts,
  addProduct,
  getProductByCode,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/:code", getProductByCode); // Fetch product by productCode

export default router;
