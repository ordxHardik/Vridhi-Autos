const express = require("express");
const {
  getAllCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Get all categories
router.get("/get-categories", getAllCategories);

// Add new category
router.post("/add-category", addCategory);

// Delete category
router.post("/delete-category", deleteCategory);

module.exports = router;
