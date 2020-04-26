// trackingController.js
const axios = require("axios");  // connecting axios

const Model = require('../models/trackingModel');    // connecting trackingModel

const Factor = require('../models/factorModel');   // connecting factorModel

const AveragePrediction = require('../models/avgPredictionModel');    // connecting avgPredictionModel


exports.new = function (req, res) {      //  function for updating daily tracking data
    console.log(req.body);


    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var BMI = (weight / Math.pow((height), 2));

    var Track = new Model();

    Track.UserID = req.body.userId;
    
    Track.BMI = BMI;
    

    Model.find({}, function (err, docs) {
        if (!err) {
            allData = docs;

            userData = [];

            for (let x = 0; x <= allData.length - 1; x++) {
                if (allData[x].UserID === req.body.userId) {
                    userData.push(allData[x]);
                }
            }

            var last = userData[userData.length - 1];
            console.log(last);
            console.log(last._id);

            var day = new Date();
            if (last._id.getTimestamp().getDate() + "-" + last._id.getTimestamp().getMonth() + "-" + last._id.getTimestamp().getFullYear() === day.getDate() + "-" + day.getMonth() + "-" + day.getFullYear()) {
                console.log("same day");
                Model.deleteOne({ _id: last._id }, function (err, result) {
                    if (err) {
                        console.log(err);;
                    }
                });
            }


            if (!req.body.dob) { console.log("age is null"); Track.Age = last.Age; }
            else{Track.Age = age(req.body.dob);}

            if (!req.body.maritalStatus) { console.log("marital is null"); Track.Marital_Status = last.Marital_Status; }
            else{Track.Marital_Status = Number(req.body.maritalStatus);}

            if (!req.body.breastCancerHistory) { console.log("medicalHistory is null"); Track.Breast_Cancer_History = last.Breast_Cancer_History; }
            else{Track.Breast_Cancer_History = Number(req.body.breastCancerHistory);}

            if (!req.body.breastFeeding) { console.log("breasfeed is null"); Track.BreastFeeding = last.BreastFeeding; }
            else{Track.BreastFeeding = Number(req.body.breastFeeding);}

            if (!req.body.ageAtFirstPeriod) { console.log("firstperiod is null"); Track.Age_at_first_period = last.Age_at_first_period; }
            else{Track.Age_at_first_period = Number(req.body.ageAtFirstPeriod);}

            if (!req.body.menstrualCycle) { console.log("menopause is null"); Track.Menstrual_Cycle = last.Menstrual_Cycle; }
            else{Track.Menstrual_Cycle = Number(req.body.menstrualCycle);}

            if (!req.body.smoking) { console.log("smoking is null"); Track.Smoking = last.Smoking; }
            else{Track.Smoking = Number(req.body.smoking);}

            if (!req.body.alcohol) { console.log("alcohol is null"); Track.Alcohol = last.Alcohol; }
            else{Track.Alcohol = Number(req.body.alcohol);}

            if (isNaN(BMI)) { console.log("BMI is null"); Track.BMI = last.BMI; }  

            // save the contact and check for errors
            Track.save(function (err) {
                // Check for validation error
                if (err)
                    res.json(err);
                else
                    res.json({
                        message: 'New contact created!',
                        data: Track
                    });
            });

        }
        else {
            throw err;
        }
    });

};

exports.index = async function (req, res) {    // function for getting the average prediction for current date
    console.log(req.body);

    var ID = req.body.userId;

    var predictData = await getTrackingModel(ID);
    console.log(predictData);

    let prediction = getPrediction(predictData)
        .then((response) => {
            console.log(response.data);

            var today = new Date();
            var day = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();

            var Track = new AveragePrediction({
                UserID: ID,
                PredictedDate: day,
                AveragePrediction: response.data
            });

            const savedPost = Track.save().catch((err) => {         
                return res.status(400).json({ message: err });
            });

            return res.send({
                result:predictionRange(response.data)
            });
        })
        .catch((error) => {
            console.log(error);
            return res.send("Something went wrong");
        });

};

