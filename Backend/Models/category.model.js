const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models?.category || mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
