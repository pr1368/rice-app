const adminMiddleware = (req, res, next) => {
  try {
    // ============================================
    // بررسی ورود کاربر
    // ============================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "احراز هویت انجام نشده است.",
      });
    }

    // ============================================
    // بررسی نقش کاربر
    // ============================================

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "دسترسی به این بخش فقط برای مدیر مجاز است.",
      });
    }

    // ============================================
    // ادامه درخواست
    // ============================================

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "خطا در بررسی دسترسی مدیر.",
    });
  }
};

export default adminMiddleware;