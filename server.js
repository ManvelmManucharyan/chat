require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessages = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/user");
const createUser = require("./service");
const connect = require("./db/index")

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = process.env.BOT_NAME;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    socket.on("joinRoom", async ({ username, room }) => {
        const user = await createUser(socket.id, username, room);
        socket.join(user.room);

        socket.emit("message", formatMessages(botName ,`Welcome to the ChatBoard ${user.username}`));

        socket.broadcast.to(user.room).emit("message", formatMessages(botName,`${user.username} has joind the chat`));

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    
    })

    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessages(user.username, msg));
    })

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            })
            io.to(user.room).emit("message", formatMessages(botName,`${user.username} has left the chat`));
        }
    })
});
// const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// const mongoose = require('mongoose');
// mongoose.connect(url, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', ()=> console.log("Connected to databse"));

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));