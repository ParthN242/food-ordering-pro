const express = require("express");
const {
  createFoodItem,
  getAllFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require("../Controllers/food.controller");
const verifyUser = require("../Middleware/verifyUser");

const router = express.Router();

router
  .post("/create", verifyUser, createFoodItem)
  .get("/get", getAllFoodItem)
  .put("/", verifyUser, updateFoodItem)
  .delete("/delete/:id", verifyUser, deleteFoodItem);
module.exports = router;
