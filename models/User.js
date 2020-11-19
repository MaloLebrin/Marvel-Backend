const mongoose = require("mongoose");

const User = mongoose.model("User", {
    username: String,
    email: {
        type: String,
        unique: true
    },
    salt: String,
    token: String,
    hash: String
});

module.exports = User;