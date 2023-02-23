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

app.listen(PORT, HOST, function () {
  console.log(`Server is listening on ${PORT}`);
});
