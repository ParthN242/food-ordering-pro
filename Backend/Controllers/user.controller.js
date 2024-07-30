const User = require("../Models/user.model");

// Get User Detail
exports.getUserDetail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Get User By Admin
exports.getUserByAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res, next) => {
  const { email, ...otherData } = req.body;

  try {
    const user = await User.findOneAndUpdate({ email }, otherData, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, message: "User Profile Updated", user });
  } catch (error) {
    next(error);
  }
};

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    return next(error);
  }
};
