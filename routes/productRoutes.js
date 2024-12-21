import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  filterProductsController,
  getProductController,
  getAllProductsController,
  getProductPhotoController,
  productCountController,
  productsPerPageController,
  searchProductController,
  relatedProductsController,
  updateProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get product
router.get("/get-product/:slug", getProductController);

// get all products
router.get("/all-products", getAllProductsController);

// get photo
router.get("/get-product-photo/:photoId", getProductPhotoController);

// update product
router.put(
  "/update-product/:productId",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// delete product
router.delete("/delete-product/:id", deleteProductController);

// filter produts
router.post("/filter-products", filterProductsController);

// count products
router.get("/product-count", productCountController);

// get products per page
router.get("/products-per-page/:page", productsPerPageController)

// search products
router.get("/search-products/:keywords", searchProductController);

// similar products
router.get('/related-products/:productId/:categoryId', relatedProductsController)
export default router;
