import slugify from "slugify";
import Product from "../models/productModel.js"
import fs from 'fs'

export const createProductController = async (req, res) => {
  // try {
  //   const {
  //     name, slug, description, price, category, quantity, shipping
  //   } = req.fields;

  //   const { photo } = req.files;

  //   // validations
  //   switch (true) {
  //     case !name:
  //       return res.status(500).send({ success: false, error: "Name is required" });
  //     case !slug:
  //       return res.status(500).send({ success: false, error: "Slug is required" });
  //     case !description:
  //       return res.status(500).send({ success: false, error: "Description is required" });
  //     case !price:
  //       return res.status(500).send({ success: false, error: "Price is required" });
  //     case !category:
  //       return res.status(500).send({ success: false, error: "Category is required" });
  //     case !quantity:
  //       return res.status(500).send({ success: false, error: "Quantity is required" });
  //     case !shipping:
  //       return res.status(500).send({ success: false, error: "Shipping address is required" });
  //     case photo && photo.size > 1000000:
  //       return res.status(500).send({ success: false, error: "Photo is required and should be less than 1mb" });
  //   }

  //   const product = new Product({ ...req.fields, slug: slugify(name) })

  //   if (photo) {
  //     product.photo.data = fs.readFileSync(photo.path);
  //     product.photo.contentType = photo.type;
  //   }

  //   await product.save();

  //   return res.status(201).send({
  //     success: true,
  //     message: "Product created successfully",
  //     product
  //   })

  // } catch (error) {
  //   console.log(error)
  //   return res.status(500).send({
  //     success: false,
  //     error,
  //     message: "Failed to create product"
  //   })
  // }
}