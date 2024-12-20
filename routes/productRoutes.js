import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, filterProductsController, getProductController, getAllProductsController, getProductPhotoController, updateProductController } from '../controller/productController.js';
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

// update product
router.put("/update-product/:productId", requireSignIn, isAdmin, formidable(), updateProductController)

// delete product
router.delete("/delete-product/:id", deleteProductController);

// filter produts
router.post("/filter-products", filterProductsController)

export default router