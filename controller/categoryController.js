import slugify from "slugify";
import Category from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(401).send({ message: 'Name is required' })

    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res.status(200).send({ success: true, message: 'Category already exists' })
    }

    const category = await new Category({ name, slug: slugify(name) }).save()
    res.status(201).send({
      success: true,
      message: "New category created",
      category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Category'
    })
  }
}


export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to update category"
    })
  }
}

export const categoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).send({
      success: true,
      categories,
      message: "Categories fetched successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to get categories"
    })
  }
}

export const categoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug })

    return res.status(200).send({
      success: true,
      category,
      message: 'Category fetched successfully'
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to get catgory"
    })
  }
}

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category delete successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to delete category"
    })
  }
}