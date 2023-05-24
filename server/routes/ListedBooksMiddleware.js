const JWT_SECRET = "secret";
var jwt = require("jsonwebtoken");
const AdminUser = require("../models/Admins/Admin");
const User = require("../models/Users/User");

const authenticateListedBooks = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user information to the request object for further processing
    req.userId = decoded.id;
    const user1 = await AdminUser.findOne({ email: decoded.id });
    const user2 = await User.findOne({ email: decoded.id });
    if (user1 || user2) {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateListedBooks;
