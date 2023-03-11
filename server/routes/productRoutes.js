import express from "express";
import upload from "../config/multer.js";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  uploadProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("product-photo"), uploadProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
