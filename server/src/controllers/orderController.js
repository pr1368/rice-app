import mongoose from "mongoose";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ======================================================
// POST /api/orders
// ایجاد سفارش
// ======================================================

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { customer, items } = req.body;

    // -----------------------------
    // بررسی اطلاعات گیرنده
    // -----------------------------

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "اطلاعات گیرنده وارد نشده است.",
      });
    }

    const {
      firstName,
      lastName,
      phone,
      postalCode,
      address,
    } = customer;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !phone?.trim() ||
      !postalCode?.trim() ||
      !address?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "تمام اطلاعات گیرنده را وارد کنید.",
      });
    }

    // -----------------------------
    // بررسی محصولات سفارش
    // -----------------------------

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "سفارش باید حداقل یک محصول داشته باشد.",
      });
    }

    const orderItems = [];
    let calculatedTotal = 0;

    // محصولاتی که موجودی آنها رزرو شده است
    const reservedItems = [];

    // -----------------------------
    // بررسی تک‌تک محصولات
    // -----------------------------

    for (const item of items) {
      if (!item.productId) {
        return res.status(400).json({
          success: false,
          message: "شناسه محصول وارد نشده است.",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({
          success: false,
          message: "شناسه محصول نامعتبر است.",
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "تعداد محصول نامعتبر است.",
        });
      }

      // -----------------------------
      // دریافت محصول از دیتابیس
      // -----------------------------

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "محصول پیدا نشد.",
        });
      }

      // -----------------------------
      // بررسی فعال بودن محصول
      // -----------------------------

      if (!product.isActive) {
        return res.status(400).json({
          success: false,
          message: `محصول ${product.name} در حال حاضر فعال نیست.`,
        });
      }

      // -----------------------------
      // بررسی موجودی
      // -----------------------------

      if (Number(product.stock) < quantity) {
        return res.status(400).json({
          success: false,
          message: `موجودی محصول ${product.name} کافی نیست.`,
        });
      }

      // -----------------------------
      // قیمت واقعی از دیتابیس
      // -----------------------------

      const price = Number(product.price);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: `قیمت محصول ${product.name} نامعتبر است.`,
        });
      }

      const itemTotal = price * quantity;

      calculatedTotal += itemTotal;

      // -----------------------------
      // Snapshot محصول
      // -----------------------------

      orderItems.push({
        productId: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price,
        weight: product.weight,
        quantity,
      });
    }

    // -----------------------------
    // رزرو / کاهش موجودی
    // -----------------------------

    for (const item of orderItems) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          isActive: true,
          stock: {
            $gte: item.quantity,
          },
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        // اگر یکی از محصولات موجودی کافی نداشت،
        // موجودی محصولات قبلی را برمی‌گردانیم.

        for (const reservedItem of reservedItems) {
          await Product.findByIdAndUpdate(
            reservedItem.productId,
            {
              $inc: {
                stock: reservedItem.quantity,
              },
            }
          );
        }

        return res.status(400).json({
          success: false,
          message: `موجودی محصول ${item.name} دیگر کافی نیست.`,
        });
      }

      reservedItems.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    // -----------------------------
    // ایجاد سفارش
    // -----------------------------

    let order;

    try {
      order = await Order.create({
        user: userId,

        customer: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          postalCode: postalCode.trim(),
          address: address.trim(),
        },

        items: orderItems,

        totalPrice: calculatedTotal,

        status: "pending",
      });
    } catch (error) {
      // اگر ایجاد سفارش شکست خورد،
      // موجودی رزرو شده باید برگردد.

      for (const reservedItem of reservedItems) {
        await Product.findByIdAndUpdate(
          reservedItem.productId,
          {
            $inc: {
              stock: reservedItem.quantity,
            },
          }
        );
      }

      throw error;
    }

    // -----------------------------
    // پاسخ موفق
    // -----------------------------

    return res.status(201).json({
      success: true,
      message: "سفارش با موفقیت ثبت شد.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "ثبت سفارش با خطا مواجه شد.",
      error: error.message,
    });
  }
};

// ======================================================
// POST /api/orders/:id/pay
// پرداخت سفارش
// ======================================================

