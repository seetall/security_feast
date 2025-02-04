import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
// Changed to post for file upload compatibility
router.post("/update/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
