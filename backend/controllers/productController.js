import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !stock ||
    !req.files ||
    !req.files.imageFile
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter all required fields and upload an image",
    });
  }

  try {
    const image = req.files.imageFile;
    const imageExtension = path.extname(image.name);
    const imageName = `${Date.now()}${imageExtension}`;
    const imagePath = path.join(__dirname, "..", "uploads", imageName);

    // yesle image save garxa
    await fs.writeFile(imagePath, image.data);

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: `/uploads/${imageName}`,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update text fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    // Handle image update
    if (req.files && req.files.imageFile) {
      const image = req.files.imageFile;
      const imageExtension = path.extname(image.name);
      const imageName = `${Date.now()}${imageExtension}`;
      const imagePath = path.join(__dirname, "..", "uploads", imageName);

      // Delete old image if it exists
      if (product.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", product.imageUrl);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }

      // Save the new image
      await fs.writeFile(imagePath, image.data);
      product.imageUrl = `/uploads/${imageName}`;
    }

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a gift card
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Gift card not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gift card deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all gift cards
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get a single gift card by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Gift card not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
