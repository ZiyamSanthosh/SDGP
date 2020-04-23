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

//register a user
const registerUser = async (req, res, next) => {

    //throw error for invalid user inputs
    const errState = validator.validationResult(req);
    if (!errState.isEmpty()) {
        return next(new httpErr('Invalid inputs provided, please re-check your data'));
    }

    const { fullName, email } = req.body;
    var found;
    try {
        //retrieve user from database querying by email
        found = await userModel.findOne({ email: email });
    }
    catch (err) {
        //throw error for database retrieve errors
        return next(new httpErr('Signup failed, Please try again', 500));
    }

    if (found) {
        //throw error if user is already registered
        return next(new httpErr("Email already exists. Please Log in"));
    }





    let salt;
    let hashPass;
    //generate salt round num. for hashing password
    salt = await bcrypt.genSalt(10);
    try {
        //generate hash for user password
        hashPass = await bcrypt.hash(req.body.password, salt);
    }
    catch (err) {
        return next(new httpErr('User regsitration failed . Please try again later', 500));
    }


    // var result = emailValidator.validate(email);
    // console.log(result);
    // var responce;

    //  emailExist.check(email, function (error, res,callback) {
    //     console.log(res);   // we have to return this res somehow
    //     responce = res;

    // });

   // generate unique user id
    const uniqueId = uuidv4();

    //create new user
    const newUser = new userModel({
        userId: uniqueId,
        fullName,
        email,
        password: hashPass,
        date: new Date()
    });

    try {
        //send user object to the database
        await newUser.save();
    }
    catch (err) {
        return next(new httpErr('User registration failed. Please try again later', 500));
    }
    res.status(201).json({ userId: newUser.userId, email: newUser.email, fullName: newUser.fullName });
};


//user sign-in
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    var containuser;
    try {
        //find and retrieve user form the databse by email
        containuser = await userModel.findOne({ email: email });
    }
    catch (err) {
        return next(new httpErr('Login failed, Please try again', 500));
    }


    if (!containuser) {
        //throw error if user is not found on the database
        return next(new httpErr('Invalid user credentials. Could not find user.', 401));
    }

    let passwordstate = false;
    try {
        //decrypt and compare passwords
        passwordstate = await bcrypt.compare(req.body.password, containuser.password);
    }
    catch (err) {
        return next(new httpErr('User login failed. Please check your password and try again ', 500));
    }

    if (!passwordstate) {
        //throw error for invalid passwords
        return next(new httpErr('Invalid password, user login failed', 401));
    }

    console.log("login successful")
    res.status(201).json({ userId: containuser.userId, email: containuser.email });

};

//export functions
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.findUser = findUser;

