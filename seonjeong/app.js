const http = require("http");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

const app = express();

const dotenv = require("dotenv");

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

/*app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});*/

app.post("/users", async (req, res) => {
  const { name, email, profileImage, password } = req.body;

  await dataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
      ) VALUES (?, ?, ?, ?);`,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "successfully created" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
