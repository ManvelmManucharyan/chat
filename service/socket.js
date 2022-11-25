require("dotenv").config();
const socketio = require("socket.io");
const formatMessages = require("../utils/messages");
const UserService = require("./user.service");
const RoomService = require("./room.service");

const botName = process.env.BOT_NAME;

function socket(server) {
    const io = socketio(server);
    io.on("connection", async socket => {
        let user
        socket.on("joinRoom", async ({ username, password, roomPassword, room }) => {
            user = await UserService.updateUser({ username }, { room });
            socket.join(user.room);
            
            socket.emit("message", formatMessages(botName ,`Welcome to the ChatBoard ${user.username}`));
            
            socket.broadcast.to(user.room).emit("message", formatMessages(botName,`${user.username} has joind the chat`));
            
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: await UserService.getRoomUsers(user.room)
            })
        })

        socket.emit("roomNames", await RoomService.getAllRooms())
        
        socket.on("chatMessage", async (msg) => {
            io.to(user.room).emit("message", formatMessages(user.username, msg));
        })
        socket.on("content", async (content) => {
            await RoomService.updateRoom({ room: user.room}, { content })
        })
    
        socket.on("disconnect", async () => {
            user = await UserService.getCurrentUser({ username: user ? user.username : undefined });
            if(user) {
                await UserService.userLeave({ username: user.username})
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