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

    // Get image URL from Cloudinary upload
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.secure_url; // Cloudinary provides secure_url
    }

    const newItem = new itemModel({
      name,
      price,
      category,
      image: imagePath,
    });
    await newItem.save();
    res.status(201).send("Item Created Successfully!");
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
      updateData.image = req.file.secure_url;
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
