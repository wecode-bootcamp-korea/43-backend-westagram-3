const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { DataSource } = require("typeorm");

const database = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

database.initialize().then(() => {
  console.log("Data Source has been initialize!");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

//health check
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

//create user
app.post("/users/signup", async (req, res) => {
  try{
  const {name, email, profile_image, password} = req.body;

  await database.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
      ) VALUES(?,?,?,?);
    `,
    [name, email, profile_image, password]   
  );
  return res.status(201).json({message : "userCreated"})
  }catch(err){
    console.log("error")
  }
})


const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
