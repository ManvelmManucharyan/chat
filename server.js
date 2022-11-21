require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const connect = require("./db/index");
const socket = require("./service/socket");

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/")

socket(server);
connect()

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));