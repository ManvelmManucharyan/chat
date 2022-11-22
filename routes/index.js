const express = require("express");
const router = express.Router();
const userRout = require("./user.router");

router.use("/", userRout);

module.exports = router;