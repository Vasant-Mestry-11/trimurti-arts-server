import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, getProductController, getAllProductsController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();


// create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// get product
router.get("/get-product/:id", getProductController);

// get all products
router.get('/all-products', getAllProductsController);

export default router