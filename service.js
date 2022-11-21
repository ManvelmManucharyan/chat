const { User } = require("./model/index");

async function createUser (id, username, room) {
    const newUser = new User({ id, username, room });
    await newUser.save();
    const user = await User.find({});
    console.log(user);
}

module.exports = createUser;