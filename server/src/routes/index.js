import express from "express";

import orderRoutes from "./orderRoutes.js";
import authRoutes from "./authRoutes.js";
import adminOrderRoutes from "./adminOrderRoutes.js";

const router = express.Router();

// ======================================================
// Test
// ======================================================

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀",
  });
});

// ======================================================
// User Orders
// ======================================================

router.use("/orders", orderRoutes);

// ======================================================
// Authentication
// ======================================================

router.use("/auth", authRoutes);

// ======================================================
// Admin Orders
// ======================================================

router.use("/admin/orders", adminOrderRoutes);

export default router;

