import { body, param } from "express-validator";

export const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام محصول الزامی است"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("slug محصول الزامی است")
    .isSlug()
    .withMessage("slug معتبر نیست"),

  body("description")
    .optional()
    .isString()
    .withMessage("توضیحات باید متن باشد"),

  body("price")
    .notEmpty()
    .withMessage("قیمت الزامی است")
    .isNumeric()
    .withMessage("قیمت باید عدد باشد")
    .custom((value) => value >= 0)
    .withMessage("قیمت نمی‌تواند منفی باشد"),

  body("weight")
    .notEmpty()
    .withMessage("وزن الزامی است")
    .isNumeric()
    .withMessage("وزن باید عدد باشد")
    .custom((value) => value > 0)
    .withMessage("وزن باید بیشتر از صفر باشد"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("دسته‌بندی الزامی است"),

  body("image")
    .optional()
    .isString()
    .withMessage("آدرس تصویر باید متن باشد"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("موجودی باید عدد صحیح و غیرمنفی باشد"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive باید true یا false باشد"),
];

export const updateProductValidation = [
  param("id")
    .isMongoId()
    .withMessage("شناسه محصول معتبر نیست"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("نام محصول نمی‌تواند خالی باشد"),

  body("slug")
    .optional()
    .trim()
    .isSlug()
    .withMessage("slug معتبر نیست"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("قیمت باید عدد باشد")
    .custom((value) => value >= 0)
    .withMessage("قیمت نمی‌تواند منفی باشد"),

  body("weight")
    .optional()
    .isNumeric()
    .withMessage("وزن باید عدد باشد")
    .custom((value) => value > 0)
    .withMessage("وزن باید بیشتر از صفر باشد"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("موجودی باید عدد صحیح و غیرمنفی باشد"),
];

export const productIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("شناسه محصول معتبر نیست"),
];