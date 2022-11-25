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
    password: {
        type: String,
    },
    room: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model("Users", userSchema);
module.exports = User;