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
    .custom((value) => Number(value) >= 0)
    .withMessage("قیمت نمی‌تواند منفی باشد"),

  body("weight")
    .notEmpty()
    .withMessage("وزن الزامی است")
    .isNumeric()
    .withMessage("وزن باید عدد باشد")
    .custom((value) => Number(value) > 0)
    .withMessage("وزن باید بیشتر از صفر باشد"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("دسته‌بندی الزامی است"),

  body("province")
    .optional()
    .isString()
    .withMessage("مبدأ باید متن باشد")
    .trim(),

  body("quality")
    .optional()
    .isString()
    .withMessage("کیفیت باید متن باشد")
    .trim(),

  body("harvest")
    .optional({ nullable: true })
    .isInt({ min: 1300, max: 1500 })
    .withMessage("سال برداشت معتبر نیست"),

  body("riceType")
    .optional()
    .isString()
    .withMessage("نوع برنج باید متن باشد")
    .trim(),

  body("aroma")
    .optional()
    .isString()
    .withMessage("میزان عطر باید متن باشد")
    .trim(),

  body("cookingTime")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("زمان پخت باید عدد صحیح غیرمنفی باشد"),

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

  body("description")
    .optional()
    .isString()
    .withMessage("توضیحات باید متن باشد"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("قیمت باید عدد باشد")
    .custom((value) => Number(value) >= 0)
    .withMessage("قیمت نمی‌تواند منفی باشد"),

  body("weight")
    .optional()
    .isNumeric()
    .withMessage("وزن باید عدد باشد")
    .custom((value) => Number(value) > 0)
    .withMessage("وزن باید بیشتر از صفر باشد"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("دسته‌بندی نمی‌تواند خالی باشد"),

  body("province")
    .optional()
    .isString()
    .withMessage("مبدأ باید متن باشد")
    .trim(),

  body("quality")
    .optional()
    .isString()
    .withMessage("کیفیت باید متن باشد")
    .trim(),

  body("harvest")
    .optional({ nullable: true })
    .isInt({ min: 1300, max: 1500 })
    .withMessage("سال برداشت معتبر نیست"),

  body("riceType")
    .optional()
    .isString()
    .withMessage("نوع برنج باید متن باشد")
    .trim(),

  body("aroma")
    .optional()
    .isString()
    .withMessage("میزان عطر باید متن باشد")
    .trim(),

  body("cookingTime")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("زمان پخت باید عدد صحیح غیرمنفی باشد"),

 body("images")
  .optional()
  .isArray()
  .withMessage("تصاویر باید به صورت آرایه ارسال شوند"),

body("images.*")
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

export const productIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("شناسه محصول معتبر نیست"),
];