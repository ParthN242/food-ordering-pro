const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Number,
    },
    postalCode: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models?.user || mongoose.model("user", UserSchema);

module.exports = UserModel;
