import express from "express";

import {
  getAdminOrders,
  getAdminOrderById,
} from "../controllers/orderController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ======================================================
// Admin Authentication
// ======================================================

router.use(authMiddleware);
router.use(adminMiddleware);

// ======================================================
// Orders
// ======================================================

// لیست همه سفارش‌ها
router.get("/", getAdminOrders);

// جزئیات یک سفارش
router.get("/:id", getAdminOrderById);

export default router;