const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("id fullName email");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
  if (user.isSuspended) {
  return res.status(403).json({ message: "Your account is suspended." });
}

};

module.exports = auth;
// This middleware function checks for a valid JWT token in the Authorization header.
// If the token is valid, it decodes the user information and attaches it to the request object.
// If the token is missing or invalid, it responds with a 401 Unauthorized status. 