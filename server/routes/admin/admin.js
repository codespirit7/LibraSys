const router = require("express").Router();
const AdminUser = require("../../models/Admins/Admin");
const bcrypt = require("bcrypt");
const JWT_SECRET = "secret";
var jwt = require("jsonwebtoken");

//Route for sign Up of admins
router.post("/adminRegister/", async (req, res) => {
  try {
    if (req.body.secret != "111") {
      res.status(401).json({ error: "Invalid Secret Key" });
      return;
    }

    const adminAlready = await AdminUser.findOne({ email: req.body.email });

    if (adminAlready) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const adminUser = new AdminUser({
      secret: "111",
      email: req.body.email,
      password: hashedPass,
    });

    const admin_user = await adminUser.save();
    res.status(200).json(admin_user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Route for sign in of admins
router.post("/adminLogin/", async (req, res) => {
  try {
    const user = await AdminUser.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Invalid Email");
    }

    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatedPassword) {
      return res.status(400).json("Invalide Password");
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
