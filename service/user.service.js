const { User } = require("../model/index");


class UserService {
    static async createUser (id, username, room) {
        const newUser = new User({ id, username, room });
        return await newUser.save();
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