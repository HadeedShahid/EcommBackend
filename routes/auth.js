const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//================Register================
router.post("/register", async (req, res) => {
  const data = req.body;
  const newUser = new User({
    username: data.username,
    email: data.email,
    password: cryptoJS.AES.encrypt(
      data.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//================Login================
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("wrong credentials");
    const hashedPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );

    const password = hashedPassword.toString(cryptoJS.enc.Utf8);
    if (password !== req.body.password)
      res.status(401).json("wrong credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );
    res.status(200).json({ ...user._doc, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
