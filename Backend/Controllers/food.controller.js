const MenuItems = require("../Models/menuItems.model");

// Create Food
exports.createFoodItem = async (req, res, next) => {
  const data = req.body;
  try {
    const item = await MenuItems.create(data);

    return res.status(201).json({ success: true, item, message: "Item Added" });
  } catch (error) {
    next(error);
  }
};

// Get All Food Item
exports.getAllFoodItem = async (req, res, next) => {
  try {
    const items = await MenuItems.find();

    res.status(200).json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

// Update Food
exports.updateFoodItem = async (req, res, next) => {
  const { id, itemData } = req.body;

  try {
    const item = await MenuItems.findByIdAndUpdate(id, itemData);

    res.status(200).json({ success: true, message: "Food Item Updated", item });
  } catch (error) {
    next(error);
  }
};

// Delete Food
exports.deleteFoodItem = async (req, res, next) => {
  try {
    await Food.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json({ success: true, message: "Food Item Deleted" });
  } catch (error) {
    next(error);
  }
};
