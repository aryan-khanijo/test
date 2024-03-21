const jwt = require("jsonwebtoken");
require("dotenv");
const { jwtDecode } = require("jwt-decode");

const adminAuth = (req, res, next) => {
  const token = req.headers.token;
  const result = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
  if (!result)
    return res.status(403).json({ message: "Only Admin is allowed" });
  const decrypt = jwtDecode(token);
  req.user = decrypt;
  next();
};

module.exports = adminAuth;
