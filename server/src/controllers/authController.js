import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js";

import {
  sendPasswordResetEmail,
} from "../utils/email.js";

// ======================================================
// JWT
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
// USER RESPONSE
// اطلاعاتی که به Frontend برمی‌گردد
// ======================================================

const getUserResponse = (user) => {
  return {
    id: user._id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    email: user.email || "",
    address: user.address || "",
    postalCode: user.postalCode || "",
  };
};

// ======================================================
// VALIDATION
// ======================================================

const isValidPhone = (phone) => {
  return /^09\d{9}$/.test(phone);
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
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

    // -----------------------------------------------
    // بررسی فیلدهای ضروری
    // -----------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "لطفاً تمام اطلاعات ضروری را وارد کنید.",
      });
    }

    // -----------------------------------------------
    // Normalize
    // -----------------------------------------------

    const normalizedFirstName =
      firstName.trim();

    const normalizedLastName =
      lastName.trim();

    const normalizedPhone =
      phone.trim();

    const normalizedEmail =
      email.trim().toLowerCase();

    // -----------------------------------------------
    // Validation
    // -----------------------------------------------

    if (!normalizedFirstName) {
      return res.status(400).json({
        success: false,
        message: "نام را وارد کنید.",
      });
    }

    if (!normalizedLastName) {
      return res.status(400).json({
        success: false,
        message:
          "نام خانوادگی را وارد کنید.",
      });
    }

    if (!isValidPhone(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message:
          "شماره موبایل باید ۱۱ رقم و با 09 شروع شود.",
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "ایمیل معتبر وارد کنید.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      });
    }

    // -----------------------------------------------
    // بررسی کاربر موجود
    // -----------------------------------------------

    const existingUser =
      await User.findOne({
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
        existingUser.phone ===
        normalizedPhone
      ) {
        return res.status(409).json({
          success: false,
          message:
            "این شماره موبایل قبلاً ثبت شده است.",
        });
      }

      return res.status(409).json({
        success: false,
        message:
          "این ایمیل قبلاً ثبت شده است.",
      });
    }

    // -----------------------------------------------
    // Hash password
    // -----------------------------------------------

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    // -----------------------------------------------
    // Create user
    // -----------------------------------------------

    const user =
      await User.create({
        firstName:
          normalizedFirstName,

        lastName:
          normalizedLastName,

        phone:
          normalizedPhone,

        email:
          normalizedEmail,

        password:
          hashedPassword,

        address:
          address?.trim() || "",

        postalCode:
          postalCode?.trim() || "",
      });

    // -----------------------------------------------
    // JWT
    // -----------------------------------------------

    const token =
      generateToken(user._id);

    return res.status(201).json({
      success: true,
      message:
        "ثبت‌نام با موفقیت انجام شد.",
      token,
      user:
        getUserResponse(user),
    });
  } catch (error) {
    console.error(
      "Register error:",
      error
    );

    if (error.code === 11000) {
      const duplicateField =
        Object.keys(
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
      message:
        "ثبت‌نام با خطا مواجه شد.",
    });
  }
};

// ======================================================
// POST /api/auth/login
// ورود
// ======================================================

export const login = async (req, res) => {
  try {
    const {
      phone,
      password,
    } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message:
          "شماره موبایل و رمز عبور الزامی هستند.",
      });
    }

    const normalizedPhone =
      phone.trim();

    const user =
      await User.findOne({
        phone:
          normalizedPhone,
      }).select(
        "+password"
      );

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "شماره موبایل یا رمز عبور اشتباه است.",
      });
    }

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

    const token =
      generateToken(user._id);

    return res.status(200).json({
      success: true,
      message:
        "ورود با موفقیت انجام شد.",
      token,
      user:
        getUserResponse(user),
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "ورود با خطا مواجه شد.",
    });
  }
};

// ======================================================
// GET /api/auth/me
// اطلاعات کاربر فعلی
// ======================================================

export const getMe = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "کاربر پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      user:
        getUserResponse(user),
    });
  } catch (error) {
    console.error(
      "Get me error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "دریافت اطلاعات کاربر با خطا مواجه شد.",
    });
  }
};

// ======================================================
// PUT /api/auth/profile
// ویرایش پروفایل
// ======================================================

