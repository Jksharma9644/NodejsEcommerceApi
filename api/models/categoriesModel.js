'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;
const validator = require('validator');
var CategorySchema = new mongoose.Schema({
    "TYPE": { type: String },
    "CATEGORY":[],
    "ISDELETED": { type: Boolean, default: false },
    "ID":{ type: String },
    "images": [],

})

mongoose.model('Categories', CategorySchema);