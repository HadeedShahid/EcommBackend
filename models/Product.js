const { timeStamp } = require("console");
const mongoose = require("mongoose");

const productScehma = new mongoose.Schema.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: String, required: true },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("Product", productScehma);
