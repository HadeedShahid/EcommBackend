const { timeStamp } = require("console");
const mongoose = require("mongoose");

const orderScehma = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("Order", orderScehma);
