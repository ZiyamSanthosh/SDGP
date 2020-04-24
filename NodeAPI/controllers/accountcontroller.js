//import required modules
const bcrypt = require("bcrypt"); //module for password encryption
const { v4: uuidv4 } = require("uuid"); //module for userid generation
const validator = require("express-validator"); //module for validating user inputs
const emailExistence = require("email-existence"); //module for validating email existence

//import httpErr and userModel
const httpErr = require("../models/httpErr");
const userModel = require("../models/user");

//retrieve all the users from the database
const getUsers = async (req, res, next) => {
  let appusers;
  try {
    //retireve userid, fullname, email and registered date for users found
    appusers = await userModel.find({}, "userId fullName email  date");
  } catch (err) {
    return next(res.json({ error: err }));
  }

  //convert user objects to string format
  let obj = appusers.stringify;
  res.json({
    appusers: appusers.map((user) => user.toObject({ getters: true })),
  });
};

//find the user for a given user id
const findUser = async (req, res, next) => {
  //get user id
  const id = req.params.uId;

  let containuser;
  try {
    //retrieve the user from databse by userid
    containuser = await userModel.findOne({ userId: id });
  } catch (err) {
    return next(res.json({ error: err }));
  }

  //handle error for user not found in the database
  if (!containuser) {
    const error = new httpErr(
      "Invalid user credentials. Could not find user.",
      404
    );
    return next(res.json({ error: error.message }));
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
const registerUser = async (req, res, next) => {
  //handle invalid user inputs
  const errState = validator.validationResult(req);
  if (!errState.isEmpty()) {
    const error = new httpErr(
      "Invalid inputs provided. Please re-check your data"
    );
    return next(res.json({ error: error.message }));
  }

  const { fullName, email } = req.body;
  var found;
  try {
    //retrieve user from database using email
    found = await userModel.findOne({ email: email });
  } catch (err) {
    return next(res.json({ error: err }));
  }

  //return error message if user is already registered
  if (found) {
    const error = "Email already exists. Please Log in";
    return next(res.json({ error: error.message }));
  }

  let salt;
  let hashPass;
  //generate salt round num. for hashing password
  salt = await bcrypt.genSalt(10);
  try {
    //generate hash for user password
    hashPass = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    const error = new httpErr(
      "User registration failed. Plese try again later",
      500
    );
    return next(res.json({ error: error.message }));
  }

  var result = await doesEmailExist(email);
  console.log(result);

  //stop authorization if email provided does not exist
  if (!result) {
    const error = new httpErr(
      "Email does not exist, please re-check your email.",
      401
    );
    return next(res.status(404).json({ error: error.message }));
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
    return next(res.json({ error: err }));
  }
  res.status(201).json({
    userId: newUser.userId,
    email: newUser.email,
    fullName: newUser.fullName,
  });
};

//user sign-in
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  var containuser;
  try {
    //find and retrieve user
    containuser = await userModel.findOne({ email: email });
  } catch (err) {
    return next(res.json({ error: err }));
  }

  //stop authorization if user not found
  if (!containuser) {
    const error = new httpErr(
      "Invalid user credentials. Could not find user",
      404
    );
    return next(res.json({ error: error.message }));
  }

  let passwordstate = false;
  try {
    //decrypt and compare passwords
    passwordstate = await bcrypt.compare(
      req.body.password,
      containuser.password
    );
  } catch (err) {
    return next(res.json({ error: err }));
  }

  //error for invalid password
  if (!passwordstate) {
    const error = new httpErr("Invalid password, user login failed", 401);
    return next(res.json({ error: error.message }));
  }

  console.log("login successful");
  res
    .status(201)
    .json({ userId: containuser.userId, email: containuser.email });
};

//delete a user
const deleteUser = async (req, res, next) => {
  const { email, password } = req.body;

  var containuser;
  try {
    //find and retrieve user
    containuser = await userModel.findOne({ email: email });
  } catch (err) {
    return next(res.json({ error: err }));
  }

  //error for user not found
  if (!containuser) {
    const error = new httpErr(
      "Invalid user credentials, could not find user",
      404
    );
    return next(res.json({ error: error.message }));
  }

  let passwordstate = false;
  try {
    //decrypt and compare user passwords
    passwordstate = await bcrypt.compare(
      req.body.password,
      containuser.password
    );
  } catch (err) {
    return next(res.json({ error: err }));
  }

  //error for invalid password
  if (!passwordstate) {
    const error = new httpErr(
      "Invalid password, please re-check your password",
      401
    );
    return next(res.json({ error: error.message }));
  }

  try {
    //delete user from the database
    await userModel.deleteOne({ email: email }, (err, result, next) => {
      if (err) {
        return next(res.json({ error: err }));
      } else {
        console.log("user deletion successful");
        res
          .status(201)
          .json({ userId: containuser.userId, email: containuser.email });
      }
    });
  } catch (err) {
    const error = new httpErr(
      "User deletion failed, please try again later",
      401
    );
    return next(res.json({ error: error.message }));
  }
  console.log("Deletion successful");
  res.status(200).json({message: 'success'})
};

//modify a given user
const modifyUser = async (req, res, next) => {
  //obtain useremail and fullname
  const email = req.body.email;
  const fullName = req.body.fullName;
  let modfullName;

  var containuser;
  try {
    //find and retrieve user 
    containuser = await userModel.findOne({ email: req.body.email });
  } catch (err) {
    const error = new httpErr(
      "User modification failed, please try again",
      500
    );
    return next(res.json({ error: error.message }));
  }

  //error for user not found
  if (!containuser) {
    const error = new httpErr(
      "Invalid user credentials. Could not find user",
      404
    );
    return next(res.json({ error: error.message }));
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
          return res.status(400).json({ message: err });
        }
        return res.send("Succesfully saved.");
      }
    );
  } catch (err) {
    return res.status(400).json({ message: err });
  }

  console.log("User modification success");
  let modified = await userModel.findOne({ email: req.body.email });
  res.json({ fullName: modified.fullName, email: modified.email });
};

function doesEmailExist(email) {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, (err, resp) =>
      err ? reject(err) : resolve(resp)
    );
  })
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

//export functions
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
exports.modifyUser = modifyUser;
exports.getUsers = getUsers;
exports.findUser = findUser;
