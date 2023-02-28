// Built-in package
const http = require("http");

// 3rd-party package
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// custom package
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(PORT, HOST, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
