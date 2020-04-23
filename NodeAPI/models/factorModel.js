// factorModel.js for Modeling the user database
var mongoose = require('mongoose');

// Setup schema
var dataSchema = mongoose.Schema({    // this schema is used for artical generation
    keyword: String,
    Description: String
});

var Data = module.exports = mongoose.model('factors', dataSchema);