import express from "express";

import {
  createOrder,
  payOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

router.post("/:id/pay", payOrder);

export default router;