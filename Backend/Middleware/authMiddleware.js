const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");


function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized no Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    User.findById(decoded.id).then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Unauthorized Wrong User Data" });
      }else if (!user.isActive) {
        return res.status(500).json({ message: "You Account has been disabled..." });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized no Token Error" });
  }
}

function adminMiddleware(req, res, next) {
  const user = req.user;

  if (!user || !user.isAdmin) {
    return res.status(401).json({ message: "Unauthorized as an Admin" });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };
