require("dotenv").config();
const mongoose = require("mongoose");

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// const url = `mongodb+srv://user:1234@cluster0.qjynhbe.mongodb.net/chat`

function connect(){
    mongoose.connect(url, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', error => console.error(error));
    db.once('open', ()=> console.log("Connected to database"));
}

module.exports = connect;