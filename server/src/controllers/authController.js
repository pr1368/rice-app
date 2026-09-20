import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js";
import { sendPasswordResetEmail } from "../utils/email.js";

// ======================================================
// Helpers
// ======================================================

const isValidPhone = (phone) => {
  return /^09\d{9}$/.test(phone);
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const generateToken = (userId, role = "user") => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(
    {
      userId: userId.toString(),
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const getUserResponse = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  email: user.email,
  address: user.address || "",
  postalCode: user.postalCode || "",
  role: user.role || "user",
});

// ======================================================
// REGISTER
// POST /api/auth/register
// ======================================================

export const register = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      postalCode,
    } = body;

    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "تمام فیلدهای الزامی را تکمیل کنید.",
      });
    }

    const normalizedPhone = String(phone).trim();
    const normalizedEmail = String(email).trim().toLowerCase();

    if (!isValidPhone(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل معتبر نیست.",
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "ایمیل معتبر نیست.",
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { phone: normalizedPhone },
        { email: normalizedEmail },
      ],
    });

    if (existingUser) {
      if (existingUser.phone === normalizedPhone) {
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

    const hashedPassword = await bcrypt.hash(
      String(password),
      12
    );

    const user = await User.create({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      phone: normalizedPhone,
      email: normalizedEmail,
      password: hashedPassword,
      address: String(address || "").trim(),
      postalCode: String(postalCode || "").trim(),
      role: "user",
    });

    const token = generateToken(
      user._id,
      user.role
    );

    return res.status(201).json({
      success: true,
      message: "ثبت نام با موفقیت انجام شد.",
      token,
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "شماره موبایل یا ایمیل قبلاً ثبت شده است.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "ثبت نام با خطا مواجه شد.",
    });
  }
};

// ======================================================
// LOGIN
// POST /api/auth/login
// ======================================================

export const login = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      phone,
      password,
    } = body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل و رمز عبور الزامی هستند.",
      });
    }

    const normalizedPhone = String(phone).trim();

    if (!isValidPhone(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل معتبر نیست.",
      });
    }

    const user = await User.findOne({
      phone: normalizedPhone,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "شماره موبایل یا رمز عبور اشتباه است.",
      });
    }

    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "رمز عبور کاربر در سرور موجود نیست.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      String(password),
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "شماره موبایل یا رمز عبور اشتباه است.",
      });
    }

    const token = generateToken(
      user._id,
      user.role
    );

    return res.status(200).json({
      success: true,
      message: "ورود با موفقیت انجام شد.",
      token,
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "ورود با خطا مواجه شد.",
    });
  }
};

// ======================================================
// ADMIN LOGIN
// POST /api/auth/admin-login
// ======================================================

