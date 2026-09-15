import express from "express";

import orderRoutes from "./orderRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀",
  });
});

router.use("/orders", orderRoutes);
router.use("/auth", authRoutes);

export default router;