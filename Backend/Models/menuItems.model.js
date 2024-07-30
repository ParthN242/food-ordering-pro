const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    basePrice: { type: Number, required: true },
    sizes: [{ name: { type: String }, price: { type: Number } }],
    extraIngredientsPrices: [
      { name: { type: String }, price: { type: Number } },
    ],
  },
  { timestamps: true }
);

const MenuItemModel =
  mongoose.models?.menuitems || mongoose.model("menuitems", MenuItemSchema);

module.exports = MenuItemModel;
