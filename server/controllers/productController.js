
import Product from "../models/Product.js";
import multer from 'multer'


export const addProduct = async (req, res) => {



  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.file?.buffer,
    user: req.body.user
  });
  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



export const viewProduct = async (req, res) => {


  try {
    const products = await Product.find(); 
    res.json(products); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const deleteProduct = async (req, res) => {
  const { id } = req.params; 
  try {
    const { deletedCount } = await Product.deleteOne({ _id: id }); 
    if (!deletedCount) { 
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" }); 
  }
};

export const getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const updateproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Product.findByIdAndUpdate(productId, update, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

