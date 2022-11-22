const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        requied: true
    },
    username: {
        type: String,
    },
    room: {
        type: String,
    },
    socketId: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model("Users", userSchema);
module.exports = User;