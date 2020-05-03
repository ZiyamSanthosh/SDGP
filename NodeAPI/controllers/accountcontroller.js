//import required modules
const bcrypt = require("bcrypt"); //module for password encryption
const { v4: uuidv4 } = require("uuid"); //module for userid generation
const validator = require("express-validator"); //module for validating user inputs
//module for email verification
const kickbox = require('kickbox').client('live_a9ca505b8adba9b36222a1e20825604e67c0e2e0cea33f26461bea33d2a3fd63').kickbox();

//import serverErrand userModel
const serverErr= require("../models/serverErr");
const userModel = require("../models/user");

//retrieve all the users from the database
const getUsers = async (req, res) => {
  let appusers;
  try {
    //retireve userid, fullname, email and registered date for users found
    appusers = await userModel.find({}, "userId fullName email  date");
  } catch (err) {
    const error = new serverErr('Error occured, Could not get users, please try again.', 500);
    return res.json({ error: error.message });
  }

  //convert user objects to string format
  //let obj = appusers.stringify;
  res.json({
    appusers: appusers.map((user) => user.toObject({ getters: true })),
  });
};

//find the user for a given user id
const findUser = async (req, res) => {
  //get user id
  const id = req.params.uId;

  let containuser;
  try {
    //retrieve the user from databse by userid
    containuser = await userModel.findOne({ userId: id });
  } catch (err) {
    const error = new serverErr('Error occured. Could not find user, please try again', 500);
    return res.json({ error: error.message });
  }

  //handle error for user not found in the database
  if (!containuser) {
    const error = new serverErr(
      "Invalid user credentials. Could not find user.",
      404
    );
    return res.json({ error: error.message });
  }

  console.log("User found on the database");
  //return user as a JSON object
  res.status(201).json({
    userId: containuser.userId,
    fullName: containuser.fullName,
    email: containuser.email,
    date: containuser.date,
  });
};

//register a user
const registerUser = async (req, res) => {
  //handle invalid user inputs
  const errState = validator.validationResult(req);
  if (!errState.isEmpty()) {
    const error = new serverErr(
      "Invalid inputs provided. Please re-check your information"
    );
    return res.json({ error: error.message });
  }

  const { fullName, email } = req.body;
  var found;
  try {
    //retrieve user from database using email
    found = await userModel.findOne({ email: email });
  } catch (err) {
    const error = new serverErr('Error, Could not find user. Please try again', 500);
    return res.json({ error: error.message });
  }

  //return error message if user is already registered
  if (found) {
    const error = new serverErr("Email already exists. Please Log in");
    return res.json({ error: error.message });
  }

  //user email verification
  let verified;
  try{
    verified = await verifyEmail(email);
    console.log(verified)
  }
  catch(err){
    console.log(err);
    const error = new serverErr('Could not verify email. Please check your internet conenction and try again' , 500);
    return res.json({error: error.message});
    
  }

  if(verified.result!='deliverable' || verified.result == ''){
    const error = new serverErr('Invalid email provided by the user. Please re-check your email', 402);
    return res.json({ error: error.message });
  }

  //password encryption for registering user
  let salt;
  let hashPass;
  //generate salt round num. for hashing password
  salt = await bcrypt.genSalt(10);
  try {
    //generate hash for user password
    hashPass = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    const error = new serverErr(
      "User registration failed. Plese try again later",
      500
    );
    return res.json({ error: error.message });
  }

  // generate unique user id
  const uniqueId = uuidv4();

  //create new user
  const newUser = new userModel({
    userId: uniqueId,
    fullName,
    email,
    password: hashPass,
    date: new Date(),
  });

  try {
    //store user in the database
    await newUser.save();
  } catch (err) {
    const error = new serverErr('Error, could not register user. Please try again', 500);
    return res.json({ error: error.message });
  }
  res.status(201).json({
    userId: newUser.userId,
    email: newUser.email,
    fullName: newUser.fullName,
  });
};

