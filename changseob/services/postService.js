const postDao = require("../models/postDao");

const writePost = async (title, content, imageUrl, userId) => {
  const idValidation = new RegExp("^[0-9]+$");

  if (!idValidation.test(userId)) {
    const err = new Error("USER_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const writePost = await postDao.writePost(title, content, imageUrl, userId);

  return writePost;
};

const getPosts = async () => {
  return await postDao.getPosts();
};

const updatePost = async (postId, content) => {
  const idValidation = new RegExp("^[0-9]+$");

  if (!idValidation.test(postId)) {
    const err = new Error("POST_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const updatePost = await postDao.updatePost(postId, content);

  return updatePost;
};

const deletePost = async (postId) => {
  const idValidation = new RegExp("^[0-9]+$");

  if (!idValidation.test(postId)) {
    const err = new Error("POST_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const deletePost = await postDao.deletePost(postId);

  return deletePost;
};

module.exports = {
  writePost,
  getPosts,
  updatePost,
  deletePost,
};
