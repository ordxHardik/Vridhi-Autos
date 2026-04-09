const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Get all categories
router.get("/get-categories", getAllCategories);

// Add new category with file upload
router.post("/add-category", upload.single('image'), addCategory);

// Update category
router.post("/update-category", upload.single('image'), updateCategory);

// Delete category
router.post("/delete-category", deleteCategory);

module.exports = router;
