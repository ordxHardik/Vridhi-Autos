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

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Log the file object for debugging
        console.log("File object from Cloudinary (category):", JSON.stringify(req.file, null, 2));

        // Get image URL from Cloudinary
        let imagePath = '';
        if (req.file.secure_url) {
            imagePath = req.file.secure_url;
        } else if (req.file.path) {
            imagePath = req.file.path;
        } else if (req.file.url) {
            imagePath = req.file.url;
        }

        console.log("Image path being stored (category):", imagePath);

        if (!imagePath) {
            return res.status(400).json({ message: "Failed to get image URL from Cloudinary" });
        }

        // Ensure URL is properly formatted
        imagePath = imagePath.replace(/^(https?):\/\/+/, '$1://');

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

// Update category
const updateCategory = async (req, res) => {
    try {
        const { categoryId, name } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }

        // Check if new name already exists
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).send({ message: "Category name already exists" });
            }
            category.name = name;
        }

        // Update image if provided
        if (req.file) {
            let imagePath = '';
            if (req.file.secure_url) {
                imagePath = req.file.secure_url;
            } else if (req.file.path) {
                imagePath = req.file.path;
            } else if (req.file.url) {
                imagePath = req.file.url;
            }

            if (imagePath) {
                imagePath = imagePath.replace(/^(https?):\/+/, '$1://');
                category.image = imagePath;
            }
        }

        await category.save();

        res.status(200).send({
            message: "Category updated successfully",
            data: category,
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
    updateCategory,
    deleteCategory,
};
