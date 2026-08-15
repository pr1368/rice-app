import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js";

// ======================================================
// ساخت JWT
// ======================================================

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ======================================================
// POST /api/auth/register
// ثبت نام
// ======================================================

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      address = "",
      postalCode = "",
    } = req.body;

    // -----------------------------
    // بررسی اطلاعات ضروری
    // -----------------------------

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "لطفاً تمام اطلاعات ضروری را وارد کنید.",
      });
    }

    // -----------------------------
    // نرمال کردن اطلاعات
    // -----------------------------

    const normalizedPhone = phone.trim();

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // -----------------------------
    // اعتبارسنجی شماره موبایل
    // -----------------------------

    if (!/^09\d{9}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل معتبر نیست.",
      });
    }

    // -----------------------------
    // اعتبارسنجی ایمیل
    // -----------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "ایمیل معتبر نیست.",
      });
    }

    // -----------------------------
    // اعتبارسنجی رمز
    // -----------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      });
    }

    // -----------------------------
    // بررسی کاربر تکراری
    // -----------------------------

    const existingUser = await User.findOne({
      $or: [
        {
          phone: normalizedPhone,
        },
        {
          email: normalizedEmail,
        },
      ],
    });

    if (existingUser) {
      if (
        existingUser.phone === normalizedPhone
      ) {
        return res.status(409).json({
          success: false,
          message:
            "این شماره موبایل قبلاً ثبت شده است.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "این ایمیل قبلاً ثبت شده است.",
      });
    }

    // -----------------------------
    // هش کردن رمز
    // -----------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // -----------------------------
    // ساخت کاربر
    // -----------------------------

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: normalizedPhone,
      email: normalizedEmail,
      password: hashedPassword,
      address: address.trim(),
      postalCode: postalCode.trim(),
    });

    // -----------------------------
    // ساخت JWT
    // -----------------------------

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد.",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        postalCode: user.postalCode,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    // -----------------------------
    // خطای unique در MongoDB
    // -----------------------------

    if (error.code === 11000) {
      const duplicateField = Object.keys(
        error.keyPattern || {}
      )[0];

      return res.status(409).json({
        success: false,
        message:
          duplicateField === "phone"
            ? "این شماره موبایل قبلاً ثبت شده است."
            : "این ایمیل قبلاً ثبت شده است.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "ثبت‌نام با خطا مواجه شد.",
      error: error.message,
    });
  }
};

// ======================================================
// POST /api/auth/login
// ورود
// ======================================================

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // -----------------------------
    // بررسی ورودی
    // -----------------------------

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message:
          "شماره موبایل و رمز عبور الزامی هستند.",
      });
    }

    const normalizedPhone = phone.trim();

    // -----------------------------
    // پیدا کردن کاربر
    // password در Schema select:false است
    // -----------------------------

    const user = await User.findOne({
      phone: normalizedPhone,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "شماره موبایل یا رمز عبور اشتباه است.",
      });
    }

    // -----------------------------
    // بررسی رمز
    // -----------------------------

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message:
          "شماره موبایل یا رمز عبور اشتباه است.",
      });
    }

    // -----------------------------
    // ساخت JWT
    // -----------------------------

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "ورود با موفقیت انجام شد.",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        postalCode: user.postalCode,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "ورود با خطا مواجه شد.",
      error: error.message,
    });
  }
};

// ======================================================
// GET /api/auth/me
// اطلاعات کاربر فعلی
// ======================================================

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        postalCode: user.postalCode,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);

    return res.status(500).json({
      success: false,
      message:
        "دریافت اطلاعات کاربر با خطا مواجه شد.",
      error: error.message,
    });
  }
};

// ======================================================
// POST /api/auth/forgot-password
// درخواست بازیابی رمز عبور
// با ایمیل یا شماره موبایل
// ======================================================

export const forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body;

    // -----------------------------
    // بررسی ورودی
    // -----------------------------

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message:
          "لطفاً ایمیل یا شماره موبایل خود را وارد کنید.",
      });
    }

    const value = identifier.trim();

    // -----------------------------
    // تشخیص ایمیل یا شماره موبایل
    // -----------------------------

    const isPhone = /^09\d{9}$/.test(value);

    const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isPhone && !isEmail) {
      return res.status(400).json({
        success: false,
        message:
          "ایمیل یا شماره موبایل واردشده معتبر نیست.",
      });
    }

    // -----------------------------
    // پیدا کردن کاربر
    // -----------------------------

    const user = await User.findOne(
      isPhone
        ? { phone: value }
        : { email: value.toLowerCase() }
    ).select(
      "+resetPasswordToken +resetPasswordExpires"
    );

    /*
      اگر کاربر پیدا نشد، پاسخ عمومی می‌دهیم
      تا مشخص نشود اطلاعات واردشده در سیستم
      وجود دارد یا خیر.
    */

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "اگر اطلاعات واردشده در سیستم ثبت شده باشد، لینک بازیابی ایجاد خواهد شد.",
      });
    }

    // -----------------------------
    // ساخت توکن تصادفی
    // -----------------------------

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // -----------------------------
    // هش کردن Token
    // فقط نسخه هش‌شده در DB ذخیره می‌شود
    // -----------------------------

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // اعتبار لینک: 15 دقیقه
    user.resetPasswordExpires =
      new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    // -----------------------------
    // ساخت لینک بازیابی
    // -----------------------------

    const clientUrl =
      process.env.CLIENT_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    // -----------------------------
    // فعلاً ایمیل ارسال نمی‌کنیم
    // لینک در Terminal نمایش داده می‌شود
    // -----------------------------

    console.log("");
    console.log(
      "=========================================="
    );
    console.log("PASSWORD RESET URL:");
    console.log(resetUrl);
    console.log(
      "=========================================="
    );
    console.log("");

    return res.status(200).json({
      success: true,
      message:
        "اگر اطلاعات واردشده در سیستم ثبت شده باشد، لینک بازیابی ایجاد خواهد شد.",
    });
  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "درخواست بازیابی رمز با خطا مواجه شد.",
      error: error.message,
    });
  }
};

// ======================================================
// POST /api/auth/reset-password/:token
// تغییر رمز عبور
// ======================================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // -----------------------------
    // بررسی Token
    // -----------------------------

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "توکن بازیابی وجود ندارد.",
      });
    }

    // -----------------------------
    // بررسی رمز جدید
    // -----------------------------

    if (!password) {
      return res.status(400).json({
        success: false,
        message:
          "رمز عبور جدید را وارد کنید.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      });
    }

    // -----------------------------
    // هش کردن Token دریافتی
    // -----------------------------

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // -----------------------------
    // پیدا کردن کاربر
    // Token باید معتبر و منقضی نشده باشد
    // -----------------------------

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    }).select(
      "+resetPasswordToken +resetPasswordExpires +password"
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "لینک بازیابی نامعتبر یا منقضی شده است.",
      });
    }

    // -----------------------------
    // هش کردن رمز جدید
    // -----------------------------

    const hashedPassword =
      await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    // -----------------------------
    // حذف Token
    // Token فقط یک بار قابل استفاده است
    // -----------------------------

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "رمز عبور با موفقیت تغییر کرد. اکنون می‌توانید وارد شوید.",
    });
  } catch (error) {
    console.error(
      "Reset password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "تغییر رمز عبور با خطا مواجه شد.",
      error: error.message,
    });
  }
};