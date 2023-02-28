const likeService = require("../services/likeService");

const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await likeService.likePost(userId, postId);
    return res.status(201).json({ message: "LIKE_POST_SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  likePost,
};
