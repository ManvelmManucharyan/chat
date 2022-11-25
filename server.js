require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const connect = require("./db/index");
const socket = require("./service/socket");
const rout = require("./routes/index");
const bodyParser = require("body-parser")

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", rout)
socket(server);
connect()

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));