import express from "express";
import orderRoutes from "./orderRoutes.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀",
  });
});

router.use("/orders", orderRoutes);

export default router;