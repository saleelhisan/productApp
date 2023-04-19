import express from "express";
import multer from 'multer';
import { addProduct, viewProduct, deleteProduct, getProduct, updateproduct } from "../controllers/productController.js";
import { verifyUser } from '../middlewares/index.js'

const router = express.Router();
const upload = multer();

router.post('/', verifyUser, upload.single('image'), addProduct)
router.get('/', verifyUser, viewProduct);
router.patch('/:id', verifyUser, updateproduct)
router.get('/:id', verifyUser, getProduct);
router.delete('/:id', verifyUser, deleteProduct);

export default router;