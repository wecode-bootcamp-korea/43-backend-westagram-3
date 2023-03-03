// 3rd-party package
const jwt = require("jsonwebtoken");

// custom package
const postService = require("../services/postService");

const writePost = async (req, res) => {
  try {
    const accessToken = req.headers.authorization;
    const { title, content, imageUrl } = req.body;

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "INVALID_ACCESS_TOKEN" });
    }

    const userId = decoded.id;

    if (!title || !content || !imageUrl) {
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
