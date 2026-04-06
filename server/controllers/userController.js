const userModal = require("../models/userModel");
const nodemailer = require("nodemailer");

// login user
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Validate required fields
    if (!userId || !password) {
      return res.status(400).json({
        message: "Missing required fields: userId and password",
      });
    }

    const user = await userModal.findOne({ userId, password, verified: true });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).json({
        message: "Login Fail - Invalid credentials or user not verified",
      });
    }
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
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

// Contact Us Controller
const contactUsController = async (req, res) => {
  try {
    const { name, phone, organizationName, email } = req.body;

    // Validate required fields
    if (!name || !phone || !organizationName) {
      return res.status(400).json({
        message: "Missing required fields: name, phone, organizationName",
      });
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "jainhardik88819@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "your-app-password", // Use app-specific password
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "jainhardik88819@gmail.com",
      to: "jainhardik88819@gmail.com",
      subject: "New Contact Us Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Organization Name:</strong> ${organizationName}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Contact information sent successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to send contact information",
      error: error.message,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  contactUsController,
};

// 1️⃣ CHECK IF USER ALREADY EXISTS   