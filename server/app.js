import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'
dotenv.config();

const router = express.Router();

const upload = multer();

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
const app = express();

mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true });
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

app.use('/api', userRoutes)
app.use('/api/products', productRoutes)

const port = 3002;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