//user sign-in
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  var containuser;
  try {
    //find and retrieve user
    containuser = await userModel.findOne({ email: email });
  } catch (err) {
    const error = new serverErr('Error, could not find user. Please try again', 500);
    return res.json({ error: error.message });
  }

  //stop authorization if user not found
  if (!containuser) {
    const error = new serverErr(
      "Invalid user credentials. Could not find user",
      404
    );
    return res.json({ error: error.message });
  }

  let passwordstate = false;
  try {
    //decrypt and compare passwords
    passwordstate = await bcrypt.compare(
      req.body.password,
      containuser.password
    );
  } catch (err) {
    const error = new serverErr('Error, could not authenticate user. Please try again');
    return res.json({ error: error.message });
  }

  //error for invalid password
  if (!passwordstate) {
    const error = new serverErr("Invalid password, user login failed", 401);
    return res.json({ error: error.message });
  }

  console.log("login successful");
  res
    .status(201)
    .json({ userId: containuser.userId, email: containuser.email });
};

//delete a user
const deleteUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  var containuser;
  try {
    //find and retrieve user
    containuser = await userModel.findOne({ email: email });
  } catch (err) {
    const error = new serverErr('Error, could not find user. Please try again ', 500);
    return res.json({ error: error.message });
  }

  //error for user not found
  if (!containuser) {
    const error = new serverErr(
      "Invalid user credentials, could not find user",
      404
    );
    return res.json({ error: error.message });
  }

  let passwordstate = false;
  try {
    //decrypt and compare user passwords
    passwordstate = await bcrypt.compare(
      password,
      containuser.password
    );
  } catch (err) {
    const error = new serverErr('Error, could not authenticate user. Please try again', 500);
    return res.json({ error: error.message });
  }

  //error for invalid password
  if (!passwordstate) {
    const error = new serverErr(
      "Invalid password, please re-check your password",
      401
    );
    return res.json({ error: error.message });
  }

  try {
    //delete user from the database
    await userModel.deleteOne({ email: email }, (err) => {
      if (err) {
        const error = new serverErr('Error, could not delete user. Please try again', 500);
        return res.json({ error: error.message });
      } else {
        console.log("user deletion successful");
        res
          .status(201)
          .json({ userId: containuser.userId, email: containuser.email });
      }
    });
  } catch (err) {
    const error = new serverErr(
      "User deletion failed, please try again later",
      401
    );
    return res.json({ error: error.message });
  }
  console.log("Deletion successful");
};

//modify a given user
const modifyUser = async (req, res) => {
  //obtain useremail and fullname
  const email = req.body.email;
  const fullName = req.body.fullName;
  let modfullName;

  var containuser;
  try {
    //find and retrieve user 
    containuser = await userModel.findOne({ email: req.body.email });
  } catch (err) {
    const error = new serverErr(
      "User modification failed, please try again",
      500
    );
    return res.json({ error: error.message });
  }

  //error for user not found
  if (!containuser) {
    const error = new serverErr(
      "Invalid user credentials. Could not find user",
      404
    );
    return res.json({ error: error.message });
  }

  //check for user input
  if (fullName == null || fullName == "") {
    modfullName = containuser.fullName;
  } else {
    modfullName = fullName;
  }

  try {
    userModel.findOneAndUpdate(
      { email: email },
      { fullName: modfullName },
      { upsert: true, useFindAndModify: false },
      function (err, doc) {
        if (err) {
          const error = new serverErr('Error, could not modify user. Please try again', 500);
          return res.json({ message: error.message });
        }
        return res.send("Succesfully saved.");
      }
    );
  } catch (err) {
    const error = new serverErr('Error, could not modify user. Please try again', 500);
    return res.json({ message: error.message });
  }

  console.log("User modification success");
};

//function to check email existence
function verifyEmail(email){
  return new Promise((resolve, reject) => {
    kickbox.verify(email, (err, resp) => err? reject(err) : resolve(resp));
  })
    .then(resp => {
      return Promise.resolve(resp.body);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

//export functions
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
exports.modifyUser = modifyUser;
exports.getUsers = getUsers;
exports.findUser = findUser;
