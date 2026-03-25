const Category = require("../models/categoryModel");

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Add new category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Get image path from uploaded file
        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({ message: "Category already exists" });
        }

        const newCategory = new Category({ name, image: imagePath });
        await newCategory.save();

        res.status(201).send({
            message: "Category added successfully",
            data: newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;

        await Category.findByIdAndDelete(categoryId);

        res.status(200).send({
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
};
