// 3rd-party package
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// custom package
const userDao = require("../models/userDao");

const makeHash = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(password, salt);
};

const checkHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const signUp = async (name, email, profileImage, password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  const emailValidation = new RegExp(
    "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  if (!emailValidation.test(email)) {
    const err = new Error("EMAIL_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await makeHash(password);

  const createUser = await userDao.createUser(
    name,
    email,
    profileImage,
    hashedPassword
  );

  return createUser;
};

const signIn = async (email, password) => {
  const emailValidation = new RegExp(
    "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
  );

  if (!emailValidation.test(email)) {
    const err = new Error("EMAIL_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const user = await userDao.getUser(email);
  const isValidPassword = await checkHash(password, user.password);

  if (!isValidPassword) {
    const err = new Error("INVALID_USER");
    err.statusCode = 409;
    throw err;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

  return accessToken;
};

const getUserPosts = async (userId) => {
  const idValidation = new RegExp("^[0-9]+$");

  if (!idValidation.test(userId)) {
    const err = new Error("USER_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const userPosts = await userDao.getUserPosts(userId);

  return userPosts;
};

module.exports = {
  signUp,
  signIn,
  getUserPosts,
};
