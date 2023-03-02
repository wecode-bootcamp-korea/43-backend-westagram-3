const commonDao = require("./commonDao");
const appDataSource = commonDao.appDataSource;

const writePost = async (title, content, imageUrl, userId) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO posts(
        title,
        content,
        image_url,
        user_id
      ) VALUES (?, ?, ?, ?);
    `,
      [title, content, imageUrl, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getPosts = async () => {
  try {
    return await appDataSource.query(
      `
      SELECT 
        users.id AS userId,
        users.profile_image AS userProfileImage,
        posts.id AS postingId,
        posts.image_url AS postingImageUrl,
        posts.content AS postingContent
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
    `
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const updatePost = async (postId, content) => {
  try {
    return await appDataSource.query(
      `
      UPDATE posts 
      SET content = ?
      WHERE id = ?
    `,
      [content, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    return await appDataSource.query(
      `
      DELETE 
      FROM posts 
      WHERE id = ?
    `,
      [postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  writePost,
  getPosts,
  updatePost,
  deletePost,
};
