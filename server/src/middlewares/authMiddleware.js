import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // ============================================
    // دریافت Authorization Header
    // ============================================

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "توکن احراز هویت ارسال نشده است.",
      });
    }

    // ============================================
    // بررسی Bearer
    // ============================================

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "فرمت توکن نامعتبر است.",
      });
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "توکن معتبر نیست.",
      });
    }

    // ============================================
    // بررسی JWT
    // ============================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "اطلاعات توکن نامعتبر است.",
      });
    }

    // ============================================
    // پیدا کردن کاربر
    // ============================================

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "کاربر پیدا نشد.",
      });
    }

    // ============================================
    // قرار دادن اطلاعات کاربر داخل request
    // ============================================

    req.user = user;

    // برای سازگاری با Controllerهای فعلی
    req.user.userId = user._id;

    // ============================================
    // ادامه درخواست
    // ============================================

    next();
  } catch (error) {
    console.error(
      "======================================"
    );
    console.error(
      "AUTH MIDDLEWARE ERROR"
    );
    console.error(
      "NAME:",
      error.name
    );
    console.error(
      "MESSAGE:",
      error.message
    );
    console.error(
      "======================================"
    );

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "توکن منقضی شده است. دوباره وارد حساب شوید."
          : "توکن نامعتبر است. دوباره وارد حساب شوید.",
    });
  }
};

export default authMiddleware;