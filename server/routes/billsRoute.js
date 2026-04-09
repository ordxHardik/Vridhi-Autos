const express = require("express");
const {
  addBillsController,
  getBillsController,
  deleteBillController,
} = require("./../controllers/billsController");

const router = express.Router();

//routes

//MEthod - POST
router.post("/add-bills", addBillsController);

//MEthod - GET
router.get("/get-bills", getBillsController);

//Method - DELETE
router.delete("/delete-bill/:billId", deleteBillController);

module.exports = router;
