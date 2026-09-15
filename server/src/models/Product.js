import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // مبدأ محصول
    province: {
      type: String,
      default: "",
      trim: true,
    },

    // کیفیت محصول
    quality: {
      type: String,
      default: "",
      trim: true,
    },

    // سال برداشت
    harvest: {
      type: Number,
      default: null,
    },

    // نوع برنج
    riceType: {
      type: String,
      default: "",
      trim: true,
    },

    // میزان عطر
    aroma: {
      type: String,
      default: "",
      trim: true,
    },

    // زمان تقریبی پخت
    cookingTime: {
      type: Number,
      default: null,
      min: 0,
    },

images: {
  type: [String],
  default: [],
},

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;