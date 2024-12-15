import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getAllProductsController, getProductPhotoController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();


// create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// get product
router.get("/get-product/:slug", getProductController);

// get all products
router.get('/all-products', getAllProductsController);

// get photo
router.get('/get-product-photo/:photoId', getProductPhotoController);

// delete product
router.delete("/delete-product/:id", deleteProductController);

export default router