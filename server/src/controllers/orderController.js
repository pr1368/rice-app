import Order from "../models/Order.js";
import Product from "../models/Product.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalPrice } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "اطلاعات سفارش ناقص است.",
      });
    }

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `محصول ${item.name} پیدا نشد.`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `موجودی محصول ${product.name} کافی نیست.`,
        });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.price,
        weight: item.weight,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      customer,
      items: orderItems,
      totalPrice,
    });

    // کم کردن موجودی
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

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

// POST /api/orders/:id/pay
export const payOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "سفارش پیدا نشد.",
      });
    }

    if (order.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "این سفارش قبلاً پرداخت شده است.",
      });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "سفارش لغو شده و قابل پرداخت نیست.",
      });
    }

    // پرداخت تستی
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