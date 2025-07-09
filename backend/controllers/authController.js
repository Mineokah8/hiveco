const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, university, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      university,
      department,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const verificationLink = `${process.env.CLIENT_URL}/verify/${token}`;

    await sendEmail(email, "Verify your Hive account", `
      <p>Hi ${fullName},</p>
      <p>Click the link below to verify your email and activate your Hive account:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `);

    res.status(201).json({ message: "Registration successful. Please check your email to verify your account." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: "Invalid verification link" });
    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    res.status(400).json({ message: "Verification failed or expired token" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        university: user.university,
        department: user.department,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { fullName, bio, interests, university, department, socialLinks } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.file) {
      user.profilePic = req.file.path;
    }

    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.interests = interests ? interests.split(",") : user.interests;
    user.university = university || user.university;
    user.department = department || user.department;
    user.socialLinks = socialLinks || user.socialLinks;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