exports.call = function (req, res) {     // function for generating report

    console.log(req.body);

    var ID = req.body.userId;

    Model.find({}, function (err, docs) {
        if (!err) {
            allData = docs;

            userData = [];

            for (let x = 0; x <= allData.length - 1; x++) {
                if (allData[x].UserID === ID) {
                    userData.push(allData[x]);
                }
            }

            var last = userData[userData.length - 1];
            console.log(last);

            Factor.find({}, function (err, docs) {
                if (!err) {
                    des = docs;

                    //  console.log(des);

                    var Artical = [];

                    if (last.Age > 45) {
                        Artical.push(des[0]);
                    }
                    if (last.BMI >= 25) {
                        Artical.push(des[2]);
                    }
                    if (last.Marital_Status === 3) {
                        Artical.push(des[6]);
                    }
                    if (last.Breast_Cancer_History === 1) {
                        Artical.push(des[4]);
                    }
                    if (last.Smoking === 1) {
                        Artical.push(des[8]);
                    }
                    if (last.Alcohol === 1) {
                        Artical.push(des[1]);
                    }
                    if (last.BreastFeeding === 0) {
                        Artical.push(des[3]);
                    }
                    if (last.Age_at_first_period < 12 || last.Age_at_first_period > 16) {
                        Artical.push(des[4]);
                    }
                    if (last.Menstrual_Cycle === 0) {
                        Artical.push(des[7]);
                    }

                    var rand = Math.floor(Math.random()*Artical.length);

                    if (Artical.length == 0){
                        Artical.push(des[9]);
                    }

                    res.json({
                        Artical: Artical[rand]
                    });
                }
                else {
                    throw err;
                }
            });

        }
        else {
            throw err;
        }
    });

};

exports.getAllPrediction = function (req, res) {   // function for getting all the past predictions

    console.log(req.body);

    var ID = req.body.userId;

    AveragePrediction.find({}, function (err, docs) {
        if (!err) {
            allData = docs;

            predictionData = [];

            for (let x = 0; x <= allData.length - 1; x++) {
                if (allData[x].UserID === ID) {
                    allData[x].AveragePrediction =  predictionRange(allData[x].AveragePrediction);
                    predictionData.push(allData[x]);
                }
            }

            console.log(predictionData);
            res.json({
                allPredictions: predictionData,
                latestPrediction : predictionData[predictionData.length -1]
            });

        }
        else {
            throw err;
        }
    });

};


exports.getLast = function (req, res) {     // function for getting the last details of a user(for showing in the profile)

    console.log(req.body);

    var ID = req.body.userId;                               

    Model.find({}, function (err, docs) {
        if (!err) {
            allData = docs;

            userData = [];

            for (let x = 0; x <= allData.length - 1; x++) {
                if (allData[x].UserID === ID) {
                    userData.push(allData[x]);
                }
            }

            var last = userData[userData.length - 1];
            
            console.log(last);

            res.json({
                LastData : last
            });

        }
        else {
            throw err;
        }
    });

};


exports.view = function (req, res) {       // extra function for viewing a data. not using in the code
    Model.findById(req.params.track_id, function (err, track) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: track
        });
    });
};
// addition
exports.delete = function (req, res) {    // extra function for viewing a data. not using in the code
    Model.remove({
        _id: req.params.track_id
    }, function (err, track) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: "Contact deleted"
        });
    });
};

const getPrediction = (data) => {     // helping function for index function
    try {
        return axios.post("http://localhost:5000/predict", data);
    } catch (error) {
        console.log(error);
    }
};

const getTrackingModel = async (id) => {   // helping function for index function
    var ID = id;
    var data;

    var allData = await Model.find({});

    userData = [];

    for (let x = 0; x <= allData.length - 1; x++) {
        if (allData[x].UserID === ID) {
            userData.push(allData[x]);
        }
    }

    var last = userData[userData.length - 1];

    var avgBMI = 0;
    var avgAlcohol = 0;
    var avgSmoking = 0;

    for (let y = 0; y <= userData.length - 1; y++) {
        avgBMI += userData[y].BMI;
        avgAlcohol += userData[y].Alcohol;
        avgSmoking += userData[y].Smoking;
    }

    avgBMI = avgBMI / userData.length;
    avgAlcohol = avgAlcohol / userData.length;
    avgSmoking = avgSmoking / userData.length;

    if (avgAlcohol >= 0.5) {
        avgAlcohol = 1;
    }
    else {
        avgAlcohol = 0;
    }
    if (avgSmoking >= 0.5) {
        avgSmoking = 1;
    }
    else {
        avgSmoking = 0;
    }


    let predictData = {
        Age: last.Age,
        BMI: avgBMI,
        Breast_Feeding: last.BreastFeeding,
        Marital_Status: last.Marital_Status,
        Alcohol: avgAlcohol,
        Smoking: avgSmoking,
        Breast_Cancer_History: last.Breast_Cancer_History,
        Age_at_first_period: last.Age_at_first_period,
        Menstrual_Cycle: last.Menstrual_Cycle,
    };

    data = predictData;

    console.log(data);


    return data;
};

function predictionRange(doc) {    // helping function for index function
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
  // age calculate function
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