// Built-in package

// 3rd-party package
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

// custom package

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.post("/users", async (req, res) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `
    INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);`,
    [name, email, profileImage, password]
  );

  res.status(201).json({ message: "userCreated" });
});

app.post("/posts", async (req, res) => {
  const { title, content, imageUrl, userId } = req.body;

  await appDataSource.query(
    `
    INSERT INTO posts (
      title,
      content,
      image_url,
      user_id
    ) VALUES (?, ?, ?, ?);`,
    [title, content, imageUrl, userId]
  );

  res.status(201).json({ message: "postCreated" });
});

app.get("/posts", async (req, res) => {
  await appDataSource.query(
    `
    SELECT 
      users.id AS userId,
      users.profile_image AS userProfileImage,
      posts.id AS postingId,
      posts.image_url AS postingImageUrl,
      posts.content AS postingContent
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
  `,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

// Needs to be updated
app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  await appDataSource.query(
    `
    SELECT
      users.id AS userId,
      users.profile_image AS userProfileImage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "postingId, posts.id,
          "postingImageUrl", posts.image_url,
          "postingContent", posts.content
          )
      ) as postings
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE users.id = ${userId}
    GROUP BY users.id
    `,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

app.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  await appDataSource.query(
    `
    UPDATE posts
    SET
      content=?
    WHERE id=${postId}
  `,
    [content]
  );

  await appDataSource.query(
    `
    SELECT 
      users.id AS userId,
      users.name AS userName,
      posts.id AS postingId,
      posts.title AS postingTitle,
      posts.content AS postingContent
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    WHERE posts.id = ${postId};
  `,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  await appDataSource.query(
    `
    DELETE FROM posts
    WHERE id=${postId}
    `
  );

  res.status(200).json({ message: "postingDeleted" });
});

app.post("/likes", async (req, res) => {
  const { userId, postId } = req.body;

  await appDataSource.query(
    `
    INSERT INTO likes(
      user_id,
      post_id
    ) VALUES (?, ?);`,
    [userId, postId]
  );

  res.status(201).json({ message: "likeCreated" });
});

app.listen(PORT, HOST, function () {
  console.log(`Server is listening on ${PORT}`);
});
