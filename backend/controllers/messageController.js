const Message = require("../models/Message");
const notifyUser = require("../utils/notifyUser");

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, text, listingId } = req.body;

    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      text,
      listing: listingId,
    });

    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }]
    })
      .sort({ createdAt: -1 })
      .populate("sender", "fullName profilePic")
      .populate("receiver", "fullName profilePic")
      .populate("listing", "title");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const notifyUser = require("../utils/notifyUser");

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, text, listingId } = req.body;

    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      text,
      listing: listingId,
    });

    await message.save();

    // Notify the receiver
    await notifyUser({
      userId: receiverId,
      type: "message",
      message: `You received a new message from ${req.user.fullName}`,
      link: "/messages",
    });

    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

