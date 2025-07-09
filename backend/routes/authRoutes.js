const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const { register, verifyEmail, login } = require("../controllers/authController");

router.post("/register", register);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);

module.exports = router;
// This code defines the authentication routes for the Hive application.
// It includes routes for user registration, email verification, and login.     

const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await require("../models/User").findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// This route retrieves the authenticated user's information.
// It uses the `auth` middleware to ensure the user is authenticated before accessing their profile data.
// The user's password is excluded from the response for security reasons.  

router.put("/me", auth, upload.single("profilePic"), updateProfile);
// This route allows the authenticated user to update their profile information.
// It uses the `auth` middleware to ensure the user is authenticated and the `upload` middleware to handle profile picture uploads.
// The user's profile information can be updated, including their profile picture, bio, interests, university, department, and social links.
// The updated user information is returned in the response after a successful update.
// This is essential for allowing users to manage their profiles and keep their information up-to-date within the Hive application.
