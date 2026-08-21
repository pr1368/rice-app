import express from "express";

import {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================================================
// Authentication
// ======================================================

// ثبت نام
router.post("/register", register);

// ورود
router.post("/login", login);

// ======================================================
// Profile
// ======================================================

// اطلاعات کاربر فعلی
router.get(
  "/me",
  authMiddleware,
  getMe
);

// ویرایش پروفایل
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// ======================================================
// Password Reset
// ======================================================

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

export default router;