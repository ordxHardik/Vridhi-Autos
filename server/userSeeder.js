const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const userModal = require("./models/userModel");
require("colors");

// config
dotenv.config();
connectDb();

// Create test user
const createTestUser = async () => {
    try {
        // Check if test user already exists
        const existingUser = await userModal.findOne({ userId: "123" });

        if (existingUser) {
            console.log("Test user already exists".bgYellow);
            process.exit();
        }

        const testUser = new userModal({
            userId: "123",
            password: "123",
            name: "Test User",
            businessName: "Test Business",
            verified: true,
        });

        await testUser.save();
        console.log("Test user created successfully".bgGreen);
        process.exit();
    } catch (error) {
        console.log(`${error}`.bgRed.inverse);
        process.exit(1);
    }
};

createTestUser();
