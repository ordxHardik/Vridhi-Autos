const itemModel = require("../models/itemModel");
const cloudinary = require("cloudinary").v2;

// Helper function to extract public_id from Cloudinary URL
const extractPublicIdFromUrl = (url) => {
  try {
    if (!url) return null;
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v{version}/{public_id}
    const urlPath = url.split("/upload/")[1]; // Get part after /upload/
    if (!urlPath) return null;
    // Remove version identifier (v{timestamp}/)
    const publicIdWithVersion = urlPath.split("/").slice(1).join("/");
    // Remove file extension
    const publicId = publicIdWithVersion.replace(/\.[^/.]+$/, "");
    return publicId;
  } catch (error) {
    console.log("Error extracting public_id:", error);
    return null;
  }
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    const publicId = extractPublicIdFromUrl(imageUrl);
    if (!publicId) {
      console.log("Could not extract public_id from URL:", imageUrl);
      return;
    }
    console.log("Deleting image from Cloudinary with public_id:", publicId);
    await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary successfully");
  } catch (error) {
    console.log("Error deleting from Cloudinary:", error.message);
    // Don't throw error, just log it
  }
};
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};

//add items
const addItemController = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Log the file object for debugging
    console.log("File object from Cloudinary:", JSON.stringify(req.file, null, 2));

    // CloudinaryStorage provides the full URL in 'path' or 'secure_url' property
    let imagePath = '';

    if (req.file.secure_url) {
      imagePath = req.file.secure_url;
    } else if (req.file.path) {
      imagePath = req.file.path;
    } else if (req.file.url) {
      imagePath = req.file.url;
    }

    console.log("Image path being stored:", imagePath);

    if (!imagePath) {
      return res.status(400).json({ message: "Failed to get image URL from Cloudinary" });
    }

    // Ensure URL is properly formatted (fix any malformed https://)
    imagePath = imagePath.replace(/^(https?):\/\/+/, '$1://');

    const newItem = new itemModel({
      name,
      price,
      category,
      image: imagePath,
    });
    await newItem.save();
    res.status(201).json({ message: "Item Created Successfully!", image: imagePath });
  } catch (error) {
    res.status(400).json({ message: "Error creating item", error: error.message });
    console.log(error);
  }
};

//update item
const editItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);

    let updateData = { ...req.body };

    // If a new file is uploaded, update the image URL from Cloudinary
    if (req.file) {
      console.log("File object from Cloudinary (edit):", JSON.stringify(req.file, null, 2));

      // Get existing item to delete old image
      const existingItem = await itemModel.findById(itemId);
      if (existingItem && existingItem.image) {
        // Delete old image from Cloudinary
        await deleteFromCloudinary(existingItem.image);
      }

      let imagePath = '';

      if (req.file.secure_url) {
        imagePath = req.file.secure_url;
      } else if (req.file.path) {
        imagePath = req.file.path;
      } else if (req.file.url) {
        imagePath = req.file.url;
      }

      console.log("Image path being stored (edit):", imagePath);

      if (imagePath) {
        // Ensure URL is properly formatted (fix any malformed https://)
        imagePath = imagePath.replace(/^(https?):\/\/+/, '$1://');
        updateData.image = imagePath;
      }
    }

    await itemModel.findOneAndUpdate({ _id: itemId }, updateData, {
      new: true,
    });

    res.status(201).json("item Updated");
  } catch (error) {
    res.status(400).json({ message: "Error updating item", error: error.message });
    console.log(error);
  }
};
//delete item
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);

    // Get item before deleting to extract image URL
    const item = await itemModel.findById(itemId);

    // Delete image from Cloudinary if it exists
    if (item && item.image) {
      await deleteFromCloudinary(item.image);
    }

    // Delete item from database
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).json({ message: "Error deleting item", error: error.message });
    console.log(error);
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
