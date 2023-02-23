// Built-in package

// 3rd-party package
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

// custom package

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
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

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

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
