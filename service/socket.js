require("dotenv").config();
const socketio = require("socket.io");
const formatMessages = require("../utils/messages");
const UserService = require("./user.service");

const botName = process.env.BOT_NAME;

function socket(server) {
    const io = socketio(server);
    io.on("connection", socket => {
        socket.on("joinRoom", async ({ username, room }) => {
            const user = await UserService.createUser(socket.id, username, room);
            socket.join(user.room);
    
            socket.emit("message", formatMessages(botName ,`Welcome to the ChatBoard ${user.username}`));
    
            socket.broadcast.to(user.room).emit("message", formatMessages(botName,`${user.username} has joind the chat`));
    
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: await UserService.getRoomUsers(user.room)
            })
        
        })
    
        socket.on("chatMessage", async (msg) => {
            const user = await UserService.getCurrentUser(socket.id);
            io.to(user.room).emit("message", formatMessages(user.username, msg));
        })
    
        socket.on("disconnect", async () => {
            const user = await UserService.userLeave(socket.id);
    
            if(user) {
                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: await UserService.getRoomUsers(user.room)
                })
                io.to(user.room).emit("message", formatMessages(botName,`${user.username} has left the chat`));
            }
        })
    });
}

module.exports = socket;