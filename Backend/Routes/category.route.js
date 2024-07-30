const express = require("express");
const {
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../Controllers/category.controller");
const verifyUser = require("../Middleware/verifyUser");

const router = express.Router();

router
  .get("/", getCategory)
  .post("/", verifyUser, createCategory)
  .put("/", verifyUser, updateCategory)
  .delete("/", verifyUser, deleteCategory);
module.exports = router;
