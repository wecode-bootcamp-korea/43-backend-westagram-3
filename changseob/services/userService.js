const userDao = require("../models/userDao");

const signUp = async (name, email, profileImage, password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const createUser = await userDao.createUser(
    name,
    email,
    profileImage,
    password
  );

  return createUser;
};

const getUserPosts = async (userId) => {
  const idValidation = new RegExp("^[0-9]+$");

  if (!idValidation.test(password)) {
    const err = new Error("USER_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const userPosts = await userDao.getUserPosts(userId);

  return userPosts;
};

module.exports = {
  signUp,
  getUserPosts,
};
