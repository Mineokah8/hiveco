const Report = require("../models/Report");
const Post = require("../models/Post");

exports.reportPost = async (req, res) => {
  try {
    const { reason } = req.body;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const report = new Report({
      reporter: req.user.id,
      post: postId,
      reason,
    });

    await report.save();

    res.status(201).json({ message: "Post reported successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional) Admin: Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter", "fullName email")
      .populate("post");

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
