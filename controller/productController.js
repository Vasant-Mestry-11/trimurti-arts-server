import slugify from "slugify";
import Product from "../models/productModel.js"
import fs from 'fs'

export const createProductController = async (req, res) => {
  try {
    const {
      name, slug, description, price, category, quantity, shipping
    } = req.fields;

    const { photo } = req.files;

    // validations
    switch (true) {
      case !name:
        return res.status(500).send({ success: false, error: "Name is required" });
      case !description:
        return res.status(500).send({ success: false, error: "Description is required" });
      case !price:
        return res.status(500).send({ success: false, error: "Price is required" });
      case !category:
        return res.status(500).send({ success: false, error: "Category is required" });
      case !quantity:
        return res.status(500).send({ success: false, error: "Quantity is required" });
      case !shipping:
        return res.status(500).send({ success: false, error: "Shipping address is required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ success: false, error: "Photo is required and should be less than 1mb" });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) })

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      product
    })

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to create product"
    })
  }
}


export const getProductController = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) return res.status(500).send({
      success: false,
      message: "Product slug is required"
    })

    const product = await Product.findOne({
      slug
    }).select('-photo').populate('category');

    if (!product) return res.status(500).send({
      success: false,
      message: "Product doesn't exists"
    });

    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to fetch product"
    })
  }
}

export const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 })
    return res.status(200).send({
      success: true,
      total: products.length,
      products,
      message: "Products fetched successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to fetch products"
    })
  }
}

export const getProductPhotoController = async (req, res) => {
  try {
    const { photoId } = req.params;

    const product = await Product.findById(photoId).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data)
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to fetch product photo"
    })
  }
}

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to delete product"
    })
  }
}

export const updateProductController = async (req, res) => {
  try {
    const {
      name, slug, description, price, category, quantity, shipping
    } = req.fields;

    const { photo } = req.files;

    // validations
    switch (true) {
      case !name:
        return res.status(500).send({ success: false, error: "Name is required" });
      case !description:
        return res.status(500).send({ success: false, error: "Description is required" });
      case !price:
        return res.status(500).send({ success: false, error: "Price is required" });
      case !category:
        return res.status(500).send({ success: false, error: "Category is required" });
      case !quantity:
        return res.status(500).send({ success: false, error: "Quantity is required" });
      case !shipping:
        return res.status(500).send({ success: false, error: "Shipping address is required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ success: false, error: "Photo is required and should be less than 1mb" });
    }

    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, {
      ...req.fields, slug: slugify(name)
    }, { new: true })

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to update product"
    })
  }
}

export const filterProductsController = async (req, res) => {
  try {
    const { checkedCategory, checkedPrice } = req.body;
    let args = {};
    if (checkedCategory.length > 0) args.category = checkedCategory;
    if (checkedPrice.length) args.price = {
      $lte: checkedPrice[1], $gte: checkedPrice[0],
    };

    const products = await Product.find(args);
    return res.status(200).send({
      success: true,
      totalCount: products.length,
      products,
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
      message: "Error in filtering products"
    })
  }
}