export const adminLogin = async (req, res) => {
  console.log("======================================");
  console.log("ADMIN LOGIN START");

  try {
    const body = req.body || {};

    console.log("REQUEST BODY EXISTS:", Boolean(req.body));
    console.log(
      "REQUEST CONTENT TYPE:",
      req.headers["content-type"]
    );

    const {
      phone,
      password,
    } = body;

    console.log("PHONE:", phone);
    console.log(
      "PASSWORD RECEIVED:",
      Boolean(password)
    );

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    if (!phone || !password) {
      console.log("ADMIN LOGIN: MISSING CREDENTIALS");

      return res.status(400).json({
        success: false,
        message: "شماره موبایل و رمز عبور الزامی هستند.",
      });
    }

    const normalizedPhone = String(phone).trim();

    console.log(
      "NORMALIZED PHONE:",
      normalizedPhone
    );

    if (!isValidPhone(normalizedPhone)) {
      console.log("ADMIN LOGIN: INVALID PHONE");

      return res.status(400).json({
        success: false,
        message: "شماره موبایل معتبر نیست.",
      });
    }

    // --------------------------------------------------
    // Find user
    // --------------------------------------------------

    console.log("FINDING ADMIN USER...");

    const user = await User.findOne({
      phone: normalizedPhone,
    }).select("+password");

    console.log(
      "USER FOUND:",
      Boolean(user)
    );

    if (!user) {
      console.log("ADMIN LOGIN: USER NOT FOUND");

      return res.status(401).json({
        success: false,
        message: "اطلاعات ورود مدیر نادرست است.",
      });
    }

    console.log(
      "USER ID:",
      user._id.toString()
    );

    console.log(
      "USER ROLE:",
      user.role
    );

    console.log(
      "PASSWORD EXISTS:",
      Boolean(user.password)
    );

    // --------------------------------------------------
    // Password
    // --------------------------------------------------

    if (!user.password) {
      console.log(
        "ADMIN LOGIN: PASSWORD NOT FOUND"
      );

      return res.status(500).json({
        success: false,
        message:
          "رمز عبور کاربر در سرور موجود نیست.",
      });
    }

    console.log(
      "START BCRYPT COMPARE"
    );

    let passwordCorrect = false;

    try {
      passwordCorrect = await bcrypt.compare(
        String(password),
        user.password
      );
    } catch (bcryptError) {
      console.error(
        "ADMIN BCRYPT ERROR"
      );

      console.error(
        "NAME:",
        bcryptError.name
      );

      console.error(
        "MESSAGE:",
        bcryptError.message
      );

      return res.status(500).json({
        success: false,
        message:
          "خطا در بررسی رمز عبور.",
      });
    }

    console.log(
      "BCRYPT RESULT:",
      passwordCorrect
    );

    if (!passwordCorrect) {
      console.log(
        "ADMIN LOGIN: WRONG PASSWORD"
      );

      return res.status(401).json({
        success: false,
        message:
          "اطلاعات ورود مدیر نادرست است.",
      });
    }

    console.log(
      "ADMIN PASSWORD CORRECT"
    );

    // --------------------------------------------------
    // Role
    // --------------------------------------------------

    if (user.role !== "admin") {
      console.log(
        "ADMIN LOGIN: ROLE DENIED:",
        user.role
      );

      return res.status(403).json({
        success: false,
        message:
          "شما دسترسی ورود به پنل مدیریت را ندارید.",
      });
    }

    console.log(
      "ADMIN ROLE CHECK PASSED"
    );

    // --------------------------------------------------
    // JWT
    // --------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error(
        "ADMIN LOGIN: JWT_SECRET NOT SET"
      );

      return res.status(500).json({
        success: false,
        message:
          "تنظیمات احراز هویت سرور کامل نیست.",
      });
    }

    console.log(
      "JWT_SECRET: SET"
    );

    let token;

    try {
      token = generateToken(
        user._id,
        user.role
      );
    } catch (jwtError) {
      console.error(
        "ADMIN JWT ERROR"
      );

      console.error(
        "NAME:",
        jwtError.name
      );

      console.error(
        "MESSAGE:",
        jwtError.message
      );

      return res.status(500).json({
        success: false,
        message:
          "خطا در ساخت توکن ورود.",
      });
    }

    console.log(
      "JWT GENERATED"
    );

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    const responseUser = getUserResponse(user);

    console.log(
      "USER RESPONSE CREATED"
    );

    console.log(
      "ADMIN LOGIN SUCCESS"
    );

    console.log(
      "======================================"
    );

    return res.status(200).json({
      success: true,
      message:
        "ورود مدیر با موفقیت انجام شد.",
      token,
      user: responseUser,
    });
  } catch (error) {
    console.error(
      "======================================"
    );

    console.error(
      "ADMIN LOGIN UNEXPECTED ERROR"
    );

    console.error(
      "NAME:",
      error.name
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
      "STACK:",
      error.stack
    );

    console.error(
      "======================================"
    );

    return res.status(500).json({
      success: false,
      message:
        "ورود به پنل مدیریت با خطا مواجه شد.",
    });
  }
};

