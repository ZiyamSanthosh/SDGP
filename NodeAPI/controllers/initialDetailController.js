/*IMPORTING MODULES------------------------------------------------------------------*/
const express = require("express");
const router = express.Router();
const Post = require("../models/initialDetailModel");
const Model = require("../models/trackingModel");
const AveragePrediction = require('../models/avgPredictionModel');    // connecting avgPredictionModel
const UserDetail = require('../models/userDetailModel')    // connecting userDetailModel
var bmi = require("bmi-calculator-function");
const axios = require("axios");

/*ROUTES------------------------------------------------------------------*/

/*GET ROUTE-------------------------------------*/

//GET Back all the initial details
exports.getAll = async function (req, res) {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
 

//GET Back initial detail related to specific user id
exports.getById = async function (req, res) {
  try {
    var allData = await Post.find({});

    for (let x = 0; x <= allData.length - 1; x++) {
      if (allData[x].UserID == req.params.user_id) {
        var post = allData[x];
        return res.json(post);
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};


/*POST ROUTE-------------------------------------*/

//POST Route to send the initial form data to the database

exports.postInitialDetails = function (req, res) {
  //console.log(req.body);

  //Initial Form details which are sending for the flask API 
  let postData = {
    Age: age(req.body.dob),
    BMI: Number.parseFloat(bmi.bmi(req.body.height, req.body.weight).bmi),
    Breast_Feeding: yesNoConversion(req.body.breastFeeding),
    Marital_Status: maritalStatus(req.body.maritalStatus),
    Alcohol: yesNoConversion(req.body.alcohol),
    Smoking: yesNoConversion(req.body.smoking),
    Breast_Cancer_History: yesNoConversion(req.body.breastCancerHistory),
    Age_at_first_period: req.body.ageAtFirstPeriod,
    Menstrual_Cycle: menstrualCycle(req.body.menstrualCycle),
  };


  const data = postData;
 // let predictionValue;

 //Calling getPrediction function
  let prediction = getPrediction(data)
    .then((response) => {
      console.log(response.data);

      //Initial Details stored in the DB (Converted Categorical data and user-define functions)
      const post = new Post({
        UserID: req.body.userId,
        Age: age(req.body.dob),
        BMI: bmi.bmi(req.body.height, req.body.weight).bmi,
        Breast_Feeding: yesNoConversion(req.body.breastFeeding),
        Marital_Status: maritalStatus(req.body.maritalStatus),
        Alcohol: yesNoConversion(req.body.alcohol),
        Smoking: yesNoConversion(req.body.smoking),
        Breast_Cancer_History: yesNoConversion(req.body.breastCancerHistory),
        Age_at_first_period: req.body.ageAtFirstPeriod,
        Menstrual_Cycle: menstrualCycle(req.body.menstrualCycle),
        Prediction: response.data,
      });

      let avgPrediction = new AveragePrediction();
      var today = new Date();
      var day = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + (today.getDate());

      avgPrediction.UserID = req.body.userId;
      avgPrediction.PredictedDate = day;
      avgPrediction.AveragePrediction = response.data;

      //Sending initial details to the Track Collection in the DB
      var Track = new Model();

      Track.UserID = req.body.userId;
      Track.Age = age(req.body.dob);
      Track.BMI = bmi.bmi(req.body.height, req.body.weight).bmi;
      Track.Marital_Status = maritalStatus(req.body.maritalStatus);
      Track.Breast_Cancer_History = yesNoConversion(
        req.body.breastCancerHistory
      );
      Track.Smoking = yesNoConversion(req.body.smoking);
      Track.Alcohol = yesNoConversion(req.body.alcohol);
      Track.BreastFeeding = yesNoConversion(req.body.breastFeeding);
      Track.Age_at_first_period = req.body.ageAtFirstPeriod;
      Track.Menstrual_Cycle = menstrualCycle(req.body.menstrualCycle);

      var userDetails = new UserDetail();
      userDetails.UserID = req.body.userId;
      userDetails.DOB = req.body.dob;
      userDetails.Height=req.body.height;
      userDetails.Weight =req.body.weight;

      console.log(userDetails);

      const savedPost = post.save().catch((err) => {
        return res.status(400).json({ message: err });
      });

      const savedPrediction = avgPrediction.save().catch((err) => {
        return res.status(400).json({ message: err });
      });

      const save = Track.save().catch((err) => {
        return res.status(400).json({ message: err });
      });

      const saveUserDetails = userDetails.save().catch((err) => {
        return res.status(400).json({ message: err });
      });

      //Returning the result status for predictions (intial details)
      return res.send({ result: predictionRange(response.data) });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Something went wrong");
    });
};

/*DELETE ROUTE-------------------------------------*/

//Deleting initial details related to a specific userid
exports.deleteInitialDetails = async function (req, res) {
  try {
    console.log(req.params.user_id);
    const removedPost = await Post.remove({ UserID: req.params.user_id });
    return res.json(removedPost);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};


/*UPDATE ROUTE-------------------------------------*/

//Updating initial details related to a specific userid
exports.updateInitialDetails = async function (req, res) {

  //Initial details with Updated values 
  try {
    let postData = {
      Age: age(req.body.dob),
      BMI: Number.parseFloat(bmi.bmi(req.body.height, req.body.weight).bmi),
      Breast_Feeding: yesNoConversion(req.body.breastFeeding),
      Marital_Status: maritalStatus(req.body.maritalStatus),
      Alcohol: yesNoConversion(req.body.alcohol),
      Smoking: yesNoConversion(req.body.smoking),
      Breast_Cancer_History: yesNoConversion(req.body.breastCancerHistory),
      Age_at_first_period: req.body.ageAtFirstPeriod,
      Menstrual_Cycle: menstrualCycle(req.body.menstrualCycle),
    };

    //Getting updated prediction values for updated details
    axios.post("http://localhost:5000/predict", postData).then(response => {

      console.log(response.data);

      //Updating the relevant initial detail in the DB
      Post.findOneAndUpdate({ UserID: req.params.user_id },
        {
          Age: age(req.body.dob),
          BMI: bmi.bmi(req.body.height, req.body.weight).bmi,
          Breast_Feeding: yesNoConversion(req.body.breastFeeding),
          Marital_Status: maritalStatus(req.body.maritalStatus),
          Alcohol: yesNoConversion(req.body.alcohol),
          Smoking: yesNoConversion(req.body.smoking),
          Breast_Cancer_History: yesNoConversion(
            req.body.breastCancerHistory
          ),
          Age_at_first_period: req.body.ageAtFirstPeriod,
          Menstrual_Cycle: menstrualCycle(req.body.menstrualCycle),
          Prediction: response.data
        }, { upsert: true, useFindAndModify: false }, function (err, doc) {
          if (err) {
            return res.status(400).json({ message: err });

          }
          return res.send('Successfully saved.');
        });
    });

  } catch (err) {
    res.status(400).json({ message: err });
  }
};

/*Using AXIOS to get HTTP request------------------------------------*/

const getPrediction = (data) => {
  try {
    return axios.post("http://localhost:5000/predict", data);
  } catch (error) {
    console.log(error);
  }
};



/*FUNCTION FOR CALCULATING THE AGE------------------------------------*/

function getYears(x) {
  return Math.floor(x / 1000 / 60 / 60 / 24 / 365);
}

function age(doc) {
  //  console.log(doc);
  let n = Date.now();
  let d = new Date(doc);
  doc = getYears(n - d);
  return doc;
}

/*FUNCTION FOR CONVERSION OF INPUTS------------------------------------*/

//Function for conversion of YES - NO inputs
function yesNoConversion(doc) {
  if (doc.toString().toLowerCase() === "yes") {
    doc = 1;
  } else {
    doc = 0;
  }
  return doc;
}

//Function for conversion of HAS-CYCLE - NO-CYCLE inputs
function menstrualCycle(doc) {
  if (doc.toString().toLowerCase() === "hascycle") {
    doc = 1;
  } else {
    doc = 0;
  }
  return doc;
}

//Function for conversion of MARRIED-TOGETHER-SINGLE inputs
function maritalStatus(doc) {
  if (doc.toString().toLowerCase() === "married") {
    doc = 1;
  } else if (doc.toString().toLowerCase() === "together") {
    doc = 2;
  } else {
    doc = 3;
  }
  return doc;
}

//Function for creating status for prediction value ranges
function predictionRange(doc) {
  val = Number.parseFloat(doc);
  let status;
  if (0 <= val && val <= 20) {
    status = 1;
  } else if (20 < val && val <= 40) {
    status = 2;
  } else if (40 < val && val <= 60) {
    status = 3;
  } else if (60 < val && val <= 80) {
    status = 4;
  } else if (80 < val && val <= 100) {
    status = 5;
  }
  return status;
}