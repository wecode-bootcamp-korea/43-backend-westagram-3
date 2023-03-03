const commonDao = require("./commonDao");
const appDataSource = commonDao.appDataSource;

const createUser = async (name, email, profileImage, password) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO users(
        name,
        email,
        profile_image,
        password
      ) VALUES (?, ?, ?, ?);
    `,
      [name, email, profileImage, password]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUser = async (email) => {
  try {
    const [user] = await appDataSource.query(
      `SELECT
        id,
        password
      FROM users
      WHERE email = ?
    `,
      [email]
    );

    return user;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserPosts = async (userID) => {
  try {
    const [userPosts] = await appDataSource.query(
      `
      SELECT
      users.id AS userId,
      users.profile_image AS userProfileImage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "postingId", posts.id,
          "postingImageUrl", posts.image_url,
          "postingContent", posts.content
        )
      ) as postings
      FROM users
      INNER JOIN posts ON posts.user_id = users.id
      WHERE users.id = ?
      GROUP BY users.id
    `,
      [userID]
    );

    return userPosts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserPosts,
};
