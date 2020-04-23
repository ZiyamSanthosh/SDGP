// trackingModel.js for Modeling the user database
var mongoose = require('mongoose');
// Setup schema
var avgSchema = mongoose.Schema({   // this schema is used for storing average predictions
    UserID: String,
    PredictedDate: String,
    AveragePrediction: Number
});


var  AvgPrediction = module.exports = mongoose.model('avgPrediction', avgSchema); 