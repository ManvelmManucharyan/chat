const path = require("path");
const express = require("express");
const router = express.Router();
const UserService = require("../service/user.service");
const RoomService = require("../service/room.service");
const Auth = require("../auth/index");

const regPath = path.join(__dirname, "../public/register.html")
const roomCreatePath = path.join(__dirname, "../public/createRoom.html")
const logPath = path.join(__dirname, "../public/login.html")
const chatPath = path.join(__dirname, "../public/chat.html")

router.get("/create", async (req, res) => {
    res.sendFile(roomCreatePath)
})

router.post("/create", async (req, res) => {
    const hashPassword = await Auth.hash(req.body.password)
    await RoomService.createRoom(req.body.name, hashPassword)
    res.redirect("/login")
})

router.get("/register", async (req, res) => {
    res.sendFile(regPath)
})

router.post("/register", async (req, res) => {
    const hashPassword = await Auth.hash(req.body.password)
    await UserService.createUser(req.body.username, hashPassword)
    res.redirect("/login")
})

router.get("/login", async (req, res) => {
    res.sendFile(logPath)
})

router.post("/login", async (req, res) => {
    res.redirect("/chat")
})

router.get("/chat", async (req, res) => {
    res.sendFile(chatPath)
})

module.exports = router;