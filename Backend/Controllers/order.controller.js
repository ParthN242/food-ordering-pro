const Order = require("../Models/order.model");

// Get User order
exports.getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ userEmail: req.user.email });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// Get Order Item
exports.getOrderItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);

    if (!order)
      return res.status(404).json({ success: false, error: "Invalid user id" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const { orderInfo } = req.body;

    const order = await Order.create(orderInfo);

    res.json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    next(error);
  }
};
