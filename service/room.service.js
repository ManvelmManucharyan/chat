const { Room } = require("../model/index");
const uniqid = require("uniqid");

class RoomService {
    static async createRoom (name, password) {
        const id = uniqid();
        const newRoom = new Room({id, name, password });
        return await newRoom.save();
    }

    static async updateRoom (id, content) {
        await Room.findByIdAndUpdate({id}, {content});
    }

    static async getAllRooms () {
        return await Room.find({});
    }
}

module.exports = RoomService;