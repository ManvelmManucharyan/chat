const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    content: {
        type: String,
    }
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;