const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await new Order(newOrder.save());
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.id,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
