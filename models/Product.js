import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  membership: { type: String },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
