const { User } = require("../model/index");
const uniqid = require("uniqid");

class UserService {
    static async createUser (username, password, room) {
        const id = uniqid()
        const newUser = new User({id, username, password, room });
        return await newUser.save();
    }

    static async updateUser (findby, update) {
        return await User.findOneAndUpdate(findby, update, {returnDocument: 'after'});
    }
    
    static async getCurrentUser(findBy) {
        return await User.findOne(findBy)
    }
    
    static async userLeave(findBy) {
        return await User.findOneAndUpdate(findBy, { room: null });
    }
    
    static async getRoomUsers(room) {
        return await User.find({ room });
    }
}

module.exports = UserService;