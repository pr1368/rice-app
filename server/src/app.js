import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

import productRoutes from "./routes/productRoutes.js";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RiceShop API is running",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Rice Shop API is running",
  });
});

// General routes
app.use("/api", router);

// Product routes
app.use("/api/products", productRoutes);

export default app;