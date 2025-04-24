const mongoose = require('mongoose');

const { Schema, model } = mongoose;




const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: String, // stores path to uploaded file
    password: { type: String, required: true },
}, {timestamps:true,versionKey:false});




const userModal = model("user",userSchema);


module.exports = userModal;