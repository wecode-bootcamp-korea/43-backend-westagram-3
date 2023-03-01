const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, profileImage, password } = req.body;

    if (!name || !email || !profileImage || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, profileImage, password);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const accessToken = await userService.signIn(email, password);
    return res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const userPosts = await userService.getUserPosts(userId);
    return res.status(200).json({ data: userPosts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
  getUserPosts,
};