// ======================================================
// GET ME
// GET /api/auth/me
// ======================================================

export const getMe = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message:
          "کاربر احراز هویت نشده است.",
      });
    }

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error(
      "GET ME ERROR:",
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
// UPDATE PROFILE
// PUT /api/auth/profile
// ======================================================

export const updateProfile = async (
  req,
  res
) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message:
          "کاربر احراز هویت نشده است.",
      });
    }

    const body = req.body || {};

    const {
      firstName,
      lastName,
      email,
      address,
      postalCode,
    } = body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد.",
      });
    }

    if (firstName !== undefined) {
      user.firstName =
        String(firstName).trim();
    }

    if (lastName !== undefined) {
      user.lastName =
        String(lastName).trim();
    }

    if (email !== undefined) {
      const normalizedEmail =
        String(email)
          .trim()
          .toLowerCase();

      if (!isValidEmail(normalizedEmail)) {
        return res.status(400).json({
          success: false,
          message:
            "ایمیل معتبر نیست.",
        });
      }

      const existingEmail =
        await User.findOne({
          email: normalizedEmail,
          _id: {
            $ne: user._id,
          },
        });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message:
            "این ایمیل قبلاً ثبت شده است.",
        });
      }

      user.email =
        normalizedEmail;
    }

    if (address !== undefined) {
      user.address =
        String(address).trim();
    }

    if (postalCode !== undefined) {
      user.postalCode =
        String(postalCode).trim();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "اطلاعات پروفایل با موفقیت بروزرسانی شد.",
      user: getUserResponse(user),
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "این ایمیل قبلاً ثبت شده است.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "بروزرسانی اطلاعات پروفایل با خطا مواجه شد.",
    });
  }
};

// ======================================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// ======================================================

export const forgotPassword = async (
  req,
  res
) => {
  try {
    const body = req.body || {};

    const { email } = body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "ایمیل الزامی است.",
      });
    }

    const normalizedEmail =
      String(email)
        .trim()
        .toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "ایمیل معتبر نیست.",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    }).select(
      "+resetPasswordToken +resetPasswordExpires"
    );

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "اگر حسابی با این ایمیل وجود داشته باشد، لینک بازیابی ارسال خواهد شد.",
      });
    }

    const resetToken =
      crypto.randomBytes(32).toString("hex");

    const hashedToken =
      crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken =
      hashedToken;

    user.resetPasswordExpires =
      Date.now() +
      15 * 60 * 1000;

    await user.save({
      validateBeforeSave: false,
    });

    const clientUrl =
      process.env.CLIENT_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    await sendPasswordResetEmail(
      user.email,
      resetUrl
    );

    return res.status(200).json({
      success: true,
      message:
        "لینک بازیابی رمز عبور به ایمیل شما ارسال شد.",
    });
  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "ارسال لینک بازیابی رمز عبور با خطا مواجه شد.",
    });
  }
};

// ======================================================
// RESET PASSWORD
// POST /api/auth/reset-password/:token
// ======================================================

export const resetPassword = async (
  req,
  res
) => {
  try {
    const { token } = req.params;

    const body = req.body || {};

    const { password } = body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message:
          "توکن بازیابی ارسال نشده است.",
      });
    }

    if (
      !password ||
      String(password).length < 6
    ) {
      return res.status(400).json({
        success: false,
        message:
          "رمز عبور جدید باید حداقل ۶ کاراکتر باشد.",
      });
    }

    const hashedToken =
      crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    }).select(
      "+resetPasswordToken +resetPasswordExpires"
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "لینک بازیابی نامعتبر یا منقضی شده است.",
      });
    }

    user.password =
      await bcrypt.hash(
        String(password),
        12
      );

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
      "RESET PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "تغییر رمز عبور با خطا مواجه شد.",
    });
  }
};

