const User = require("../models/User");

const admin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = admin;
// This middleware function checks if the authenticated user is an admin by comparing their email with the admin's email stored in environment variables.