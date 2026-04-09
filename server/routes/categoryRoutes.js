const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
    getAllCategories,
    addCategory,
    deleteCategory,
    editCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Get all categories
router.get("/get-categories", getAllCategories);

// Add new category with file upload
router.post("/add-category", upload.single('image'), addCategory);

// Edit category with optional file upload
router.put("/edit-category", upload.single('image'), editCategory);

// Delete category
router.post("/delete-category", deleteCategory);

module.exports = router;
