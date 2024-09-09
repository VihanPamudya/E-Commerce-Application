const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/myorders", protect, getUserOrders);

router.get("/:id", protect, getOrderById);

module.exports = router;
