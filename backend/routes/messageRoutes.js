const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { sendMessage, getConversations } = require("../controllers/messageController");

/**
 * @route POST /api/messages
 * @desc Send a message to a seller
 * @access Private
 */
router.post("/", auth, sendMessage);

/**
 * @route GET /api/messages
 * @desc Get messages where user is sender or receiver
 * @access Private
 */
router.get("/", auth, getConversations);

module.exports = router;
