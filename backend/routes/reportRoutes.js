const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { reportPost, getAllReports } = require("../controllers/reportController");

/**
 * @route POST /api/reports/:id
 * @desc Report a post
 * @access Private
 */
router.post("/:id", auth, reportPost);

/**
 * @route GET /api/reports
 * @desc View all reports (admin only)
 * @access Private
 */
router.get("/", auth, getAllReports); // Protect this later for admins

module.exports = router;
// This code defines the report routes for the Hive application.
// It includes routes for reporting a post and viewing all reports.