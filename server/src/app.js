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
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ======================================================
// Middleware
// ======================================================

app.use(express.json());
app.use(cookieParser());
app.use(compression());

// ======================================================
// Root
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RiceShop API is running",
  });
});

// ======================================================
// Health
// ======================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "RiceShop API is running",
  });
});

// ======================================================
// General routes
// ======================================================

app.use("/api", router);

// ======================================================
// Product routes
// ======================================================

app.use("/api/products", productRoutes);

// ======================================================
// Error handler
// ======================================================

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(500).json({
    success: false,
    message: "خطای داخلی سرور.",
  });
});

export default app;