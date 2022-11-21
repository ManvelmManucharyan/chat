const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../auth/auth");


router.post("/register", auth.authenticateToken, UserController.logout);

module.exports = router;