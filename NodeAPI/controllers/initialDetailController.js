/*IMPORTING MODULES------------------------------------------------------------------*/
const express = require("express");
const router = express.Router();
const Post = require("../models/initialDetailModel");
const Model = require("../models/trackingModel");
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

//GET Back intial detail related to specific user id
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
