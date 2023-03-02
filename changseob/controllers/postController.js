const postService = require("../services/postService");

const writePost = async (req, res) => {
  try {
    const { title, content, imageUrl, userId } = req.body;

    if (!title || !content || !imageUrl || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.writePost(title, content, imageUrl, userId);
    return res.status(201).json({ message: "WRITE_POST_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json({ data: posts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.updatePost(postId, content);
    return res.status(200).json({ message: "UPDATE_POST_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.deletePost(postId);
    return res.status(204).json({ message: "DELETE_POST_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  writePost,
  getPosts,
  updatePost,
  deletePost,
};
