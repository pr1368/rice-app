import express from "express";

import {
  createOrder,
  payOrder,
  getMyOrders,
  getMyOrderById,
  cancelOrder,
} from "../controllers/orderController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// تمام مسیرهای سفارش فقط برای کاربر لاگین‌شده
router.use(authMiddleware);

// ایجاد سفارش
router.post("/", createOrder);

// سفارش‌های من
router.get("/", getMyOrders);

// جزئیات سفارش
router.get("/:id", getMyOrderById);

// پرداخت
router.post("/:id/pay", payOrder);

// لغو سفارش
router.patch("/:id/cancel", cancelOrder);

export default router;