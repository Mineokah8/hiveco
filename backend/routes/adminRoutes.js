const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  adminDeletePost,
  suspendUser,
  warnUser,
} = require("../controllers/adminController");

// DELETE post
router.delete("/posts/:id", auth, admin, adminDeletePost);

// SUSPEND user
router.put("/users/:id/suspend", auth, admin, suspendUser);

// WARN user
router.post("/users/:id/warn", auth, admin, warnUser);

module.exports = router;
// This code defines the admin routes for the Hive application.
// It includes routes for deleting posts, suspending users, and warning users.
// The `auth` middleware ensures that the user is authenticated, and the `admin` middleware checks if the user has admin privileges.
// The `adminDeletePost` controller allows an admin to delete a post by its ID.
// The `suspendUser` controller allows an admin to suspend a user by their ID, preventing them from accessing the application.
// The `warnUser` controller allows an admin to issue a warning to a user by their ID, which can be used for moderation purposes.
// These routes are essential for managing the application and maintaining a safe and respectful community environment within Hive.
// The admin routes are protected by both authentication and admin middleware to ensure that only authorized personnel can perform these actions.