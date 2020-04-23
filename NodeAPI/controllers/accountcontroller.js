//var emailExist = require('email-existence');
var emailValidator = require("email-validator");
//import required modules
const bcrypt = require('bcrypt');  //module for password encryption
const { v4: uuidv4 } = require('uuid');   //module for userid generation
const validator = require('express-validator');   //module for validating user inputs

//import httpErr and userModel
const httpErr = require('../models/httpErr');
const userModel = require('../models/user');
// const verifier = new mailverifier('at_T9vDzzLM3Mw3hpNAblQHbcA35h6NC');


//retrieve all the users from the database
const getUsers = async (req, res, next) => {
    let appusers;
    try {
        //retireve userid, fullnam, email and registered date for users found
        appusers = await userModel.find({}, 'userId fullName email  date');
    }
    catch (err) {
        //throw new httpErr 
        return next(new httpErr('Failed to get users, please try again'));
    }
    //convert user objects to string format
    let obj = appusers.stringify
    res.json({ appusers: appusers.map(user => user.toObject({ getters: true })) });
};

//find the user for a given user id
const findUser = async (req, res, next) => {
    //get user id
    const id = req.params.uId;

    let containuser;
    try {
        //retrieve the user from databse by userid
        containuser = await userModel.findOne({ userId: id });
    }
    catch (err) {
        //handle database retrieve error
        return next(new httpErr('Could not find user, please try again', 500));
    }

    //throw error if user is not found
    if (!containuser) {
        return next(new httpErr('Invalid user credentials. Could not find user.', 401));
    }

    console.log("User found on the database")
    //return user as a JSON object
    res.status(201).json({ userId: containuser.userId, fullName: containuser.fullName, email: containuser.email, date: containuser.date });

};



//export functions
exports.getUsers = getUsers;
exports.findUser = findUser;

