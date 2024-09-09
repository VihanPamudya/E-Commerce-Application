const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  const { products, shippingInfo, payment, totalCost } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products in the order" });
  }

  try {
    const order = new Order({
      products,
      user: {
        email: req.user.email,
        userId: req.user._id,
      },
      shippingInfo,
      payment,
      totalCost,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "You are not authorized to view this order" });
      }

      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve order", error: error.message });
  }
};
