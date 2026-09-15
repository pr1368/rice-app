import express from "express";

import {
  register,
  login,
  adminLogin,
  getMe,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// =========================
// Authentication
// =========================

// ثبت نام
router.post("/register", register);

// ورود کاربر
router.post("/login", login);

// ورود مدیر
router.post("/admin-login", adminLogin);

// =========================
// Password Reset
// =========================

// درخواست بازیابی رمز
router.post(
  "/forgot-password",
  forgotPassword
);

// تغییر رمز با Token
router.post(
  "/reset-password/:token",
  resetPassword
);

// =========================
// Protected
// =========================

// اطلاعات کاربر فعلی
router.get(
  "/me",
  authMiddleware,
  getMe
);

export default router;