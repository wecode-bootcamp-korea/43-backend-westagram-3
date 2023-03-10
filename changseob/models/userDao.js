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

const getUserPosts = async (userID) => {
  try {
    return await appDataSource.query(
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
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserPosts,
};
