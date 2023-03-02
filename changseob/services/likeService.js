const likeDao = require("../models/likeDao");

const likePost = async (userId, postId) => {
  const idValidation = new RegExp("^[0-9]+$");

  if (!idValidation.test(userId)) {
    const err = new Error("USER_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  if (!idValidation.test(postId)) {
    const err = new Error("POST_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const likePost = await likeDao.likePost(userId, postId);

  return likePost;
};

module.exports = {
  likePost,
};
