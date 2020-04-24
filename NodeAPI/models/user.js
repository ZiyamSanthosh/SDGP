//user schema
const mongoose = require('mongoose');

//plugin for unique validation
const validator = require('mongoose-unique-validator');

//user schema for user authentication and handling
const userSchema = mongoose.Schema({
    userId: {type:String, required:true, unique:true},
    fullName:{type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true, minlength:8},
    date: {type:String, required:true}
});

//apply the plugin for unique-validation
userSchema.plugin(validator);

//export user schema
module.exports = mongoose.model('user', userSchema, 'registeredUsers');