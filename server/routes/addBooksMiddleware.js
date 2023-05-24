const JWT_SECRET = "secret";
var jwt = require("jsonwebtoken");
const AdminUser = require("../models/Admins/Admin");

const addBooksMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user information to the request object for further processing
    req.userId = decoded.id;

    const user = await AdminUser.findOne({ email: decoded.id });
    if (user) {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = addBooksMiddleware;
