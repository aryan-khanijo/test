const jwt = require("jsonwebtoken");
require("dotenv");
const { jwtDecode } = require("jwt-decode");

const userAuth = (req, res, next) => {
  const token = req.header.token;
  const result = jwt.verify(token, process.env.JWT_USER_SECRET);
  if (!result) return res.status(403).json({ message: "Only User is allowed" });
  const decrypt = jwtDecode(token);
  req.user = decrypt;
  next();
};

module.exports = userAuth;
