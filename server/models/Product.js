import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: Buffer,
  user: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;


