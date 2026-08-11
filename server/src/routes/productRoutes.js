import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import {
  createProductValidation,
  updateProductValidation,
  productIdValidation,
} from "../validations/productValidation.js";

import validate from "../middlewares/validate.js";

const router = express.Router();

router.get("/", getProducts);

router.get(
  "/:id",
  productIdValidation,
  validate,
  getProductById
);

router.post(
  "/",
  createProductValidation,
  validate,
  createProduct
);

router.put(
  "/:id",
  updateProductValidation,
  validate,
  updateProduct
);

router.delete(
  "/:id",
  productIdValidation,
  validate,
  deleteProduct
);

export default router;