const { User } = require("../model/index");
const uniqid = require("uniqid");

class UserService {
    static async createUser (username, room) {
        const id = uniqid()
        const newUser = new User({id, username, room });
        return await newUser.save();
    }

    static async updateUser (id, socketId) {
        await User.findByIdAndUpdate({id}, {socketId});
    }
    
    static async getCurrentUser(id) {
        return await User.findOne({ id });
    }
    
    static async userLeave(id, room) {
        return await User.findOneAndDelete({ id })
    }
    
    static async getRoomUsers(room) {
        return await User.find({ room });
    }
}

module.exports = UserService;