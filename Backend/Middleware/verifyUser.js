const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const ErrorHandler = require("../Utils/errorHandler");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token || token == "")
    return next(
      new ErrorHandler("Please Login To Access Resources No Token ", 401)
    );

  try {
    const isValid = jwt.verify(token, process.env.JWT_SCREATE);

    const user = await User.findById(isValid.id);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
