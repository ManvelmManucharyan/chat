const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    room: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model("Users", userSchema);
module.exports = User;