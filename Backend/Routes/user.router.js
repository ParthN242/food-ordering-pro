const express = require("express");
const verifyUser = require("../Middleware/verifyUser");
const {
  getUserDetail,
  getAllUsers,
  updateUserProfile,
  getUserByAdmin,
} = require("../Controllers/user.controller");

const router = express.Router();

router
  .get("/me", verifyUser, getUserDetail)
  .put("/", verifyUser, updateUserProfile)
  .get("/all", verifyUser, getAllUsers)
  .get("/:id", verifyUser, getUserByAdmin);

module.exports = router;
