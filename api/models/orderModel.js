'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;
const validator = require('validator');


var OrderSchema= new mongoose.Schema({
    "ORDER_ID": { type: String },
    "ORDER_DETAILS":[],
    "CLIENT_ID":{ type: String },
    "CREATEDDATE":  { type: Date, default: Date.now },
    "UPDATEDDATE":  { type: Date, default: Date.now },
    "ORDER_STATUS": { type: String },
    "CLIENT_INFO": {},
    "TOTAL_AMOUNT":{type: Number ,default: 0},
    "PAYMENT_STATUS": { type: String },
    "PAYMENT_MODE" :{ type: String },
    "platform":{type: String },
})
mongoose.model('Orders',OrderSchema);