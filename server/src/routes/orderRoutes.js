
import express from "express";

import {
  createOrder,
  payOrder,
  getMyOrders,
  getMyOrderById,
  cancelOrder,
  getAdminOrders,
  getAdminOrderById,
} from "../controllers/orderController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ======================================================
// احراز هویت
// تمام مسیرهای این Router نیاز به ورود کاربر دارند
// ======================================================

router.use(authMiddleware);

// ======================================================
// مسیرهای مدیریت سفارش‌ها
// ======================================================

// دریافت همه سفارش‌ها
// GET /api/orders/admin/all
router.get(
  "/admin/all",
  adminMiddleware,
  getAdminOrders
);

// دریافت جزئیات یک سفارش برای مدیر
// GET /api/orders/admin/:id
router.get(
  "/admin/:id",
  adminMiddleware,
  getAdminOrderById
);

// ======================================================
// مسیرهای کاربر
// ======================================================

// ایجاد سفارش
// POST /api/orders
router.post("/", createOrder);

// دریافت سفارش‌های کاربر
// GET /api/orders
router.get("/", getMyOrders);

// پرداخت سفارش
// POST /api/orders/:id/pay
router.post("/:id/pay", payOrder);

// لغو سفارش
// PATCH /api/orders/:id/cancel
router.patch("/:id/cancel", cancelOrder);

// دریافت جزئیات یک سفارش کاربر
// GET /api/orders/:id
router.get("/:id", getMyOrderById);

export default router;
