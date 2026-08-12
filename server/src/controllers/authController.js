import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

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

// POST /api/auth/register
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

    // بررسی اطلاعات ضروری
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

    // اعتبارسنجی شماره موبایل
    if (!/^09\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل معتبر نیست.",
      });
    }

    // اعتبارسنجی رمز
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      });
    }

    // بررسی ایمیل
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [
        { phone },
        { email: normalizedEmail },
      ],
    });

    if (existingUser) {
      if (existingUser.phone === phone) {
        return res.status(409).json({
          success: false,
          message: "این شماره موبایل قبلاً ثبت شده است.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "این ایمیل قبلاً ثبت شده است.",
      });
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 12);

    // ساخت کاربر
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      address: address.trim(),
      postalCode: postalCode.trim(),
    });

    // ساخت JWT
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

    // خطای unique در MongoDB
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

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل و رمز عبور الزامی هستند.",
      });
    }

    // چون password در Schema select:false است
    // باید صراحتاً آن را دریافت کنیم.
    const user = await User.findOne({ phone }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "شماره موبایل یا رمز عبور اشتباه است.",
      });
    }

    // بررسی رمز
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "شماره موبایل یا رمز عبور اشتباه است.",
      });
    }

    // ساخت JWT
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

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

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
      message: "دریافت اطلاعات کاربر با خطا مواجه شد.",
      error: error.message,
    });
  }
};