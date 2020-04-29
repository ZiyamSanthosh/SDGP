// trackingController.js
const axios = require("axios");  // connecting axios

const Model = require('../models/trackingModel');    // connecting trackingModel

const Factor = require('../models/factorModel');   // connecting factorModel

const AveragePrediction = require('../models/avgPredictionModel');    // connecting avgPredictionModel

const UserDetail = require('../models/userDetailModel')    // connecting userDetailModel


exports.new = async function (req, res) {      //  function for updating daily tracking data

    console.log( req.body.userId );

    let userDetails = await UserDetail.findOne({ UserID: req.body.userId });
    //console.log(userData);

    var weight;
    var height;



    if (!req.body.weight) { console.log("weight is null"); weight = userDetails.Weight; }   // if weight is null replace it with the last entered value
    else { weight = Number(req.body.weight); userDetails.Weight = weight}

    if (!req.body.height) { console.log("height is null"); height = userDetails.Height; }  // if height is null replace it with the last entered value
    else { height = Number(req.body.height); userDetails.Height = height}

    

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
           // console.log(last);
           // console.log(last._id);

           // if user enters data several times a day the database will record only the last entered data
            var day = new Date();
            if (last._id.getTimestamp().getDate() + "-" + last._id.getTimestamp().getMonth() + "-" + last._id.getTimestamp().getFullYear() === day.getDate() + "-" + day.getMonth() + "-" + day.getFullYear()) {
                console.log("same day");
                Model.deleteOne({ _id: last._id }, function (err, result) {
                    if (err) {
                        console.log(err);;
                    }
                });
            }


            if (!req.body.dob) { console.log("age is null"); Track.Age = last.Age; }  // if age is null replace it with the last entered value
            else { Track.Age = age(req.body.dob); userDetails.DOB = req.body.dob}

            if (!req.body.maritalStatus) { console.log("marital is null"); Track.Marital_Status = last.Marital_Status; }  // if marital state is null replace it with the last entered value
            else { Track.Marital_Status = Number(req.body.maritalStatus); }

            if (!req.body.breastCancerHistory) { console.log("medicalHistory is null"); Track.Breast_Cancer_History = last.Breast_Cancer_History; } // if breastCancerHistory is null replace it with the last entered value
            else { Track.Breast_Cancer_History = Number(req.body.breastCancerHistory); }

            if (!req.body.breastFeeding) { console.log("breasfeed is null"); Track.BreastFeeding = last.BreastFeeding; }  // if breast feeding is null replace it with the last entered value
            else { Track.BreastFeeding = Number(req.body.breastFeeding); }

            if (!req.body.ageAtFirstPeriod) { console.log("firstperiod is null"); Track.Age_at_first_period = last.Age_at_first_period; }  // if ageAtFirstPeriod is null replace it with the last entered value
            else { Track.Age_at_first_period = Number(req.body.ageAtFirstPeriod); }

            if (!req.body.menstrualCycle) { console.log("menopause is null"); Track.Menstrual_Cycle = last.Menstrual_Cycle; }  // if menopause is null replace it with the last entered value
            else { Track.Menstrual_Cycle = Number(req.body.menstrualCycle); }

            if (!req.body.smoking) { console.log("smoking is null"); Track.Smoking = last.Smoking; }   // if smoking is null replace it with the last entered value
            else { Track.Smoking = Number(req.body.smoking); }

            if (!req.body.alcohol) { console.log("alcohol is null"); Track.Alcohol = last.Alcohol; } // if alcohol is null replace it with the last entered value
            else { Track.Alcohol = Number(req.body.alcohol); }

            // save the contact and check for errors
            Track.save(function (err) {     
                // Check for validation error
                if (err)
                    res.json(err);
            });

            userDetails.save(function (err) {
                // Check for validation error
                if (err)
                    res.json(err);
            });

            res.json({
                message: 'New contact created!',
                data: Track,
                UserData: userDetails
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
            var day = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

            var Track = new AveragePrediction({
                UserID: ID,
                PredictedDate: day,
                AveragePrediction: response.data
            });

            const savedPost = Track.save().catch((err) => {
                return res.status(400).json({ message: err });
            });

            return res.send({
                result: predictionRange(response.data),
                date : day
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

                    //  this method shows the user one artical randomly chosed related to the user
                    // we use critical points which we got from the data science model to generate articals 

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

                    var rand = Math.floor(Math.random() * Artical.length);

                    if (Artical.length == 0) {
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
                    allData[x].AveragePrediction = predictionRange(allData[x].AveragePrediction);
                    predictionData.push(allData[x]);
                }
            }

            console.log(predictionData);
            res.json({
                allPredictions: predictionData,
                latestPrediction: predictionData[predictionData.length - 1]
            });

        }
        else {
            throw err;
        }
    });

};


exports.getLast = async function (req, res) {     // function for getting the last details of a user(for showing in the profile)

    

    console.log(req.body);

    var ID = req.body.userId;

    let userDetails = await UserDetail.findOne({ UserID: ID });

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
                LastData: last,
                height : userDetails.Height,
                weight : userDetails.Weight,
                DOB: userDetails.DOB
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

    // we use the average value of smoking and alcohol consumptions

    var avgAlcohol = 0;
    var avgSmoking = 0;

    for (let y = 0; y <= userData.length - 1; y++) { 
        avgAlcohol += userData[y].Alcohol;
        avgSmoking += userData[y].Smoking;
    }

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

    let predictData = {     // these are the data we send to the data science model for getting the prediction
        Age: last.Age,
        BMI: last.BMI,
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

// age calculate functions from getting the date of birth
function getYears(x) {
    return Math.floor(x / 1000 / 60 / 60 / 24 / 365);
}
function age(doc) {
    let n = Date.now();
    let d = new Date(doc);
    doc = getYears(n - d);
    return doc;
}