const User = require("../Models/user.model");
const ErrorHandler = require("../Utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) return next(new ErrorHandler("Email already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    next(error);
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("Invalid Email", 401));

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch)
      return next(new ErrorHandler("Invalid Password", 401));

    const { password: pass, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SCREATE);

    const option = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    };

    res.cookie("token", token, option);

    res.status(200).json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

// Sign Out
exports.signOutUser = async (req, res, next) => {
  try {
    const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    };
    res.clearCookie("token");
    res.cookie("token", "", option);
    res.status(200).json({ success: true, message: "Sign Out Successfully" });
  } catch (error) {
    next(error);
  }
};
