import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Rice Shop API is running"
  });
});

export default app;