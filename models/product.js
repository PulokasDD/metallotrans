import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
  title: { type: String, required: true },
  diameter: { type: Number, required: true },
  quality: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
// import { Schema, model } from 'mongoose';
