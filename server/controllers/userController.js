const userModal = require("../models/userModel");

// login user
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await userModal.findOne({ userId, password, verified: true });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).json({
        message: "Login Fail",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// register user
const registerController = async (req, res) => {
  try {
    const { userId, name, businessName, password } = req.body;

    // Validate required fields
    if (!userId || !name || !businessName || !password) {
      return res.status(400).json({
        message: "Missing required fields: userId, name, businessName, password",
      });
    }

    // 1️⃣ CHECK IF USER ALREADY EXISTS
    const existingUser = await userModal.findOne({ userId });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 2️⃣ CREATE NEW USER
    const newUser = new userModal({
      userId,
      name,
      businessName,
      password,
      verified: true,
    });
    await newUser.save();

    res.status(201).json({
      message: "New user added successfully!",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  loginController,
  registerController,
};

// 1️⃣ CHECK IF USER ALREADY EXISTS   