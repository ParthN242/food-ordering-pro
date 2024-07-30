const Category = require("../Models/category.model");

// Get Category
exports.getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// Create Category

exports.createCategory = async (req, res, next) => {
  const data = req.body;

  try {
    await Category.create(data);

    return res.json({
      success: true,
      message: "Category Added",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

// Update Category
exports.updateCategory = async (req, res, next) => {
  const { id, name, user } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, user },
      {
        new: true,
      }
    );

    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

// Delete Category
exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.query.id);

    res.status(200).json({ success: true, message: "Category Deleted" });
  } catch (error) {
    next(error);
  }
};
