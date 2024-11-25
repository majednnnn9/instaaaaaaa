const mongoose = require("mongoose")

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        unique: [true, "Brand must be unique"],
        minlength: [3, "Too short brand name"],
        maxlength: [32, "Too long brand name"]
    },
    password: {
        type: String,
        required: [true, "name required"],
        unique: [true, "Brand must be unique"],
        minlength: [3, "Too short brand name"],
        maxlength: [32, "Too long brand name"]
    },
    RefToken : {
        type: String,
        required: [true, "name required"],
        unique: [true, "Brand must be unique"],
    },
    image: String,
}, { timestamps: true },
)

// Create Model
const UserModel = mongoose.model("Users", UserSchema)

module.exports = UserModel