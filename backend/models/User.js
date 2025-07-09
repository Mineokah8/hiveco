const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w.-]+@[\w.-]+\.(edu\.ng)$/, "Email must be a valid university address"],
  },
  password: { type: String, required: true },
  university: { type: String, required: true },
  department: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  bio: { type: String },
  interests: [{ type: String }],
  profilePic: { type: String },
  socialLinks: { type: Map, of: String },
  isSuspended: { type: Boolean, default: false },
  warnings: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
