const itemModel = require("../models/itemModel");

// get items
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

    // CloudinaryStorage stores the URL in 'path' property
    const imagePath = req.file.path || req.file.secure_url || req.file.url;
    console.log("Image path being stored:", imagePath);

    if (!imagePath) {
      return res.status(400).json({ message: "Failed to get image URL from Cloudinary" });
    }

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
      const imagePath = req.file.path || req.file.secure_url || req.file.url;
      console.log("Image path being stored (edit):", imagePath);
      if (imagePath) {
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
