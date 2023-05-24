const router = require("express").Router();
const User = require("../../models/Users/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const passport = require("passport");

//User Registration POST API
router.post("/register/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const userAlready = await User.findOne({ email: req.body.email });
    if (userAlready) {
      res.status(409).json({ error: "User already exist" });
      return;
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(200).json(err);
  }
});

//User Login POST API
router.post("/login/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Invalid Email");
    }

    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatedPassword) {
      return res.status(400).json("Invalid Password");
    }

    const token = jwt.sign(
      {
        id: user.email,
      },
      JWT_SECRET
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