export const updateProfile = async (
  req,
  res
) => {
  try {
    // -----------------------------------------------
    // User ID
    // -----------------------------------------------

    const userId =
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "احراز هویت انجام نشده است.",
      });
    }

    // -----------------------------------------------
    // دریافت اطلاعات
    // -----------------------------------------------

    const {
      firstName,
      lastName,
      phone,
      email,
      address = "",
      postalCode = "",
    } = req.body;

    // -----------------------------------------------
    // Validation
    // -----------------------------------------------

    const normalizedFirstName =
      firstName?.trim();

    const normalizedLastName =
      lastName?.trim();

    const normalizedPhone =
      phone?.trim();

    const normalizedEmail =
      email?.trim().toLowerCase();

    if (!normalizedFirstName) {
      return res.status(400).json({
        success: false,
        message:
          "نام را وارد کنید.",
      });
    }

    if (!normalizedLastName) {
      return res.status(400).json({
        success: false,
        message:
          "نام خانوادگی را وارد کنید.",
      });
    }

    if (
      !normalizedPhone ||
      !isValidPhone(
        normalizedPhone
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "شماره موبایل باید ۱۱ رقم و با 09 شروع شود.",
      });
    }

    if (
      !normalizedEmail ||
      !isValidEmail(
        normalizedEmail
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "ایمیل معتبر وارد کنید.",
      });
    }

    // -----------------------------------------------
    // پیدا کردن کاربر فعلی
    // -----------------------------------------------

    const currentUser =
      await User.findById(
        userId
      );

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message:
          "کاربر پیدا نشد.",
      });
    }

    // -----------------------------------------------
    // بررسی شماره موبایل
    // -----------------------------------------------

    const phoneOwner =
      await User.findOne({
        phone:
          normalizedPhone,
      });

    if (
      phoneOwner &&
      phoneOwner._id.toString() !==
        currentUser._id.toString()
    ) {
      return res.status(409).json({
        success: false,
        message:
          "این شماره موبایل قبلاً توسط کاربر دیگری ثبت شده است.",
      });
    }

    // -----------------------------------------------
    // بررسی ایمیل
    // -----------------------------------------------

    const emailOwner =
      await User.findOne({
        email:
          normalizedEmail,
      });

    if (
      emailOwner &&
      emailOwner._id.toString() !==
        currentUser._id.toString()
    ) {
      return res.status(409).json({
        success: false,
        message:
          "این ایمیل قبلاً توسط کاربر دیگری ثبت شده است.",
      });
    }

    // -----------------------------------------------
    // Update
    // -----------------------------------------------

    currentUser.firstName =
      normalizedFirstName;

    currentUser.lastName =
      normalizedLastName;

    currentUser.phone =
      normalizedPhone;

    currentUser.email =
      normalizedEmail;

    currentUser.address =
      address?.trim() || "";

    currentUser.postalCode =
      postalCode?.trim() || "";

    await currentUser.save();

    // -----------------------------------------------
    // Response
    // -----------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "اطلاعات پروفایل با موفقیت به‌روزرسانی شد.",
      user:
        getUserResponse(
          currentUser
        ),
    });
  } catch (error) {
    console.error("");
    console.error(
      "======================================"
    );
    console.error(
      "UPDATE PROFILE ERROR"
    );
    console.error(
      "CODE:",
      error.code
    );
    console.error(
      "MESSAGE:",
      error.message
    );
    console.error(
      "KEY VALUE:",
      error.keyValue
    );
    console.error(
      "======================================"
    );
    console.error("");

    // -----------------------------------------------
    // Duplicate MongoDB
    // -----------------------------------------------

    if (error.code === 11000) {
      const duplicateField =
        Object.keys(
          error.keyPattern || {}
        )[0];

      if (
        duplicateField ===
        "phone"
      ) {
        return res.status(409).json({
          success: false,
          message:
            "این شماره موبایل قبلاً ثبت شده است.",
        });
      }

      if (
        duplicateField ===
        "email"
      ) {
        return res.status(409).json({
          success: false,
          message:
            "این ایمیل قبلاً ثبت شده است.",
        });
      }

      return res.status(409).json({
        success: false,
        message:
          "اطلاعات وارد شده تکراری است.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "به‌روزرسانی پروفایل با خطا مواجه شد.",
    });
  }
};

// ======================================================
// POST /api/auth/forgot-password
// فراموشی رمز
// ایمیل یا شماره موبایل
// ======================================================

