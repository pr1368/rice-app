import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

import productRoutes from "./routes/productRoutes.js";
import router from "./routes/index.js";

const app = express();

// ======================================================
// CORS
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // درخواست‌های بدون Origin مثل Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);

// ======================================================
// BODY PARSERS
// ======================================================

// JSON requests
app.use(
  express.json({
    limit: "10mb",
  })
);

// URL encoded requests
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ======================================================
// OTHER MIDDLEWARES
// ======================================================

app.use(cookieParser());

app.use(compression());

// ======================================================
// REQUEST DEBUG
// ======================================================

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.originalUrl}`
  );

  next();
});

// ======================================================
// ROOT
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RiceShop API is running",
  });
});

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RiceShop API is running",
  });
});

// ======================================================
// API ROUTES
// ======================================================

app.use("/api", router);

// ======================================================
// PRODUCT ROUTES
// ======================================================

app.use(
  "/api/products",
  productRoutes
);

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "مسیر مورد نظر پیدا نشد.",
    path: req.originalUrl,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error("======================================");
  console.error("GLOBAL SERVER ERROR");
  console.error("NAME:", err.name);
  console.error("MESSAGE:", err.message);
  console.error("STACK:", err.stack);
  console.error("======================================");

  // CORS error
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "دسترسی به این Origin مجاز نیست.",
    });
  }

  // Invalid JSON
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.type === "entity.parse.failed"
  ) {
    return res.status(400).json({
      success: false,
      message: "فرمت JSON ارسال‌شده صحیح نیست.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "خطای داخلی سرور.",
  });
});

export default app;