export const payOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    // -----------------------------
    // بررسی شناسه سفارش
    // -----------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه سفارش نامعتبر است.",
      });
    }

    // -----------------------------
    // دریافت سفارش متعلق به کاربر
    // -----------------------------

    const order = await Order.findOne({
      _id: id,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "سفارش پیدا نشد.",
      });
    }

    // -----------------------------
    // سفارش قبلاً پرداخت شده
    // -----------------------------

    if (order.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "این سفارش قبلاً پرداخت شده است.",
        order,
      });
    }

    // -----------------------------
    // سفارش لغو شده
    // -----------------------------

    if (order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "سفارش لغو شده و قابل پرداخت نیست.",
      });
    }

    // -----------------------------
    // فقط سفارش pending قابل پرداخت است
    // -----------------------------

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "این سفارش در وضعیت قابل پرداخت نیست.",
      });
    }

    // -----------------------------
    // پرداخت تستی
    // -----------------------------

    order.status = "paid";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "پرداخت با موفقیت انجام شد.",
      order,
    });
  } catch (error) {
    console.error("Pay order error:", error);

    return res.status(500).json({
      success: false,
      message: "پرداخت سفارش با خطا مواجه شد.",
      error: error.message,
    });
  }
};

// ======================================================
// GET /api/orders
// سفارش‌های کاربر
// ======================================================

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);

    return res.status(500).json({
      success: false,
      message: "خطا در دریافت سفارش‌ها.",
      error: error.message,
    });
  }
};

// ======================================================
// GET /api/orders/:id
// جزئیات یک سفارش
// ======================================================

export const getMyOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    // -----------------------------
    // بررسی شناسه
    // -----------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه سفارش نامعتبر است.",
      });
    }

    // -----------------------------
    // دریافت سفارش متعلق به کاربر
    // -----------------------------

    const order = await Order.findOne({
      _id: id,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "سفارش پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order by id error:", error);

    return res.status(500).json({
      success: false,
      message: "خطا در دریافت جزئیات سفارش.",
      error: error.message,
    });
  }
};

// ======================================================
// PATCH /api/orders/:id/cancel
// لغو سفارش
// ======================================================

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    // -----------------------------
    // بررسی شناسه
    // -----------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه سفارش نامعتبر است.",
      });
    }

    // -----------------------------
    // دریافت سفارش
    // -----------------------------

    const order = await Order.findOne({
      _id: id,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "سفارش پیدا نشد.",
      });
    }

    // -----------------------------
    // سفارش پرداخت شده
    // -----------------------------

    if (order.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "سفارش پرداخت شده و قابل لغو نیست.",
      });
    }

    // -----------------------------
    // فقط pending قابل لغو است
    // -----------------------------

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "این سفارش در وضعیت قابل لغو نیست.",
      });
    }

    // -----------------------------
    // برگرداندن موجودی
    // -----------------------------

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            stock: item.quantity,
          },
        }
      );
    }

    // -----------------------------
    // تغییر وضعیت سفارش
    // -----------------------------

    order.status = "cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "سفارش با موفقیت لغو شد.",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);

    return res.status(500).json({
      success: false,
      message: "لغو سفارش با خطا مواجه شد.",
      error: error.message,
    });
  }
};

// ======================================================
// GET /api/admin/orders
// دریافت همه سفارش‌ها برای مدیر
// ======================================================

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate(
        "user",
        "firstName lastName phone email"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get admin orders error:", error);

    return res.status(500).json({
      success: false,
      message: "دریافت سفارش‌های مدیر با خطا مواجه شد.",
      error: error.message,
    });
  }
};
// ======================================================
// GET /api/admin/orders/:id
// دریافت جزئیات یک سفارش برای مدیر
// ======================================================

export const getAdminOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // -----------------------------
    // بررسی شناسه سفارش
    // -----------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه سفارش نامعتبر است.",
      });
    }

    // -----------------------------
    // دریافت سفارش
    // -----------------------------

    const order = await Order.findById(id).populate(
      "user",
      "firstName lastName phone email"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "سفارش پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get admin order by id error:", error);

    return res.status(500).json({
      success: false,
      message: "دریافت جزئیات سفارش با خطا مواجه شد.",
      error: error.message,
    });
  }
};