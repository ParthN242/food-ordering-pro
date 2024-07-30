const express = require("express");
const {
  registerUser,
  loginUser,
  signOutUser,
} = require("../Controllers/auth.controller");
const verifyUser = require("../Middleware/verifyUser");

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/signout", signOutUser);

module.exports = router;
