import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { categoryController, categoriesController, createCategoryController, deleteCategoryController, updateCategoryController } from '../controller/categoryController.js';

const router = express.Router();

// routes

// create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);


// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// get categories

router.get("/get-all-categories", categoriesController);

// get category

router.get("/get-category/:slug", categoryController);

// delete category

router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router