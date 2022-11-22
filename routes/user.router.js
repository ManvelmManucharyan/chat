const path = require("path");
const express = require("express");
const router = express.Router();
const UserService = require("../service/user.service");
const RoomService = require("../service/room.service");

const regPath = path.join(__dirname, "../public/register.html")
const roomCreatePath = path.join(__dirname, "../public/createRoom.html")
const logPath = path.join(__dirname, "../public/index.html")

router.get("/create", async (req, res) => {
    res.sendFile(roomCreatePath)
})

router.post("/create", async (req, res) => {
    await RoomService.createRoom(req.body.name, req.body.password)
    res.redirect("/login")
})

router.get("/register", async (req, res) => {
    res.sendFile(regPath)
})

router.post("/register", async (req, res) => {
    await UserService.createUser(req.body.username, req.body.password)
    res.redirect("/login")
})

router.get("/login", async (req, res) => {
    res.sendFile(logPath)
})

router.post("/login", async (req, res) => {
    
})

module.exports = router;