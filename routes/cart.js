const router = require("express").Router();
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await new Cart(newCart.save());
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.id,
    });
    res.status(200).json(cart);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
