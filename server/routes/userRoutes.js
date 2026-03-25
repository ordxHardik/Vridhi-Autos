const express = require("express");
const {
  loginController,
  registerController,
  contactUsController,
} = require("./../controllers/userController");

const router = express.Router();

//routes
//Method - POST
router.post("/login", loginController);

//Method - POST
router.post("/register", registerController);

//Method - POST
router.post("/contact-us", contactUsController);

module.exports = router;
