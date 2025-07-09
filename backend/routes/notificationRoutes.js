const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

/**
 * @route GET /api/notifications
 * @desc Get all notifications for current user
 * @access Private
 */
router.get("/", auth, getNotifications);

/**
 * @route PUT /api/notifications/:id/read
 * @desc Mark a notification as read
 * @access Private
 */
router.put("/:id/read", auth, markAsRead);

module.exports = router;
// This code defines the notification routes for the Hive application.
// It includes routes for retrieving notifications and marking them as read.
// The `auth` middleware is used to ensure that only authenticated users can access these routes.
// The `getNotifications` controller retrieves all notifications for the authenticated user,
// while the `markAsRead` controller updates a specific notification's status to read.
// This is essential for keeping users informed about important events, such as new messages, likes,