const billsModel = require("../models/billsModel");
const { sendOrderConfirmationEmail, sendAdminNotificationEmail } = require("../utils/emailService");

//add items
const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();

    // Send order confirmation email to customer (non-blocking - fire and forget)
    sendOrderConfirmationEmail(req.body).catch((emailError) => {
      console.log("❌ Customer email sending failed:", emailError);
    });

    // Send admin notification email (non-blocking - fire and forget)
    sendAdminNotificationEmail(req.body).catch((emailError) => {
      console.log("❌ Admin email sending failed:", emailError);
    });

    res.send("Bill Created Successfully!");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
};

//get blls data
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};

// Delete bill
const deleteBillController = async (req, res) => {
  try {
    const { billId } = req.params;
    const deletedBill = await billsModel.findByIdAndDelete(billId);

    if (!deletedBill) {
      return res.status(404).send({ message: "Bill not found" });
    }

    res.status(200).send({ message: "Bill deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = {
  addBillsController,
  getBillsController,
  deleteBillController,
};
