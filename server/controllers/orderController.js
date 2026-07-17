import Order from "../models/Order.js";

// ==============================
// Create Order
// POST /api/orders
// ==============================
export const createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      email,
      shippingAddress,
      orderItems,
      totalPrice,
      paymentMethod,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No items found in your order");
    }

    const order = new Order({
      customerName,
      email,
      shippingAddress,
      orderItems,
      totalPrice,
      paymentMethod,
      isPaid: paymentMethod === "Stripe",
      paidAt: paymentMethod === "Stripe" ? new Date() : null,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// ==============================
// Get All Orders
// GET /api/orders
// ==============================
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("orderItems.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};