export const forgotPassword = async (
  req,
  res
) => {
  try {
    const {
      identifier,
    } = req.body;

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message:
          "لطفاً ایمیل یا شماره موبایل خود را وارد کنید.",
      });
    }

    const value =
      identifier.trim();

    const isPhone =
      isValidPhone(value);

    const isEmail =
      isValidEmail(
        value
      );

    if (!isPhone && !isEmail) {
      return res.status(400).json({
        success: false,
        message:
          "لطفاً یک ایمیل معتبر یا شماره موبایل معتبر وارد کنید.",
      });
    }

    // -----------------------------------------------
    // پیدا کردن کاربر
    // -----------------------------------------------

    let user;

    if (isPhone) {
      user =
        await User.findOne({
          phone: value,
        }).select(
          "+resetPasswordToken +resetPasswordExpires"
        );
    } else {
      user =
        await User.findOne({
          email:
            value.toLowerCase(),
        }).select(
          "+resetPasswordToken +resetPasswordExpires"
        );
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "کاربری با این ایمیل یا شماره موبایل پیدا نشد.",
      });
    }

    // -----------------------------------------------
    // بررسی ایمیل
    // -----------------------------------------------

    if (!user.email) {
      return res.status(400).json({
        success: false,
        message:
          "برای این حساب ایمیل ثبت نشده است.",
      });
    }

    // -----------------------------------------------
    // ساخت Token
    // -----------------------------------------------

    const resetToken =
      crypto
        .randomBytes(32)
        .toString(
          "hex"
        );

    const hashedToken =
      crypto
        .createHash(
          "sha256"
        )
        .update(
          resetToken
        )
        .digest(
          "hex"
        );

    user.resetPasswordToken =
      hashedToken;

    user.resetPasswordExpires =
      new Date(
        Date.now() +
          15 *
            60 *
            1000
      );

    await user.save();

    // -----------------------------------------------
    // Reset URL
    // -----------------------------------------------

    const clientUrl =
      process.env.CLIENT_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    console.log("");
    console.log(
      "======================================"
    );
    console.log(
      "PASSWORD RESET REQUEST"
    );
    console.log(
      "User:",
      user._id
    );
    console.log(
      "Phone:",
      user.phone
    );
    console.log(
      "Email:",
      user.email
    );
    console.log(
      "Reset URL:",
      resetUrl
    );
    console.log(
      "======================================"
    );
    console.log("");

    // -----------------------------------------------
    // ارسال ایمیل
    // -----------------------------------------------

    await sendPasswordResetEmail({
      to: user.email,
      firstName:
        user.firstName,
      resetUrl,
    });

    console.log("");
    console.log(
      "======================================"
    );
    console.log(
      "PASSWORD RESET EMAIL SENT"
    );
    console.log(
      "TO:",
      user.email
    );
    console.log(
      "======================================"
    );
    console.log("");

    return res.status(200).json({
      success: true,
      message:
        "لینک بازیابی رمز عبور به ایمیل شما ارسال شد.",
    });
  } catch (error) {
    console.error("");
    console.error(
      "======================================"
    );
    console.error(
      "FORGOT PASSWORD ERROR"
    );
    console.error(
      "CODE:",
      error.code
    );
    console.error(
      "COMMAND:",
      error.command
    );
    console.error(
      "MESSAGE:",
      error.message
    );
    console.error(
      "======================================"
    );
    console.error("");

    return res.status(500).json({
      success: false,
      message:
        "ارسال لینک بازیابی با خطا مواجه شد.",
    });
  }
};

// ======================================================
// POST /api/auth/reset-password/:token
// تغییر رمز عبور
// ======================================================

export const resetPassword = async (
  req,
  res
) => {
  try {
    const {
      token,
    } = req.params;

    const {
      password,
    } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message:
          "توکن بازیابی وجود ندارد.",
      });
    }

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

    // -----------------------------------------------
    // Hash token
    // -----------------------------------------------

    const hashedToken =
      crypto
        .createHash(
          "sha256"
        )
        .update(
          token
        )
        .digest(
          "hex"
        );

    // -----------------------------------------------
    // Find valid token
    // -----------------------------------------------

    const user =
      await User.findOne({
        resetPasswordToken:
          hashedToken,

        resetPasswordExpires: {
          $gt: new Date(),
        },
      }).select(
        "+password +resetPasswordToken +resetPasswordExpires"
      );

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "لینک بازیابی نامعتبر یا منقضی شده است.",
      });
    }

    // -----------------------------------------------
    // Hash new password
    // -----------------------------------------------

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    user.password =
      hashedPassword;

    // -----------------------------------------------
    // Invalidate reset token
    // لینک فقط یک بار قابل استفاده است
    // -----------------------------------------------

    user.resetPasswordToken =
      null;

    user.resetPasswordExpires =
      null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "رمز عبور با موفقیت تغییر کرد.",
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
    });
  }
};