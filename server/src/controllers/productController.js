import Product from "../models/Product.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت محصولات",
      error: error.message,
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "محصول پیدا نشد",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت محصول",
      error: error.message,
    });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "محصول با موفقیت ایجاد شد",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "خطا در ایجاد محصول",
      error: error.message,
    });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "محصول پیدا نشد",
      });
    }

    res.status(200).json({
      success: true,
      message: "محصول با موفقیت ویرایش شد",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "خطا در ویرایش محصول",
      error: error.message,
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "محصول پیدا نشد",
      });
    }

    res.status(200).json({
      success: true,
      message: "محصول با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در حذف محصول",
      error: error.message,
    });
  }
};