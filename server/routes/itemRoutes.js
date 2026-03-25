const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("./../controllers/itemController");

const router = express.Router();

//routes
//Method - get
router.get("/get-item", getItemController);

//Method - POST with file upload
router.post("/add-item", upload.single('image'), addItemController);

//method - PUT with file upload
router.put("/edit-item", upload.single('image'), editItemController);

//method - DELETE
router.post("/delete-item", deleteItemController);

module.exports = router;
