const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
    getAllCategories,
    addCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Get all categories
router.get("/get-categories", getAllCategories);

// Add new category with file upload
router.post("/add-category", upload.single('image'), addCategory);

// Delete category
router.post("/delete-category", deleteCategory);

module.exports = router;
