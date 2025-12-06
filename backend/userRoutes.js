const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/User");   // ✅ FIXED PATH
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "Signup successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
