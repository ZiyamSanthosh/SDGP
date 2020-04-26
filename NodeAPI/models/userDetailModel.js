// userDetailModel.js for Modeling the user database
var mongoose = require('mongoose');

// Setup schema
var detailSchema = mongoose.Schema({    // this schema is used for artical generation
    UserID: String,
    DOB : String,
    Height : Number,
    Weight : Number
});

var Data = module.exports = mongoose.model('userDetail', detailSchema);