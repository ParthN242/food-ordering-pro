const express = require("express");
const verifyUser = require("../Middleware/verifyUser");
const {
  getOrder,
  createOrder,
  getOrderItem,
} = require("../Controllers/order.controller");

const router = express.Router();

router
  .get("/", verifyUser, getOrder)
  .post("/", verifyUser, createOrder)
  .get("/:id", verifyUser, getOrderItem);

module.exports = router;
