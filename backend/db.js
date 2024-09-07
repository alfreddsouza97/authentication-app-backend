const mongoose = require("mongoose");


mongoose.connect("your-mongo-db-url");


const signupSchema = mongoose.Schema({

    email: String,

    password: String
})

const Users = mongoose.model('Users', signupSchema);

module.exports = {

    Users
}